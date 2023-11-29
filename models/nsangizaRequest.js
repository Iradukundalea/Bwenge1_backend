import mongoose from "mongoose";

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
const CommentSchema = mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },

  creator: {
    type: creatorSchema,
    required: true,
  },
  parentId: {
    type: String,
    required: false,
  },
  depth: {
    type: Number,
    default: 1,
  },
  likes: {
    type: [String],
    required: false,
  },
});

const nsangizaRequestSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please set your Nsangiza's title"],
  },
  briefIntroduction: {
    type: String,
    required: [true, "Please set your Nsangiza's brief Introduction"],
  },
  meetingTime: {
    type: Date,
    required: [true, "Please set your Nsangiza's time and date"],
  },
  hostNames: {
    type: String,
    required: [true, "Please set your Nsangiza's host names"],
  },
  meetingTheme: {
    type: String,
    required: false,
  },
  hostIntroduction: {
    type: String,
    required: [true, "Please set your Nsangiza's host introduction"],
  },
  hostContacts: {
    type: String,
    required: [true, "Please set your Nsangiza's host contacts"],
  },
  email: {
    type: String,
    required: true,
  },
  hostLink: {
    type: String,
    required: false,
  },
  attendeeLink: {
    type: String,
    required: false,
  },
  onApproved: {
    type: Boolean,
    default: false,
  },
  likes: {
    type: [String],
    required: false,
  },
  bookings: {
    type: [String],
    required: false,
  },
  comments: {
    type: [CommentSchema],
    required: false,
  },
});

const NsangizaRequest = mongoose.model("nsangizaRequest", nsangizaRequestSchema);
export default NsangizaRequest;
