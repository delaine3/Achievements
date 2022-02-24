import Link from 'next/link'
import dbConnect from '../lib/dbConnect'
import Achievement from '../models/Achievement'
import React from "react";

export function theDate() {
  const date = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " " +date.toLocaleDateString(undefined, options) + "\n"
}


export function checkDate(achievementDate){
  let parseDate =  parseInt(achievementDate)

  let currA= new Date(parseDate).getDate()
  //console.log( currA== new Date().getDate())

  return currA== new Date().getDate()

}
export function checkIfYesterday(achievementDate){

 // console.log("achievementDate is " + achievementDate)
  //console.log("achievementDate is a " +typeof(achievementDate))

  let parseDate =  parseInt(achievementDate)

  //console.log("parseDate is a " +typeof(parseDate))
 // console.log("parseDate is a " + parseDate)

  let currA= new Date(parseDate).getDate() + 1

//console.log("currA" + currA
//console.log("***************************************************")
  return currA== new Date().getDate()

}

function Index ({ achievements }) {
 
  function newDay(achievement){

    return <div  key={achievement.insertDate }> 
    <div key={achievement._id}>
    <div  key={achievement._id} className="card">
      <img src={achievement.image_url} />
      <h5 className="achievement-name"> {achievement.name}</h5>
      <h3 >{achievement.theDate.slice(18)}</h3>

      <br/>
      <div className="main-content">
        <p className="achievement-name">{achievement.name}</p>
        <br/>
        <p className="details">Details: {achievement.achievement_details.split(" ").splice(0,10).join(" ")}</p>
        <br/>
        <p className="details">Date: {achievement.theDate}</p>
        <div className="btn-container">
          <Link href="/[id]/edit" as={`/${achievement._id}/edit`}>
            <button className="btn edit">Edit</button>
          </Link>
          <Link href="/[id]" as={`/${achievement._id}`}>
            <button className="btn view">View</button>
          </Link>
        </div>
      </div>
    </div>
  </div> </div>
    
  }
 

  return(
  <div >
    <h1 className="title">It is {theDate()} <br/> What did you do with your life today?
</h1>

<section>
  <h2>Today</h2>
  <div  className='grid' >
    {/* Create a card for each achievement */}
    {achievements.map((achievement) => (
      checkDate(achievement.insertDate) ?(
      <div key={achievement._id}>
        <div  key={achievement._id} className="card">
          <img src={achievement.image_url} />
          <h5 className="achievement-name"> {achievement.name}</h5>
          <br/>
          <div className="main-content">
            <p className="achievement-name">{achievement.name}</p>
            <br/>
            <p className="details">Details: {achievement.achievement_details.split(" ").splice(0,10).join(" ")}</p>
            <br/>
            <p className="details">Date: {achievement.theDate}</p>
            <div className="btn-container">
              <Link href="/[id]/edit" as={`/${achievement._id}/edit`}>
                <button className="btn edit">Edit</button>
              </Link>
              <Link href="/[id]" as={`/${achievement._id}`}>
                <button className="btn view">View</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    ): null) )}
      </div>

    </section>

<section>
  <h2>Yesterday</h2>
  <div  className='grid' >
    {/* Create a card for each achievement */}
    {achievements.map((achievement) => (
      checkIfYesterday(achievement.insertDate) ?(
      <div key={achievement._id}>
        <div  key={achievement._id} className="card">
          <img src={achievement.image_url} />
          <h5 className="achievement-name"> {achievement.name}</h5>
          <br/>
          <div className="main-content">
            <p className="achievement-name">{achievement.name}</p>
            <br/>
            <p className="details">Details: {achievement.achievement_details.split(" ").splice(0,10).join(" ")}</p>
            <br/>
            <p className="details">Date: {achievement.theDate}</p>
            <div className="btn-container">
              <Link href="/[id]/edit" as={`/${achievement._id}/edit`}>
                <button className="btn edit">Edit</button>
              </Link>
              <Link href="/[id]" as={`/${achievement._id}`}>
                <button className="btn view">View</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    ): null) )}
      </div>

    </section>
    <section>
  <h2>Previous days        
</h2>
  <div  className='grid' >
    {/* Create a card for each achievement */}
    {achievements.map((achievement) => (
      !checkIfYesterday(achievement.insertDate) && !checkIfYesterday(achievement.insertDate) ?(
        
      <div>
        { newDay(achievement) }
        
     
      </div>
    ): null) )}
      </div>

    </section>
   

  </div>)
}

/* Retrieves achievement(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect()

  /* find all the data in our database */
  const result = await Achievement.find({}).sort({insertDate : 'desc'})


//console.log(result)
  const achievements = result.map((doc) => {
    const achievement = doc.toObject()
    achievement._id = achievement._id.toString()
    return achievement
  })

  return { props: { achievements: achievements } }
}

export default Index
