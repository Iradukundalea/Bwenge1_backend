import { mongoose } from "mongoose";

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
const shiffreContestSchema = mongoose.Schema({
  lesShiffres: {
    type: [Number],
    required: true,
  },
  result: {
    type: Number,
    required: true,
  },
  timeGiven: {
    type: Number,
    required: true,
  },
});
const lettreContestSchema = mongoose.Schema({
  lettre: {
    type: String,
    required: true,
  },
  shuffledText: {
    type: String,
    required: true,
  },
  lettreContestDescription: {
    type: String,
    required: false,
  },
  contestDate: {
    type: Date,
    required: true,
  },
});

const woddleContestSchema = mongoose.Schema({
  ledonne: {
    type: String,
    required: true,
  },
  chancesGiven: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  timeGiven: {
    type: Number,
    required: true,
  },
});
const DailyContestSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please specify contest's title"],
  },
  dateCreated: {
    type: Date,
    default: new Date(),
  },
  creator: {
    type: creatorSchema,
    required: [true, "Please specify the creator"],
  },
  description: {
    type: String,
    required: [true, "Please specify the contest description"],
  },
  communityConnected: {
    type: String,
    required: true,
  },
  //   shiffreContest: {
  //     type: [shiffreContestSchema],
  //     required: false,
  //   },
  lettreContests: {
    type: [lettreContestSchema],
    required: false,
  },
  onApproved: {
    type: Boolean,
    default: false,
  },
  //   woddleContest: {
  //     type: [woddleContestSchema],
  //     required: false,
  //   },
});

const DailyContest = mongoose.model("DailyContest", DailyContestSchema);
export default DailyContest;
