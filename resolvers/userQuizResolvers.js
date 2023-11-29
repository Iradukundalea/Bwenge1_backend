import UserQuizTime from "../models/userQuizTime.js";

export const userQuizResolvers = {
  Query: {
    getUserQuizData: async (parent, { userId, courseId, AssignmentId }, context, info) => {
      const userQuizInfo = await UserQuizTime.findOne({
        userId,
        courseId,
        AssignmentId,
      });
      return userQuizInfo;
    },
  },
};
