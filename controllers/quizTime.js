import Mongoose from "mongoose";
import UserQuizTime from "../models/userQuizTime.js";
import _ from "lodash";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { uploadFile } from "../middleware/s3.js";
import { uploadFile as uploadFile1 } from "../middleware/BwengeLongCoursesS3.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const PoststartQuizInfo = async (req, res, next) => {
  const { userId, courseId } = req.params;
  const { QuizDuration, StartTime, AssignmentId } = req.body;
  const newUserQuiz = new UserQuizTime({
    userId,
    courseId,
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
};

export const UpdateUserQuizInfo = async (req, res, next) => {
  const { userId, courseId } = req.params;
  const { AssignmentId, testType, courseTitle, AssignmentTitle, assignment } = req.body;
  var answersfiles;
  if (req.files) {
    answersfiles = req.files.Answersfiles;
  }
  var assignmento = JSON.parse(assignment);
  var theprobsset = assignmento.UserProblemsAnswers;
  if (answersfiles) {
    var k = 0;

    for (var i = 0; i < theprobsset.length; i++) {
      for (var j = 0; j < theprobsset[i].studentTeacherFiles.length; j++) {
        if (typeof theprobsset[i].studentTeacherFiles[j].fileloc != "string") {
          if (_.isArray(answersfiles)) {
            theprobsset[i].studentTeacherFiles[
              j
            ].fileloc = `Mooccourses\\${courseTitle}\\Students\\${userId}\\${testType}\\${AssignmentTitle}\\${answersfiles[k].name}`;
            uploadFile(answersfiles[k], `Mooccourses/${courseTitle}/Students/${userId}/${testType}/${AssignmentTitle}`);

            k++;
          } else {
            theprobsset[i].studentTeacherFiles[
              j
            ].fileloc = `Mooccourses\\${courseTitle}\\Students\\${userId}\\${testType}\\${AssignmentTitle}\\${answersfiles.name}`;
            uploadFile(answersfiles, `Mooccourses/${courseTitle}/Students/${userId}/${testType}/${AssignmentTitle}`);

            console.log("hehehe");
          }
        }
      }
    }
  }
  assignmento.UserProblemsAnswers = theprobsset;
  console.log(theprobsset[0].studentTeacherFiles);
  console.log(assignmento.UserProblemsAnswers[0].studentTeacherFiles);
  try {
    const afterUpdate = await UserQuizTime.findOneAndUpdate(
      { userId, courseId, AssignmentId },
      {
        assignment: assignmento,
      }
    );
    res.status(200).json({ success: true, message: "userquiz updated" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const UpdateBwengeUserQuizInfo = async (req, res, next) => {
  const { userId, courseId } = req.params;
  const { AssignmentId, testType, courseTitle, AssignmentTitle, assignment } = req.body;
  var answersfiles;
  if (req.files) {
    answersfiles = req.files.Answersfiles;
  }
  var assignmento = JSON.parse(assignment);
  var theprobsset = assignmento.UserProblemsAnswers;
  if (answersfiles) {
    var k = 0;

    for (var i = 0; i < theprobsset.length; i++) {
      for (var j = 0; j < theprobsset[i].studentTeacherFiles.length; j++) {
        if (typeof theprobsset[i].studentTeacherFiles[j].fileloc != "string") {
          if (_.isArray(answersfiles)) {
            theprobsset[i].studentTeacherFiles[
              j
            ].fileloc = `Bwengelongcourses\\${courseTitle}\\Students\\${userId}\\${testType}\\${AssignmentTitle}\\${answersfiles[k].name}`;
            uploadFile1(answersfiles[k], `Bwengelongcourses/${courseTitle}/Students/${userId}/${testType}/${AssignmentTitle}`);

            k++;
          } else {
            theprobsset[i].studentTeacherFiles[
              j
            ].fileloc = `Bwengelongcourses\\${courseTitle}\\Students\\${userId}\\${testType}\\${AssignmentTitle}\\${answersfiles.name}`;
            uploadFile1(answersfiles, `Bwengelongcourses/${courseTitle}/Students/${userId}/${testType}/${AssignmentTitle}`);

            console.log("hehehe");
          }
        }
      }
    }
  }
  assignmento.UserProblemsAnswers = theprobsset;
  console.log(theprobsset[0].studentTeacherFiles);
  console.log(assignmento.UserProblemsAnswers[0].studentTeacherFiles);
  try {
    const afterUpdate = await UserQuizTime.findOneAndUpdate(
      { userId, courseId, AssignmentId },
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
  const { userId, courseId } = req.params;
  const { AssignmentId } = req.body;
  try {
    const deletedQuiz = await UserQuizTime.findOneAndDelete({
      userId,
      courseId,
      AssignmentId,
    });
    res.status(200).json({ success: true, message: "userquiz deleted" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
