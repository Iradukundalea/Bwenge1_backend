import FollowerFollowee from "../models/followerFollowee.js";

export const FollowerFolloweeResolver = {
  Query: {
    getAllFollowees: async (parent, { id }, context, info) => {
      const followees = await FollowerFollowee.find({ "follower.userId": id });

      return followees;
    },
    getAllFollowers: async (parent, { id }, context, info) => {
      const followers = await FollowerFollowee.find({ "followee.userId": id });

      return followers;
    },
  },
  Mutation: {
    followed: async (parent, { followerFolloweeInput }, context, info) => {
      const checkifNotAlreadyFollowed = await FollowerFollowee.findOne({
        "follower.userId": followerFolloweeInput.follower.userId,
        "follower.firstName": followerFolloweeInput.follower.firstName,
        "follower.lastName": followerFolloweeInput.follower.lastName,
        "followee.userId": followerFolloweeInput.followee.userId,
        "followee.firstName": followerFolloweeInput.followee.firstName,
        "followee.lastName": followerFolloweeInput.followee.lastName,
      });
      if (!checkifNotAlreadyFollowed) {
        const newFollowing = new FollowerFollowee(followerFolloweeInput);
        return await newFollowing.save();
      }
      return checkifNotAlreadyFollowed;
    },
    unfollowed: async (parent, { followerFolloweeInput }, context, info) => {
      const deleteFollowing = await FollowerFollowee.findOneAndDelete({
        "follower.userId": followerFolloweeInput.follower.userId,
        "follower.firstName": followerFolloweeInput.follower.firstName,
        "follower.lastName": followerFolloweeInput.follower.lastName,
        "followee.userId": followerFolloweeInput.followee.userId,
        "followee.firstName": followerFolloweeInput.followee.firstName,
        "followee.lastName": followerFolloweeInput.followee.lastName,
      });
      console.log(deleteFollowing);
      return deleteFollowing;
    },
  },
};
