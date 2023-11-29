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

export const postUserAssignmentResult = async (req, res, next) => {
  const { userId, courseId } = req.params;
  const { AssignmentId, courseTitle, AssignmentTitle, startTime, UserProblemsAnswers, Userscore } = req.body;
  console.log(Userscore);
  console.log(req.files);
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
            ].fileloc = `Mooccourses\\${courseTitle}\\Students\\${userId}\\assignments\\${AssignmentTitle}\\${answersfiles[k].name}`;
            uploadFile(answersfiles[k], `Mooccourses/${courseTitle}/Students/${userId}/assignments/${AssignmentTitle}`);

            k++;
          } else {
            theprobsset[i].studentTeacherFiles[
              j
            ].fileloc = `Mooccourses\\${courseTitle}\\Students\\${userId}\\assignments\\${AssignmentTitle}\\${answersfiles.name}`;
            uploadFile(answersfiles, `Mooccourses/${courseTitle}/Students/${userId}/assignments/${AssignmentTitle}`);
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
          assignments: {
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
export const postUserExamResult = async (req, res, next) => {
  const { userId, courseId } = req.params;
  const { AssignmentId, courseTitle, AssignmentTitle, UserProblemsAnswers, Userscore, startTime } = req.body;
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
            ].fileloc = `Mooccourses\\${courseTitle}\\Students\\${userId}\\exams\\${AssignmentTitle}\\${answersfiles[k].name}`;
            uploadFile(answersfiles[k], `Mooccourses/${courseTitle}/Students/${userId}/exams/${AssignmentTitle}}`);

            k++;
          } else {
            theprobsset[i].studentTeacherFiles[
              j
            ].fileloc = `Mooccourses\\${courseTitle}\\Students\\${userId}\\exams\\${AssignmentTitle}\\${answersfiles.name}`;
            uploadFile(answersfiles, `Mooccourses/${courseTitle}/Students/${userId}/exams/${AssignmentTitle}}`);
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
          exams: {
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
export const postBwengeUserAssignmentResult = async (req, res, next) => {
  const { userId, courseId } = req.params;
  const { AssignmentId, courseTitle, AssignmentTitle, startTime, UserProblemsAnswers, Userscore } = req.body;
  console.log(Userscore);
  console.log(req.files);
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
            ].fileloc = `Bwengelongcourses\\${courseTitle}\\Students\\${userId}\\assignments\\${AssignmentTitle}\\${answersfiles[k].name}`;
            uploadFile1(answersfiles[k], `Bwengelongcourses/${courseTitle}/Students/${userId}/assignments/${AssignmentTitle}`);

            k++;
          } else {
            theprobsset[i].studentTeacherFiles[
              j
            ].fileloc = `Bwengelongcourses\\${courseTitle}\\Students\\${userId}\\assignments\\${AssignmentTitle}\\${answersfiles.name}`;
            uploadFile1(answersfiles, `Bwengelongcourses/${courseTitle}/Students/${userId}/assignments/${AssignmentTitle}`);
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
          assignments: {
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
export const postBwengeUserQuizResult = async (req, res, next) => {
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
            ].fileloc = `Bwengelongcourses\\${courseTitle}\\Students\\${userId}\\quizes\\${AssignmentTitle}\\${answersfiles[k].name}`;
            uploadFile1(answersfiles[k], `Bwengelongcourses/${courseTitle}/Students/${userId}/quizes/${AssignmentTitle}`);

            k++;
          } else {
            theprobsset[i].studentTeacherFiles[
              j
            ].fileloc = `Bwengelongcourses/${courseTitle}/Students/${userId}/quizes/${AssignmentTitle}/${answersfiles.name}`;
            uploadFile1(answersfiles, `Bwengelongcourses\\${courseTitle}\\Students\\${userId}\\quizes\\${AssignmentTitle}`);
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
export const postBwengeUserExamResult = async (req, res, next) => {
  const { userId, courseId } = req.params;
  const { AssignmentId, courseTitle, AssignmentTitle, UserProblemsAnswers, Userscore, startTime } = req.body;
  // var answersfiles;
  // if (req.files) {
  //   answersfiles = req.files.Answersfiles;
  // }
  var theprobsset = JSON.parse(UserProblemsAnswers);
  // if (answersfiles) {
  //   var k = 0;

  //   for (var i = 0; i < theprobsset.length; i++) {
  //     for (var j = 0; j < theprobsset[i].studentTeacherFiles.length; j++) {
  //       if (typeof theprobsset[i].studentTeacherFiles[j].fileloc != "string") {
  //         if (_.isArray(answersfiles)) {
  //           theprobsset[i].studentTeacherFiles[
  //             j
  //           ].fileloc = `Bwengelongcourses\\${courseTitle}\\Students\\${userId}\\exams\\${AssignmentTitle}\\${answersfiles[k].name}`;
  //           uploadFile1(answersfiles[k], `Bwengelongcourses/${courseTitle}/Students/${userId}/exams/${AssignmentTitle}}`);

  //           k++;
  //         } else {
  //           theprobsset[i].studentTeacherFiles[
  //             j
  //           ].fileloc = `Bwengelongcourses\\${courseTitle}\\Students\\${userId}\\exams\\${AssignmentTitle}\\${answersfiles.name}`;
  //           uploadFile1(answersfiles, `Bwengelongcourses/${courseTitle}/Students/${userId}/exams/${AssignmentTitle}}`);
  //         }
  //       }
  //     }
  //   }
  // }
  try {
    const afterUpdate = await UserCourse.findOneAndUpdate(
      { userId, courseId },
      {
        $push: {
          exams: {
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

export const getCourseStudents = async (req, res, next) => {
  const { courseId } = req.params;
  try {
    const userIds = await UserCourse.find({ courseId }, { userId: 1, enrolledDate: 1 });
    console.log(userIds);
    const Users = [];

    for (var i = 0; i < userIds.length; i++) {
      var user = await User.findById(userIds[i].userId);
      Users.push({ user, enrolledDate: userIds[i].enrolledDate });
    }
    res.status(200).json(Users);
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

export const updateQuizScore = async (req, res, next) => {
  const { userId, courseId, ExamName } = req.params;
  const { newData } = req.body;
  let prevVersion = await UserCourse.find({ userId, courseId });

  let newEntrie = JSON.parse(newData);
  let k;
  for (let i = 0; i < prevVersion[0].assignments.length; i++) {
    if (prevVersion[0].quizes[i].AssignmentTitle == newEntrie.AssignmentTitle) {
      k = i;
      prevVersion[0].assignments[i] = newEntrie;
      break;
    }
  }
  console.log(prevVersion[0]);
  try {
    const afterScoreUpdate = await UserCourse.findOneAndUpdate({ userId, courseId }, prevVersion[0]);
    res.status(200).json(afterScoreUpdate);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const updateAssignmentScore = async (req, res, next) => {
  const { userId, courseId, ExamName } = req.params;
  const { newData } = req.body;
  let prevVersion = await UserCourse.find({ userId, courseId });

  let newEntrie = JSON.parse(newData);
  let k;
  for (let i = 0; i < prevVersion[0].assignments.length; i++) {
    if (prevVersion[0].assignments[i].AssignmentTitle == newEntrie.AssignmentTitle) {
      k = i;
      prevVersion[0].assignments[i] = newEntrie;
      break;
    }
  }
  console.log(prevVersion[0]);
  try {
    const afterScoreUpdate = await UserCourse.findOneAndUpdate({ userId, courseId }, prevVersion[0]);
    res.status(200).json(afterScoreUpdate);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const updateExamScore = async (req, res, next) => {
  const { userId, courseId, ExamName } = req.params;
  const { newData } = req.body;
  let prevVersion = await UserCourse.find({ userId, courseId });

  let newEntrie = JSON.parse(newData);
  let k;
  for (let i = 0; i < prevVersion[0].exams.length; i++) {
    if (prevVersion[0].exams[i].AssignmentTitle == newEntrie.AssignmentTitle) {
      k = i;
      prevVersion[0].exams[i] = newEntrie;
      break;
    }
  }
  console.log(prevVersion[0]);
  try {
    const afterScoreUpdate = await UserCourse.findOneAndUpdate({ userId, courseId }, prevVersion[0]);
    res.status(200).json(afterScoreUpdate);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateUserContentView = async (req, res, next) => {
  const { userId, courseId } = req.params;
  const { title, currentSecond, contentDuration } = req.body;
  console.log(userId);
  console.log(courseId);
  console.log(title);
  const prevPart = await UserCourse.findOne({ userId, courseId, content: { $elemMatch: { Filetitle: title } } }, { "content.$": 1 });
  if (!prevPart) {
    try {
      const createdFileInfo = await UserCourse.findOneAndUpdate(
        { userId, courseId },
        {
          $push: {
            content: {
              Filetitle: title,
              lastCheckPoint: currentSecond,
              maxWatched: currentSecond,
              contentDuration,
              DateViewed: new Date(),
            },
          },
        }
      );
      res.status(200).json({ message: "content updated" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  } else {
    let prevParti = await UserCourse.findOne({ userId, courseId });
    console.log(prevParti);

    for (var j = 0; j < prevParti.content.length; j++) {
      if (prevParti.content[j].Filetitle == title) {
        prevParti.content[j].lastCheckPoint = currentSecond;
        prevParti.content[j].maxWatched = Math.max(prevParti.content[j].maxWatched, currentSecond);
        prevParti.content[j].DateViewed = new Date();
      }
    }
    console.log(prevParti);
    try {
      const newContentInfo = await UserCourse.findOneAndUpdate({ courseId, userId }, prevParti);
      res.status(200).json({ message: "content updated" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
};
