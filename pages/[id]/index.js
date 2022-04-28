import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import dbConnect from "../../lib/dbConnect";
import Achievement from "../../models/Achievement";

/* Allows you to view achievement card info and delete achievement card*/
const AchievementPage = ({ achievement }) => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const handleDelete = async () => {
    const achievementID = router.query.id;

    try {
      await fetch(`/api/achievements/${achievementID}`, {
        method: "Delete",
      });
      router.push("/");
    } catch (error) {
      setMessage("Failed to delete the achievement.");
    }
  };

  return (
    <div key={achievement._id}>
      <div className="view-card">
        <img src={achievement.image_url} />
        <div>
          <p className="achievement-name">{achievement.name}</p>
          <p>Date: {achievement.theDate}</p>

          <br />
          <p>Details: {achievement.achievement_details}</p>
          <br />
          <div>
            <Link href="/[id]/edit" as={`/${achievement._id}/edit`}>
              <button className="btn edit">Edit</button>
            </Link>
            <button className="btn delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export async function getServerSideProps({ params }) {
  await dbConnect();

  const achievement = await Achievement.findById(params.id).lean();
  achievement._id = achievement._id.toString();

  return { props: { achievement } };
}

export default AchievementPage;
