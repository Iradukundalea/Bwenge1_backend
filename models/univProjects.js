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

const UnivProjectSchema = mongoose.Schema({
  authors: {
    type: [String],
    required: [true, "Please provide projects's authors"],
  },
  title: {
    type: String,
    unique: true,
    required: [true, "Please provide projects's title"],
  },
  submissionDate: {
    type: Date,
    required: [true, "Please provide projects's publication date"],
  },
  university: {
    type: String,
    required: [true, "Please provide author's country"],
  },

  field: {
    type: String,
    required: [true, "Please provide projects's field"],
  },
  department: {
    type: String,
    required: false,
  },
  level: {
    type: String,
    required: [true, "Please provide projects's level"],
  },
  abstract: {
    type: String,
    required: [true, "Please provide projects's abstract"],
  },
  keywords: {
    type: [String],
    required: [true, "Please provide projects's keywords"],
  },
  selectedFile: {
    type: String,
    required: [true, "Please provide projects's pdf"],
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  contacts: {
    type: String,
    required: [true, "Please provide your contacts"],
  },
  comments: {
    type: [CommentSchema],
    required: false,
  },
  onApproved: {
    type: Boolean,
    default: false,
  },
  creator: {
    type: creatorSchema,
    required: [true, "Please provide project's instructor info"],
  },
});

const UnivProjects = mongoose.model("UnivProjects", UnivProjectSchema);
export default UnivProjects;
