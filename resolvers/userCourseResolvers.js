import UserCourse from "../models/UserCourse.js";
import LongMoocCourse from "../models/universitylongcourses.js";
import User from "../models/user.js";
import universitySpoc from "../models/universitySpoc.js";
import LongBwengeCourse from "../models/LongBwengecourses.js";

export const userCourseResolvers = {
  Query: {
    getBWENGEUserCourses: async (parent, { userId }, context, info) => {
      const coursesIDs = await UserCourse.find({ userId }, { courseId: 1, _id: 1, assignments: 1, exams: 1 });
      var mycourses = [];
      for (var i = 0; i < coursesIDs.length; i++) {
        const course = await LongBwengeCourse.findById(coursesIDs[i].courseId);
        if (course == null) continue;
        console.log(course);
        mycourses.push(course);
      }
      return mycourses;
    },
    getUserCourses: async (parent, { userId }, context, info) => {
      const coursesIDs = await UserCourse.find({ userId }, { courseId: 1, _id: 1, assignments: 1, exams: 1 });
      var mycourses = [];
      for (var i = 0; i < coursesIDs.length; i++) {
        const course = await LongMoocCourse.findById(coursesIDs[i].courseId);
        console.log(course);
        if (course == null) continue;
        mycourses.push(course);
      }
      console.log(mycourses);
      return mycourses;
    },
    getStudentCourses: async (parent, { userId, institutionName }, context, info) => {
      const coursesIDs = await UserCourse.find({ userId }, { courseId: 1, _id: 1, assignments: 1, exams: 1 });
      console.log(coursesIDs);
      var mycourses = [];
      for (var i = 0; i < coursesIDs.length; i++) {
        const course = await universitySpoc.findOne({
          _id: coursesIDs[i].courseId,
          university: institutionName,
        });
        console.log(course);
        mycourses.push(course);
        // mycourses.push({
        //   course,
        //   Userassignments: coursesIDs[i].assignments,
        //   UserExams: coursesIDs[i].exams,
        // });
      }
      return mycourses;
    },
    getUserCourseData: async (parent, { userId, courseId }, context, info) => {
      const userCourseData = await UserCourse.find({ userId, courseId }, { assignments: 1, exams: 1, quizes: 1 });
      return userCourseData;
    },
    getUserCourseAssignmentResults: async (parent, { userId, courseId, AssignmentTitle }, context, info) => {
      const AssignmentRes = await UserCourse.findOne(
        {
          userId,
          courseId,
          assignments: { $elemMatch: { AssignmentTitle: AssignmentTitle } },
        },
        { "assignments.$": 1 }
      );
      console.log(AssignmentRes);
      return AssignmentRes;
    },
    getUserCourseQuizResults: async (parent, { userId, courseId, AssignmentTitle }, context, info) => {
      const AssignmentRes = await UserCourse.findOne(
        {
          userId,
          courseId,
          quizes: { $elemMatch: { AssignmentTitle: AssignmentTitle } },
        },
        { "quizes.$": 1 }
      );
      console.log(AssignmentRes);
      return AssignmentRes;
    },
    getUserCourseExamResults: async (parent, { userId, courseId, AssignmentTitle }, context, info) => {
      const ExamRes = await UserCourse.findOne(
        {
          userId,
          courseId,
          exams: { $elemMatch: { AssignmentTitle: AssignmentTitle } },
        },
        { "exams.$": 1 }
      );
      return ExamRes;
    },
    getAllInstructorData: async (parent, { courseId }, context, info) => {
      const InstructorData = await UserCourse.find({ courseId });
      for (let i = 0; i < InstructorData.length; i++) {
        console.log(InstructorData[i].assignments);
        const name = await User.findById(InstructorData[i].userId, {
          firstName: 1,
          lastName: 1,
          email: 1,
          institution: 1,
        });
        InstructorData[i].firstName = name.firstName;
        InstructorData[i].lastName = name.lastName;
        InstructorData[i].email = name.email;
        InstructorData[i].studentNumber = name.institution.studentNumber;
      }

      return InstructorData;
    },
    getBwengeLongCourseInstructorData: async (parent, { courseId }, context, info) => {
      const InstructorData = await UserCourse.find({ courseId });
      for (let i = 0; i < InstructorData.length; i++) {
        console.log(InstructorData[i].assignments);
        const name = await User.findById(InstructorData[i].userId, {
          firstName: 1,
          lastName: 1,
          email: 1,
          institution: 1,
        });
        InstructorData[i].firstName = name.firstName;
        InstructorData[i].lastName = name.lastName;
        InstructorData[i].email = name.email;
      }

      return InstructorData;
    },

    getInstructorAssignmentData: async (parent, { courseId, AssignmentTitle }, context, info) => {
      const InstructorData = await UserCourse.find({ courseId });
      for (let i = 0; i < InstructorData.length; i++) {
        console.log(InstructorData[i].assignments);
        const name = await User.findById(InstructorData[i].userId, {
          firstName: 1,
          lastName: 1,
          email: 1,
          institution: 1,
        });
        console.log(name);
        InstructorData[i].firstName = name.firstName;
        InstructorData[i].lastName = name.lastName;
        InstructorData[i].email = name.email;
        InstructorData[i].studentNumber = name.institution.studentNumber;
        InstructorData[i].assignments = InstructorData[i].assignments.filter((item) => item.AssignmentTitle == AssignmentTitle);
        console.log(InstructorData[i].assignments);
      }
      return InstructorData;
    },
    getInstructorQuizData: async (parent, { courseId, AssignmentTitle }, context, info) => {
      const InstructorData = await UserCourse.find({ courseId });
      for (let i = 0; i < InstructorData.length; i++) {
        console.log(InstructorData[i].assignments);
        const name = await User.findById(InstructorData[i].userId, {
          firstName: 1,
          lastName: 1,
          email: 1,
          institution: 1,
        });
        console.log(name);
        InstructorData[i].firstName = name.firstName;
        InstructorData[i].lastName = name.lastName;
        InstructorData[i].email = name.email;
        InstructorData[i].studentNumber = name.institution.studentNumber;
        InstructorData[i].assignments = InstructorData[i].quizes.filter((item) => item.AssignmentTitle == AssignmentTitle);
        console.log(InstructorData[i].assignments);
      }
      return InstructorData;
    },
    getInstructorExamData: async (parent, { courseId, AssignmentTitle }, context, info) => {
      const InstructorData = await UserCourse.find({ courseId });
      for (let i = 0; i < InstructorData.length; i++) {
        console.log(InstructorData[i].assignments);
        const name = await User.findById(InstructorData[i].userId, {
          firstName: 1,
          lastName: 1,
          email: 1,
          institution: 1,
        });
        console.log(name);
        InstructorData[i].firstName = name.firstName;
        InstructorData[i].lastName = name.lastName;
        InstructorData[i].email = name.email;
        InstructorData[i].studentNumber = name.institution.studentNumber;
        InstructorData[i].exams = InstructorData[i].exams.filter((item) => item.AssignmentTitle == AssignmentTitle);
        console.log(InstructorData[i].assignments);
      }
      return InstructorData;
    },
    getContentData: async (parent, { userId, courseId, title }, context, info) => {
      const prevPart = await UserCourse.findOne({ userId, courseId, content: { $elemMatch: { Filetitle: title } } }, { "content.$": 1 });
      return prevPart;
    },
  },
};
