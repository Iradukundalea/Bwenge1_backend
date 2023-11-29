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
  correctAnswer: {
    type: String,
    required: false,
  },
  score: {
    type: Number,
    required: [false, "Please provide question's score"],
  },
});
const studentTeacherFilesSchema = mongoose.Schema({
  fileloc: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
  timeSent: {
    type: Date,
    required: true,
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
  studentTeacherFiles: {
    type: [studentTeacherFilesSchema],
    required: false,
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
  UserProblemsAnswers: {
    type: [UserQuizPackage],
    required: false,
  },
});

const userQuizTime = mongoose.Schema({
  userId: {
    type: String,
    required: false,
  },
  courseId: {
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

const UserQuizTime = mongoose.model("UserQuizTime", userQuizTime);

export default UserQuizTime;
