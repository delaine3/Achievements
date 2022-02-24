import Link from 'next/link'
import dbConnect from '../lib/dbConnect'
import Achievement from '../models/Achievement'

export function theDate() {
  const date = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " " +date.toLocaleDateString(undefined, options) + "\n"
}
export function newDay(){
  return <div>Hey</div>
}
export function checkDate(achievementDate){
  let parseDate =  parseInt(achievementDate)

  let achievementDateAsDate = new Date(parseDate).getDate()
  //console.log( achievementDateAsDate == new Date().getDate())

  return achievementDateAsDate == new Date().getDate()

}
export function checkIfYesterday(achievementDate){
 // console.log("achievementDate is " + achievementDate)
  //console.log("achievementDate is a " +typeof(achievementDate))

  let parseDate =  parseInt(achievementDate)

  //console.log("parseDate is a " +typeof(parseDate))
 // console.log("parseDate is a " + parseDate)

  let achievementDateAsDate = new Date(parseDate).getDate() + 1

//console.log("achievementDateAsDate " + achievementDateAsDate)
//console.log("***************************************************")
  return achievementDateAsDate == new Date().getDate()

}

function Index ({ achievements }) {
  function styleObj (){
    var color = Array("#e9d8a6", "#ee9b00", "#94d2bd", "#0a9396", "#ca6702", "#9b2226");
    const newStyle={
      backgroundColor: color[Math.floor(Math.random() * color.length)],
      textAlign: "center",
      width: "90%",
      fontSize: "25px",
      marginLeft: "4%"
     }
    return newStyle
}
function styleObj2 (){
  const newStyle={
    marginTop: "0%"
   }
  return newStyle
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
        
      <div key={achievement._id}>
        <h3  style={styleObj()}>{achievement.theDate.slice(8)}</h3>
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
