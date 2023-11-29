import universitySpoc from "../models/universitySpoc.js";

export const spocCourseResolvers = {
  Query: {
    getAllSpocs: async (parent, { courseId, InstructorId }, context, info) => {
      return await universitySpoc.find({ courseId, instructors: { $elemMatch: { InstructorId: InstructorId } } });
    },
    getSpoc: async (parent, { id }, context, info) => {
      return await universitySpoc.findById(id);
    },
    getMaximumMarksforInstructor: async (parent, { id }, context, info) => {
      const spoc = await universitySpoc.findById(id);
      var marks = {
        quizesMarks: 0,
        assignmentsMarks: 0,
        examsMarks: 0,
      };
      for (var i = 0; i < spoc.chapters.length; i++) {
        for (var j = 0; j < spoc.chapters[i].lectures.length; j++) {
          for (var k = 0; k < spoc.chapters[i].lectures[j].quiz.length; k++) {
            marks.quizesMarks += spoc.chapters[i].lectures[j].quiz[k].maximumScore;
          }
          for (var k = 0; k < spoc.chapters[i].lectures[j].assignment.length; k++) {
            marks.assignmentsMarks += spoc.chapters[i].lectures[j].assignment[k].maximumScore;
          }
        }
        for (var j = 0; j < spoc.chapters[i].exam.length; j++) {
          marks.examsMarks += spoc.chapters[i].exam[j].maximumScore;
        }
      }
      return marks;
    },
  },
};
