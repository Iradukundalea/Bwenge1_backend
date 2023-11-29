import mongoose from "mongoose";

const userInfoSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const FollowerFolloweeSchema = mongoose.Schema({
  follower: {
    type: userInfoSchema,
    required: true,
  },
  followee: {
    type: userInfoSchema,
    required: true,
  },
});

const FollowerFollowee = mongoose.model("FollowerFollowee", FollowerFolloweeSchema);

export default FollowerFollowee;
