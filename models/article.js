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
const PollsSchema = mongoose.Schema({
  topic: {
    type: String,
    required: [true, "Please specify poll topic"],
  },
  options: {
    type: [String],
    required: [true, "Please specify poll options"],
  },
});
const questionSchema = mongoose.Schema({
  type: {
    type: String,
    required: [true, "Please provide question's type"],
  },
  questionQ: {
    type: String,
    required: false,
  },
  questionFile: {
    type: String,
    required: false,
  },
  answers: {
    type: [String],
    required: false,
  },
  correctAnswer: {
    type: [String],
    required: false,
  },
  score: {
    type: Number,
    required: [true, "Please provide question's score"],
  },
});
const problemSchema = mongoose.Schema({
  problemInstruction: {
    type: String,
    required: false,
  },
  problemFile: {
    type: String,
    required: false,
  },
  questions: {
    type: [questionSchema],
    required: true,
  },
});

const assignmentSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide quiz's title"],
  },
  problems: {
    type: [problemSchema],
    required: false,
  },
  maximumScore: {
    type: Number,
    required: true,
  },
  estimatedDuration: {
    type: Number,
    required: true,
  },

  instructions: {
    type: String,
    required: false,
  },
});
const articleSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please set Article's title"],
  },
  article: {
    type: String,
    required: true,
  },
  field: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: false,
  },
  tags: {
    type: [String],
    required: false,
  },
  dateOfSubmission: {
    type: Date,
    required: true,
  },
  creator: {
    type: creatorSchema,
    required: true,
  },
  onApproved: {
    type: Boolean,
    default: false,
  },
  viewers: {
    type: [viewsSchema],
    required: false,
  },
  polls: {
    type: [PollsSchema],
    required: false,
  },
  likes: {
    type: [likesSchema],
    required: false,
  },
  communityConnected: {
    type: String,
    required: false,
  },
  comments: {
    type: [CommentSchema],
    required: false,
  },
  bwenge_score: {
    type: Number,
    default: 0,
  },
  postArticleQuiz: {
    type: [assignmentSchema],
    required: false,
  },
});

const BwengeArticle = mongoose.model("BwengeArticle", articleSchema);
export default BwengeArticle;
