import mongoose from "mongoose";

const polluserSchema = mongoose.Schema({
  pollId: {
    type: String,
    required: [true, "specify the pollid"],
  },
  userId: {
    type: String,
    required: [true, "specify the userid"],
  },
  option: {
    type: String,
    required: [true, "specify his choice"],
  },
});

const PollUser = mongoose.model("PollUser", polluserSchema);
export default PollUser;
