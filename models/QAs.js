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
const CommentSchema = mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },

  creator: {
    type: creatorSchema,
    required: true,
  },
  parentId: {
    type: String,
    required: false,
  },
  depth: {
    type: Number,
    default: 1,
  },
  likes: {
    type: [String],
    required: false,
  },
});

const likesSchema = mongoose.Schema({
  liker: {
    type: String,
    required: true,
  },
  dateliked: {
    type: Date,
    required: true,
  },
});
const viewsSchema = mongoose.Schema({
  viewer: {
    type: String,
    required: true,
  },
  dateviewed: {
    type: Date,
    required: true,
  },
});
const QASchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please set Article's title"],
  },
  questionridea: {
    type: String,
    required: true,
  },
  dateOfSubmission: {
    type: Date,
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
  communityConnected: {
    type: String,
    required: false,
  },
  creator: {
    type: creatorSchema,
    required: true,
  },
  viewers: {
    type: [viewsSchema],
    required: false,
  },
  likes: {
    type: [likesSchema],
    required: false,
  },
  comments: {
    type: [CommentSchema],
    required: false,
  },
});

const QAs = mongoose.model("QAs", QASchema);

export default QAs;
