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
  lettres: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  result: {
    type: String,
    required: true,
  },
  timeGiven: {
    type: Number,
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
const contestBSchema = mongoose.Schema({
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
  creator: {
    type: creatorSchema,
    required: [true, "Please specify the creator"],
  },
  shiffreContest: {
    type: [shiffreContestSchema],
    required: false,
  },
  lettreContest: {
    type: [lettreContestSchema],
    required: false,
  },
  woddleContest: {
    type: [woddleContestSchema],
    required: false,
  },
});

const ContestB = mongoose.model("ContestB", ContestB);
export default ContestB;
