import Community from "../models/Community.js";
import User from "../models/user.js";

export const BwengeCommunitiesResolvers = {
  Query: {
    getAllApprovedCommunities: async () => {
      return await Community.find({ onApproved: true });
    },
    getAllCommunities: async () => {
      return await Community.find();
    },
    getSingleCommunity: async (parent, { id }, context, info) => {
      return await Community.findById(id);
    },
    getCommunityMembers: async (parent, { id }, context, info) => {
      return await User.find({ communities: { $elemMatch: { communityId: id } } });
    },
    getUserCommunities: async (parent, { userId }, context, info) => {
      return await User.findById(userId);
    },
  },
  Mutation: {
    approveCommunity: async (parent, { id, userId, userName }, context, info) => {
      await User.findByIdAndUpdate(userId, {
        $push: {
          communities: {
            communityId: id,
            communityUserName: userName,
          },
        },
      });
      return await Community.findByIdAndUpdate(id, {
        onApproved: true,
      });
    },
    joinLeaveCommunity: async (parent, { id, userId, userName }, context, info) => {
      const CheckUserCommunity = await User.findOne({ _id: userId, communities: { $elemMatch: { communityId: id } } });
      if (CheckUserCommunity) {
        await Community.findByIdAndUpdate(id, {
          $inc: {
            membersCount: -1,
          },
        });
        return await User.findByIdAndUpdate(userId, {
          $pull: {
            communities: {
              communityId: id,
            },
          },
        });
      } else {
        await Community.findByIdAndUpdate(id, {
          $inc: {
            membersCount: 1,
          },
        });
        return await User.findByIdAndUpdate(userId, {
          $push: {
            communities: {
              communityId: id,
              communityUserName: userName,
            },
          },
        });
      }
    },
  },
};
