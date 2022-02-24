import dbConnect from '../../../lib/dbConnect'
import Achievement from '../../../models/Achievement'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const achievements = await Achievement.find({}) /* find all the data in our database */
        res.status(200).json({ success: true, data: achievements })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const achievement = await Achievement.create(
          req.body
        ) /* create a new model in the database */
        res.status(201).json({ success: true, data: achievement })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
