import mongoose from "mongoose";

const markingSettingsSchema = mongoose.Schema({
  exams: {
    type: Number,
    required: true,
  },
  assignments: {
    type: Number,
    required: true,
  },
  quizes: {
    type: Number,
    required: true,
  },
  contentView: {
    type: Number,
    required: true,
  },
  discussionsParticipations: {
    type: Number,
    required: true,
  },
});
const QnAForumSchema = mongoose.Schema({
  user: {
    type: String,
    required: false,
  },
  question: {
    type: String,
    required: [true, "Please provide the question"],
  },
});
const commentsSchema = mongoose.Schema({
  sender: {
    type: String,
    required: [true, "Please provide the discussion's sender"],
  },
  content: {
    type: String,
    required: [true, "Please provide the discussion's content"],
  },
  dateSent: {
    type: Date,
    required: [true, "Please provide the discussion's content"],
  },
});

const courseDiscussionSchema = mongoose.Schema({
  sender: {
    type: String,
    required: [true, "Please provide the discussion's sender"],
  },
  title: {
    type: String,
    required: [true, "Please provide the discussion's title"],
  },
  topic: {
    type: String,
    required: [true, "Please provide the discussion's topic"],
  },
  content: {
    type: String,
    required: [true, "Please provide the discussion's content"],
  },
  dateSent: {
    type: Date,
    required: true,
  },
  comments: {
    type: [commentsSchema],
    required: false,
  },
});

const discussionForumSchema = mongoose.Schema({
  QnAForum: {
    type: [QnAForumSchema],
    required: false,
  },
  courseDiscussion: {
    type: [courseDiscussionSchema],
    required: false,
  },
});
const announcementSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide announcement's title"],
  },
  content: {
    type: String,
    required: [true, "Please provide announcement's date"],
  },
  announcementDate: {
    type: Date,
    default: new Date(),
  },
});
const instructorSchema = mongoose.Schema({
  InstructorId: {
    type: String,
    required: true,
  },
  prefix: {
    type: String,
    required: false,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const problemSchema = mongoose.Schema({
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
    type: String,
    required: false,
  },
  score: {
    type: Number,
    required: [true, "Please provide question's score"],
  },
  fileRequired: {
    type: Boolean,
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
  openTime: {
    type: Boolean,
    required: true,
  },
  openTimeRange: {
    type: [Date],
    required: false,
  },
  instructions: {
    type: String,
    required: false,
  },
});

const LectureFileSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide the name of the content"],
  },
  fileLocation: {
    type: String,
    required: [true, "Please provide the file location"],
  },
});

const lectureSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide lecture's title"],
  },
  lectureFiles: {
    type: [LectureFileSchema],
    required: [true, "Please provide lecture's file"],
  },
  assignment: {
    type: [assignmentSchema],
    required: false,
  },
  quiz: {
    type: [assignmentSchema],
    required: false,
  },
});

const chapterSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide chapter's title"],
  },
  lectures: {
    type: [lectureSchema],
    required: [true, "Please provide chapter's lectures"],
  },
  exam: {
    type: [assignmentSchema],
    required: false,
  },
});

const universitySpocSchema = mongoose.Schema({
  courseId: {
    type: String,
    required: true,
  },
  spocTitle: {
    type: String,
    required: true,
  },
  instructors: {
    type: [instructorSchema],
    required: [true, "Please provide course's instructor"],
  },
  university: {
    type: String,
    required: [true, "Please provide course's university"],
  },
  announcement: {
    type: [announcementSchema],
    required: false,
  },
  courseIcon: {
    type: String,
    required: [true, "Please provide course's icon"],
  },
  coursePreview: {
    type: String,
    required: false,
  },
  gradingCriteria: {
    type: String,
    required: [true, "Please provide course's grading criteria"],
  },
  field: {
    type: String,
    required: [true, "Please provide course's field"],
  },
  department: {
    type: String,
    required: [true, "Please provide course's department"],
  },
  type: {
    type: String,
    required: [true, "Please provide course's type"],
  },
  language: {
    type: String,
    required: [true, "Please provide course's language"],
  },
  objectives: {
    type: [String],
    required: [true, "Please provide course's objectives"],
  },
  requirements: {
    type: [String],
    required: [true, "Please provide course's requirements"],
  },
  description: {
    type: String,
    required: [true, "Please provide course's description"],
  },
  chapters: {
    type: [chapterSchema],
    required: [true, "Please provide course's chapters"],
  },
  startingDate: {
    type: Date,
    required: true,
  },
  endingDate: {
    type: Date,
    required: true,
  },
  markingSettings: {
    type: markingSettingsSchema,
    required: true,
  },
  discussionForum: {
    type: discussionForumSchema,
    required: false,
  },
  lastUpdated: {
    type: Date,
    required: [true, "Please provide course's last update"],
  },
});

const universitySpoc = mongoose.model("universitySpoc", universitySpocSchema);
export default universitySpoc;
