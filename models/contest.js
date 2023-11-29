import { mongoose } from "mongoose";

const QuickQuestionsSchema = mongoose.Schema({
  question: {
    type: String,
    required: [true, "Please write the question"],
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
const fastSelectionSingleSchema = mongoose.Schema({
  question: {
    type: String,
    required: [true, "Please specify fast selection Single question"],
  },
  options: {
    type: [String],
    required: [true, "Please specify fast selection Single options"],
  },
  correctOptions: {
    type: [String],
    required: [true, "Please specify fast selection correct options"],
  },
});
const PairSchema = mongoose.Schema({
  pair1: {
    type: String,
    required: [true, "select first pair"],
  },
  pair2: {
    type: String,
    required: [true, "select second pair"],
  },
});
const fastSelectionPairSchema = mongoose.Schema({
  question: {
    type: String,
    required: [true, "Please specify fast selection Single question"],
  },
  options: {
    type: [String],
    required: [true, "Please specify fast selection Single options"],
  },
  correctPair: {
    type: [PairSchema],
    required: [true, "Please specify fast selection correct options"],
  },
});
const lastSectionSchema = mongoose.Schema({
  questionSet: {
    type: [String],
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});
const contestSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please specify contest's title"],
  },
  dateCreated: {
    type: String,
    required: [true, "Please specify contest's date of creation"],
  },
  dateTobeLaunched: {
    type: String,
    required: [true, "Please specify contest's date to be launched"],
  },
  quizQuickQuestions: {
    type: [QuickQuestionsSchema],
    required: true,
  },
  fastSelectionSingle: {
    type: [fastSelectionSingleSchema],
    required: true,
  },
  fastSelectionPair: {
    type: [fastSelectionPairSchema],
    required: true,
  },
  lastSection: {
    type: [lastSectionSchema],
    required: true,
  },
});
