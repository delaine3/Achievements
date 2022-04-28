import Form from "../components/Form";

export function theDate() {
  const date = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const currDate =
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) +
    " " +
    date.toLocaleDateString(undefined, options) +
    "\n";
  return currDate.toString();
}
export function insertDate() {
  return Date.now().toString();
}
const NewAchievement = () => {
  const achievementForm = {
    name: "",
    achievement_details: "",
    insertDate: insertDate(),
    theDate: theDate(),
    duration: 0,
    related_to_career: false,
  };

  return (
    <Form formId="add-achievement-form" achievementForm={achievementForm} />
  );
};

export default NewAchievement;
