import mongoose from 'mongoose'

/* achievementSchema will correspond to a collection in your MongoDB database. */
const achievementSchema = new mongoose.Schema({
  name: {
    /* The name of this achievement */

    type: String,
    required: [true, 'Please provide a name for this achievement.'],
  },
  achievement_details: {
    /* The details of this achievement */

    type: String,

  },
  theDate: {
    /* The theDate of your achievement */

    type: String,

  },
  insertDate: {
    type: String
  },
  duration: {
    /* Achievement's duration, if applicable */

    type: Number,
  },
  related_to_career: {
    /* Boolean related_to_career value, if applicable */

    type: Boolean,
  },
 
})

export default mongoose.models.Achievement || mongoose.model('Achievement', achievementSchema)
