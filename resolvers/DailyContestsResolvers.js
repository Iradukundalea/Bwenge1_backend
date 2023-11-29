import DailyContest from "../models/DailyContest.js";

export const DailyContestsResolvers = {
  Query: {
    getAllCommunityDailyContests: async (parent, { communityId }, context, info) => {
      return await DailyContest.find({
        communityConnected: communityId,
      });
    },
    getApprovedCommunityDailyContests: async (parent, { communityId }, context, info) => {
      return await DailyContest.find({
        communityConnected: communityId,
        onApproved: true,
      });
    },
    getSingleCommunityDailyContest: async (parent, { id }, context, info) => {
      return await DailyContest.findById(id);
    },
    getSingleCommunityDailyContestSingleDay: async (parent, { lettreContestId }, context, info) => {
      return await DailyContest.findOne(
        {
          lettreContests: { $elemMatch: { _id: lettreContestId } },
        },
        {
          lettreContests: { $elemMatch: { _id: lettreContestId } },
          title: 1,
          _id: 1,
        }
      );
    },
  },
  Mutation: {
    approveContest: async (parent, { contestId }, context, info) => {
      return await DailyContest.findByIdAndUpdate(contestId, {
        onApproved: true,
      });
    },
  },
};
