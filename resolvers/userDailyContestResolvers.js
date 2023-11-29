import UserDailyContest from "../models/userDailyContest.js";
import User from "../models/user.js";

export const userDailyContestResolvers = {
  Query: {
    getAllusersDailyContest: async (parent, { contestId }, context, info) => {
      const withUserProfile = await UserDailyContest.aggregate([
        {
          $match: { contestId },
        },
        { $addFields: { userIdObject: { $toObjectId: "$userId" } } },
        { $lookup: { from: "users", localField: "userIdObject", foreignField: "_id", as: "participant" } },
      ]);
      console.log(withUserProfile);
      return withUserProfile;
    },
    getAllusersSingleDailyContest: async (parent, { contestId, singleContestId }, context, info) => {
      return await UserDailyContest.find(
        {
          contestId,
          lettrecontestPackage: {
            $elemMatch: {
              lettreContestId: singleContestId,
            },
          },
        },
        {
          lettrecontestPackage: {
            $elemMatch: {
              lettreContestId: singleContestId,
            },
          },
          userId: 1,
          contestId: 1,
        }
      );
    },
  },
};
