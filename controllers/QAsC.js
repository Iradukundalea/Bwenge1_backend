import QAs from "../models/QAs.js";

export const CreateQA = async (req, res, next) => {
  const { title, article, field, department, tags, communityConnected, creator } = req.body;
  var newQAs = new QAs({
    title,
    questionridea: article,
    field,
    department,
    communityConnected,
    tags: JSON.parse(tags),
    creator: JSON.parse(creator),
    dateOfSubmission: new Date(),
  });
  try {
    await newQAs.save();
    res.status(200).json({
      success: "true",
      message: "article uploaded",
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
