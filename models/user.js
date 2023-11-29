import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import dotenv from "dotenv";
dotenv.config({ path: "./../config.env" });

const InstitutionSchema = mongoose.Schema({
  institutionName: {
    type: String,
    required: [true, "Please provide institution name"],
  },
  studentNumber: {
    type: String,
    required: false,
  },
  department: {
    type: String,
    required: false,
  },
  major: {
    type: String,
    required: false,
  },
  enrolledYear: {
    type: Number,
    required: false,
  },
  institutionRole: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

const communityUserSchema = mongoose.Schema({
  communityId: {
    type: String,
    required: true,
  },
  communityUserName: {
    type: String,
    required: true,
  },
});

const UsersSchema = mongoose.Schema({
  prefix: {
    type: String,
    required: false,
  },
  firstName: {
    type: String,
    required: [true, "Please provide a username"],
  },
  lastName: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    // Regexp to validate emails with more strict rules as added in tests/users.js which also conforms mostly with RFC2822 guide lines
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: [true, "Please provide the user's role"],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false,
  },
  profilePicture: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    required: true,
  },
  joinedDate: {
    type: Date,
    required: true,
  },
  institution: {
    type: InstitutionSchema,
    required: false,
  },
  visitors: {
    type: Number,
    default: 0,
  },
  communities: {
    type: [communityUserSchema],
    required: false,
  },
  onEmailVerified: {
    type: Boolean,
    default: false,
  },
  resetPasswordToken: String,
  confirmEmailToken: String,
  resetPasswordExpire: Date,
});

//Password encryption
UsersSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//mongoose allows creation of functions that can be used by controllers
// creating function for password check
UsersSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//function to get signedInToken

UsersSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, `${process.env.JWT_SECRET_KEY}`, {
    expiresIn: "10min",
  });
};

UsersSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);
  return resetToken;
};
UsersSchema.methods.getConfirmEmailToken = function () {
  const confirmToken = crypto.randomBytes(20).toString("hex");
  this.confirmEmailToken = crypto.createHash("sha256").update(confirmToken).digest("hex");

  return confirmToken;
};

const User = mongoose.model("User", UsersSchema);

export default User;
