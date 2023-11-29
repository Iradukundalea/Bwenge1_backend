import mongoose from "mongoose";

const creatorSchema = mongoose.Schema({
  creatorId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Please provide creator's email"],
  },
  firstName: {
    type: String,
    required: [true, "Please provide creator username"],
  },
  lastName: {
    type: String,
    required: [true, "Please provide creator username"],
  },
});

const communitySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide community's name"],
  },
  date_created: {
    type: Date,
    required: true,
  },
  profile_picture: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  field: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  creator: {
    type: creatorSchema,
    required: true,
  },

  membersCount: {
    type: Number,
    default: 1,
  },
  communityAdmins: {
    type: [creatorSchema],
    required: false,
  },
  onApproved: {
    type: Boolean,
    default: false,
  },
});

const Community = mongoose.model("Community", communitySchema);
export default Community;
