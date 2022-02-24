import { useRouter } from 'next/router'
import useSWR from 'swr'
import Form from '../../components/Form'

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)

const EditAchievement = () => {
  const router = useRouter()
  const { id } = router.query
  const { data: achievement, error } = useSWR(id ? `/api/achievements/${id}` : null, fetcher)

  if (error) return <p>Failed to load</p>
  if (!achievement) return <p>Loading...</p>

  const achievementForm = {
    name: achievement.name,
    achievement_details: achievement.achievement_details,
    theDate: achievement.theDate,
    duration: achievement.duration,
    related_to_career: achievement.related_to_career,

  }

  return <Form formId="edit-achievement-form" achievementForm={achievementForm} forNewAchievement={false} />
}

export default EditAchievement
