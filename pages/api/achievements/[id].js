import dbConnect from "../../../lib/dbConnect";
import Achievement from "../../../models/Achievement";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET" /* Get a model by its ID */:
      try {
        const achievement = await Achievement.findById(id);
        if (!achievement) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: achievement });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "PUT" /* Edit a model by its ID */:
      try {
        const achievement = await Achievement.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!achievement) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: achievement });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE" /* Delete a model by its ID */:
      try {
        const deletedAchievement = await Achievement.deleteOne({ _id: id });
        if (!deletedAchievement) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
