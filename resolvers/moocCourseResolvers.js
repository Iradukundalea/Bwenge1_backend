import LongMoocCourse from "../models/universitylongcourses.js";
import Mongoose from "mongoose";
import universitySpoc from "../models/universitySpoc.js";

export const moocCourseResolvers = {
  Query: {
    getAllMoocs: async () => {
      return await LongMoocCourse.find();
    },
    getMooc: async (parent, { id }, context, info) => {
      return await LongMoocCourse.findById(id);
    },
    getMoocAssignment: async (parent, { courseId, assignmentId }, context, info) => {
      const result = await universitySpoc.findById(courseId);
      console.log(result);
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
    getMoocQuiz: async (parent, { courseId, QuizId }, context, info) => {
      console.log("hweer");
      const result = await universitySpoc.findById(courseId);
      console.log(result);
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
    getMoocExam: async (parent, { courseId, examId }, context, info) => {
      const result = await universitySpoc.findById(courseId);
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
    getInstitutionMoocs: async (parent, { name }, context, info) => {
      const results = await LongMoocCourse.find({ university: name });
      return results;
    },
    getInstitutionInstructorMoocs: async (parent, { name, instructorId }, context, info) => {
      const results = await LongMoocCourse.find({
        university: name,
        instructors: { $elemMatch: { InstructorId: instructorId } },
      });
      return results;
    },
  },
};
