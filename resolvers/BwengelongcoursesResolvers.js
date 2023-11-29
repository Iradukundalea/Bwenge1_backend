import LongBwengeCourse from "../models/LongBwengecourses.js";
import Mongoose from "mongoose";

export const bwengelongcoursesResolvers = {
  Query: {
    getAllLongCourses: async () => {
      return await LongBwengeCourse.find();
    },
    getAllApprovedLongCourses: async () => {
      return await LongBwengeCourse.find({ onApproved: true });
    },
    getLongCourse: async (parent, { id }, context, info) => {
      return await LongBwengeCourse.findById(id);
    },
    getAssignment: async (parent, { courseId, assignmentId }, context, info) => {
      const result = await LongBwengeCourse.findById(courseId);
      //   console.log(result);
      for (let i = 0; i < result.chapters.length; i++) {
        for (let j = 0; j < result.chapters[i].lectures.length; j++) {
          for (let k = 0; k < result.chapters[i].lectures[j].assignment.length; k++) {
            if (result.chapters[i].lectures[j].assignment[k]._id.toString() == assignmentId) {
              console.log(result.chapters[i].lectures[j].assignment[k]);
              return result.chapters[i].lectures[j].assignment[k];
            }
          }
        }
      }
    },
    getQuiz: async (parent, { courseId, QuizId }, context, info) => {
      const result = await LongBwengeCourse.findById(courseId);
      //   console.log(result);
      for (let i = 0; i < result.chapters.length; i++) {
        for (let j = 0; j < result.chapters[i].lectures.length; j++) {
          for (let k = 0; k < result.chapters[i].lectures[j].quiz.length; k++) {
            if (result.chapters[i].lectures[j].quiz[k]._id.toString() == QuizId) {
              // console.log(result.chapters[i].lectures[j].assignment[k]);
              return result.chapters[i].lectures[j].quiz[k];
            }
          }
        }
      }
    },
    getExam: async (parent, { courseId, examId }, context, info) => {
      const result = await LongBwengeCourse.findById(courseId);
      //   console.log(result);
      for (let i = 0; i < result.chapters.length; i++) {
        for (let k = 0; k < result.chapters[i].exam.length; k++) {
          console.log(result.chapters[i].exam[k]._id.toString());

          if (result.chapters[i].exam[k]._id.toString() == examId) {
            return result.chapters[i].exam[k];
          }
        }
      }
    },
    getInstructorLongCourses: async (parent, { email }, context, info) => {
      console.log(email);
      const results = await LongBwengeCourse.find({
        "creator.email": email,
      });
      console.log(results);
      return results;
    },
  },
  Mutation: {
    approveLongCourse: async (parent, { id }, context, info) => {
      return await LongBwengeCourse.findByIdAndUpdate(id, {
        onApproved: true,
      });
    },
  },
};
