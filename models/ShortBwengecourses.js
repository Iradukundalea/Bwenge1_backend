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

const ShortBwengecourseSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide short course's title"],
  },
  instructor: {
    type: String,
    required: [true, "Please provide course's instructor"],
  },
  field: {
    type: String,
    required: [true, "Please provide course's field"],
  },
  department: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: [true, "Please provide course's type"],
  },
  description: {
    type: String,
    required: [true, "Please provide course's description"],
  },
  courseLength: {
    type: String,
    required: [true, "Please provide course's courseLength"],
  },
  courseIcon: {
    type: String,
    required: [true, "Please provide course's icon"],
  },
  selectedFile: {
    type: String,
    required: [true, "Please provide course's filr"],
  },
  creator: {
    type: creatorSchema,
    required: [true, "Please provide course's instructor info"],
  },
  submissionDate: {
    type: Date,
    required: [true, "Please provide course's submission date"],
  },
  onApproved: {
    type: Boolean,
    default: false,
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

const ShortBwengecourse = mongoose.model("ShortBwengecourse", ShortBwengecourseSchema);
export default ShortBwengecourse;
