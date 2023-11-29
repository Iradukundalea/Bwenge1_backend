import mongoose from "mongoose";

const problemSchema = mongoose.Schema({
  type: {
    type: String,
    required: [false, "Please provide question's type"],
  },
  questionQ: {
    type: String,
    required: [false, "Please provide question"],
  },
  answers: {
    type: [String],
    required: false,
  },
  questionFile: {
    type: String,
    required: false,
  },
  fileRequired: {
    type: Boolean,
    required: true,
  },
  score: {
    type: Number,
    required: [false, "Please provide question's score"],
  },
});

const UserQuizPackage = mongoose.Schema({
  problem: {
    type: problemSchema,
    required: false,
  },
  Useranswer: {
    type: String,
    required: false,
  },
  score: {
    type: Number,
    required: false,
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
  AssignmentId: {
    type: String,
    required: false,
  },
  AssignmentTitle: {
    type: String,
    required: [false, "Please provide quiz's title"],
  },
  userProblemsAnswers: {
    type: [UserProblemsSchema],
    required: false,
  },
});

const userArticleQuizTime = mongoose.Schema({
  userId: {
    type: String,
    required: false,
  },
  articleId: {
    type: String,
    required: false,
  },
  AssignmentId: {
    type: String,
    required: [false, "Please provide quiz's title"],
  },
  QuizDuration: {
    type: Number,
    required: false,
  },
  StartTime: {
    type: Number,
    required: false,
  },
  assignment: {
    type: UserAssignment,
    required: false,
  },
});

const UserArticleQuizTime = mongoose.model("UserArticleQuizTime", userArticleQuizTime);

export default UserArticleQuizTime;
