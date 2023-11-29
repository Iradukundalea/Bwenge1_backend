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
  studentTeacherFiles: {
    type: [studentTeacherFilesSchema],
    required: false,
  },
});

const UserAssignment = mongoose.Schema({
  AssignmentId: {
    type: String,
    required: true,
  },
  AssignmentTitle: {
    type: String,
    required: [true, "Please provide quiz's title"],
  },
  UserProblemsAnswers: {
    type: [UserQuizPackage],
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
const ContentSchema = mongoose.Schema({
  Filetitle: {
    type: String,
    required: true,
  },
  lastCheckPoint: {
    type: Number,
    required: true,
  },
  maxWatched: {
    type: Number,
    required: true,
  },
  contentDuration: {
    type: Number,
    required: true,
  },
  DateViewed: {
    type: Date,
    required: true,
  },
});
const UserCourseSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  courseId: {
    type: String,
    required: true,
  },
  enrolledDate: {
    type: Date,
    required: true,
  },
  content: {
    type: [ContentSchema],
    required: false,
  },
  assignments: {
    type: [UserAssignment],
    required: false,
  },
  quizes: {
    type: [UserAssignment],
    required: false,
  },
  exams: {
    type: [UserAssignment],
    required: false,
  },
});

const UserCourse = mongoose.model("UserCourse", UserCourseSchema);
export default UserCourse;
