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

const roadMapItemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  achievers: {
    type: [creatorSchema],
    required: true,
  },
});

const goalSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  roadMap: {
    type: [roadMapItemSchema],
    required: [true, "Please provide a roadmap"],
  },
  participants: {
    type: [creatorSchema],
    required: false,
  },
  date_started: {
    type: Date,
    required: true,
  },
  date_finished: {
    type: Date,
    required: false,
  },
  communityConnected: {
    type: String,
    required: true,
  },
});

const Goal = mongoose.model("BwengeGoal", goalSchema);

export default Goal;
