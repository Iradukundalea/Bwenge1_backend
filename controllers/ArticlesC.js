import BwengeArticle from "../models/article.js";
import { generateUploadURL, generateArticleQuizUploadURL } from "../middleware/BwengeArticleS3.js";

export const createArticle = async (req, res, next) => {
  const { title, article, field, department, tags, communityConnected, creator, polls, postArticleQuiz } = req.body;
  var newArticle = new BwengeArticle({
    title,
    article,
    field,
    department,
    communityConnected,
    polls: JSON.parse(polls),
    onApproved: communityConnected ? true : false,
    tags: JSON.parse(tags),
    creator: JSON.parse(creator),
    dateOfSubmission: new Date(),
    postArticleQuiz: postArticleQuiz ? JSON.parse(postArticleQuiz) : [],
  });
  try {
    await newArticle.save();
    res.status(200).json({
      success: "true",
      message: "article uploaded",
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const imageUploadLink = async (req, res, next) => {
  console.log("here");
  const url = await generateUploadURL();
  res.send({ url });
};

export const quizFileUploadLink = async (req, res, next) => {
  const { type } = req.params;
  const url = await generateArticleQuizUploadURL(type);
  res.send({ url });
};
