import mongoose from "mongoose";

const lettrecontestPackageContestSchema = mongoose.Schema({
  lettreContestId: {
    type: String,
    required: true,
  },
  secondsTaken: {
    type: Number,
    required: true,
  },
  attempts: {
    type: [String],
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  timeStamp: {
    type: Date,
    required: true,
  },
});

const UserDailyContestSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  contestId: {
    type: String,
    required: true,
  },
  lettrecontestPackage: {
    type: [lettrecontestPackageContestSchema],
    required: true,
  },
});

const UserDailyContest = mongoose.model("UserDailyContest", UserDailyContestSchema);

export default UserDailyContest;
