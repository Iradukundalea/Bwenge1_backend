import Mongoose from "mongoose";
import UserCourse from "../models/UserCourse.js";
import LongMoocCourse from "../models/universitylongcourses.js";
import User from "../models/user.js";
import _ from "lodash";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import LongBwengeCourse from "../models/LongBwengecourses.js";
import { uploadFile } from "../middleware/s3.js";
import { uploadFile as uploadFile1 } from "../middleware/BwengeLongCoursesS3.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const enrollUser = async (req, res, next) => {
  const { userId, courseId } = req.body;
  const newEnroll = new UserCourse({
    userId,
    courseId,
    enrolledDate: new Date(),
  });
  try {
    await newEnroll.save();
    await LongBwengeCourse.findByIdAndUpdate(courseId, {
      $inc: {
        studentsCount: 1,
      },
    });
    res.status(200).json({ success: "true", message: "New Enroll saved" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const enrollStudent = async (req, res, next) => {
  const { courseId } = req.params;
  const { studentNumber, firstName, lastName, institutionName } = req.body;
  // console.log({ studentNumber, firstName, lastName, institutionName });
  const student = await User.findOne({
    firstName: firstName,
    lastName: lastName,
    "institution.institutionName": institutionName,
    "institution.studentNumber": studentNumber,
  });
  // console.log(student);
  const newEnroll = new UserCourse({
    userId: student._id,
    courseId,
    enrolledDate: new Date(),
  });
  try {
    await newEnroll.save();
    res.status(200).json({ success: "true", message: "New Enroll saved" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getUserCourses = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const coursesIDs = await UserCourse.find({ userId }, { courseId: 1, _id: 1, assignments: 1, exams: 1 });
    var mycourses = [];
    for (var i = 0; i < coursesIDs.length; i++) {
      const course = await LongBwengeCourse.findById(coursesIDs[i].courseId);
      mycourses.push({
        course,
        Userassignments: coursesIDs[i].assignments,
        UserExams: coursesIDs[i].exams,
      });
    }
    res.status(200).json(mycourses);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const postUserQuizResult = async (req, res, next) => {
  const { userId, courseId } = req.params;
  const { AssignmentId, courseTitle, AssignmentTitle, startTime, UserProblemsAnswers, Userscore } = req.body;
  console.log(Userscore);
  var answersfiles;
  if (req.files) {
    answersfiles = req.files.Answersfiles;
  }
  var theprobsset = JSON.parse(UserProblemsAnswers);
  if (answersfiles) {
    var k = 0;

    for (var i = 0; i < theprobsset.length; i++) {
      for (var j = 0; j < theprobsset[i].studentTeacherFiles.length; j++) {
        if (typeof theprobsset[i].studentTeacherFiles[j].fileloc != "string") {
          if (_.isArray(answersfiles)) {
            theprobsset[i].studentTeacherFiles[
              j
            ].fileloc = `Mooccourses\\${courseTitle}\\Students\\${userId}\\quizes\\${AssignmentTitle}\\${answersfiles[k].name}`;
            uploadFile(answersfiles[k], `Mooccourses/${courseTitle}/Students/${userId}/quizes/${AssignmentTitle}`);

            k++;
          } else {
            theprobsset[i].studentTeacherFiles[
              j
            ].fileloc = `Mooccourses/${courseTitle}/Students/${userId}/quizes/${AssignmentTitle}/${answersfiles.name}`;
            uploadFile(answersfiles, `Mooccourses\\${courseTitle}\\Students\\${userId}\\quizes\\${AssignmentTitle}`);
          }
        }
      }
    }
  }
  try {
    const afterUpdate = await UserCourse.findOneAndUpdate(
      { userId, courseId },
      {
        $push: {
          quizes: {
            AssignmentId,
            AssignmentTitle,
            UserProblemsAnswers: theprobsset,
            Userscore,
            startTime,
            finishTime: new Date(),
          },
        },
      }
    );
    res.status(200).json(afterUpdate);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getInstructorAssignmentData = async (req, res, next) => {
  const { courseId, AssignmentId } = req.params;
  try {
    var UserAssignmetsData = await UserCourse.find({ courseId }, { userId: 1, assignments: 1 }).lean();
    UserAssignmetsData = UserAssignmetsData.filter((item) => {
      var newAssignmentsList = [];
      for (var i = 0; i < item.assignments.length; i++) {
        if (item.assignments[i].AssignmentId == AssignmentId) newAssignmentsList.push(item.assignments[i]);
      }
      console.log(newAssignmentsList);
      item = { ...item, assignments: newAssignmentsList };
      if (newAssignmentsList.length > 0) return item;
    });
    console.log(UserAssignmetsData);
    for (var i = 0; i < UserAssignmetsData.length; i++) {
      var user = await User.findById(UserAssignmetsData[i].userId);
      UserAssignmetsData[i] = { ...UserAssignmetsData[i], user: user };
    }
    res.status(200).json(UserAssignmetsData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
