import mongoose from "mongoose";

const problemSchema = mongoose.Schema({
  type: {
    type: String,
    required: [true, "Please provide question's type"],
  },
  questionQ: {
    type: String,
    required: [true, "Please provide question"],
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
    type: String,
    required: false,
  },
  score: {
    type: Number,
    required: [true, "Please provide question's score"],
  },
});
const UserQuizPackage = mongoose.Schema({
  problem: {
    type: problemSchema,
    required: true,
  },
  Useranswer: {
    type: String,
    required: false,
  },
  score: {
    type: Number,
    required: true,
  },
});

const UserProblemsSchema = mongoose.Schema({
  problemInstruction: {
    type: String,
    required: false,
  },
  problemFile: {
    type: String,
    required: false,
  },
  questions: {
    type: [UserQuizPackage],
    required: true,
  },
});
const UserAssignment = mongoose.Schema({
  UserProblemsAnswers: {
    type: [UserProblemsSchema],
    required: true,
  },
  Userscore: {
    type: Number,
    required: true,
  },
  startTime: {
    type: Date,
    required: [true, "Please provide quiz start time"],
  },
  finishTime: {
    type: Date,
    required: [true, "Please provide quiz finish time"],
  },
});

const UserArticleSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  articleId: {
    type: String,
    required: true,
  },
  assignmentId: {
    type: String,
    required: true,
  },
  quiz: {
    type: UserAssignment,
    required: false,
  },
});

const UserArticle = mongoose.model("UserArticle", UserArticleSchema);
export default UserArticle;
