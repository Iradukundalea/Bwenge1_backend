import Mongoose from "mongoose";
import UserArticleQuizTime from "../models/userArticleQuizTime.js";
import _ from "lodash";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const PoststartQuizInfo = async (req, res, next) => {
  const { userId, articleId } = req.params;
  const { QuizDuration, StartTime, AssignmentId } = req.body;
  var alreadyExist = await UserArticleQuizTime.findOne({
    articleId,
    userId,
    AssignmentId,
  });
  if (!alreadyExist) {
    const newUserQuiz = new UserArticleQuizTime({
      userId,
      articleId,
      AssignmentId,
      QuizDuration,
      StartTime,
    });
    try {
      await newUserQuiz.save();
      res.status(200).json({ success: true, message: "ok quiz Start" });
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  } else {
    res.status(200).json({ success: true, message: "already in" });
  }
};

export const UpdateUserQuizInfo = async (req, res, next) => {
  const { userId, articleId } = req.params;
  const { AssignmentId, assignment } = req.body;
  var assignmento = JSON.parse(assignment);
  var theprobsset = assignmento.userProblemsAnswers;

  assignmento.userProblemsAnswers = theprobsset;
  try {
    const afterUpdate = await UserArticleQuizTime.findOneAndUpdate(
      { userId, articleId, AssignmentId },
      {
        assignment: assignmento,
      }
    );
    res.status(200).json({ success: true, message: "userquiz updated" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const endQuizUpdater = async (req, res, next) => {
  const { userId, articleId } = req.params;
  const { AssignmentId } = req.body;
  try {
    const deletedQuiz = await UserArticleQuizTime.findOneAndDelete({
      userId,
      articleId,
      AssignmentId,
    });
    res.status(200).json({ success: true, message: "userquiz deleted" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
