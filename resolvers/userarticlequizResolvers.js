import UserArticleQuizTime from "../models/userArticleQuizTime.js";

export const userarticlequizResolvers = {
  Query: {
    getUserArticleQuizData: async (parent, { userId, articleId, AssignmentId }, context, info) => {
      console.log({ userId, articleId, AssignmentId });
      const userQuizInfo = await UserArticleQuizTime.findOne({
        userId,
        articleId,
        AssignmentId,
      });
      return userQuizInfo;
    },
  },
};
