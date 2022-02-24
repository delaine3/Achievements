import { useState } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'
//import { theDate } from '../pages'

export function theDate() {
  const date = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " " +date.toLocaleDateString(undefined, options) + "\n"
}

const Form = ({ formId, achievementForm, forNewAchievement = true }) => {
  const router = useRouter()
  const contentType = 'application/json'
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    name: achievementForm.name,
    achievement_details: achievementForm.achievement_details,
    theDate: achievementForm.theDate,
    insertDate: achievementForm.insertDate,
    duration: achievementForm.duration,
    related_to_career: achievementForm.related_to_career,

  })

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form) => {
    const { id } = router.query

    try {
      const res = await fetch(`/api/achievements/${id}`, {
        method: 'PUT',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status)
      }

      const { data } = await res.json()

      mutate(`/api/achievements/${id}`, data, false) // Update the local data without a revalidation
      router.push('/')
    } catch (error) {
      setMessage('Failed to update achievement')
    }
  }

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form) => {
    try {
      const res = await fetch('/api/achievements', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status)
      }

      router.push('/')
    } catch (error) {
      setMessage('Failed to add achievement')
    }
  }

  const handleChange = (e) => {
    const target = e.target
    const value =
      target.name === 'related_to_career' ? target.checked : target.value
    const name = target.name

    setForm({
      ...form,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const errs = formValidate()
    if (Object.keys(errs).length === 0) {
      forNewAchievement ? postData(form) : putData(form)
    } else {
      setErrors({ errs })
    }
  }

  /* Makes sure achievement info is filled for achievement name, details name, theDate, and image url*/
  const formValidate = () => {
    let err = {}
    if (!form.name) err.name = 'Name is required'

    return err
  }

  return (
    <>
      <form id={formId} onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
<br/>
        <label htmlFor="achievement_details">Details</label>
        <textarea
        style={{ minHeight: 100 }}
        type="text"
        name="achievement_details"
        value={form.achievement_details}
        onChange={handleChange}
        />
<br/>
        <label htmlFor="duration">Duration</label>
        <input
          type="number"
          name="duration"
          value={form.duration}
          onChange={handleChange}
        />
<br/>
        <label htmlFor="related_to_career">Related to career?</label>
        <input
          type="checkbox"
          name="related_to_career"
          checked={form.related_to_career}
          onChange={handleChange}
        />
<br/>
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </>
  )
}

export default Form
