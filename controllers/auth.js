import User from "../models/user.js";
import FollowerFollowee from "../models/followerFollowee.js";
import ErrorResponse from "../utils/errorResponse.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";
import { uploadImageFile } from "../middleware/ProfilePicturesS3.js";
import sharp from "sharp";

export const register = async (req, res, next) => {
  const {
    firstName,
    lastName,
    birthDate,
    phoneNumber,
    email,
    password,
    institution,
    gender,
  } = req.body;
  const role = "user";
  const user = await User.findOne({ email });
  if (user) {
    return next(new ErrorResponse("Already have an account", 401));
  }
  try {
    const user = await User.create({
      firstName,
      lastName,
      birthDate,
      phoneNumber,
      email,
      password,
      role,
      gender,
      institution,
      joinedDate: new Date(),
    });
    sendToken(user, 201, res);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new ErrorResponse("Please provide an email and a password", 400)
    );
  }
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorResponse("Invalid Username and password", 401));
    }
    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      return next(new ErrorResponse("wrong password", 401));
    }
    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const forgotpassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(
        new ErrorResponse("Email could not be found,Create Account", 404)
      );
    }

    const resetToken = user.getResetPasswordToken();
    await user.save();

    const resetUrl = `${process.env.RESET_BASE_URL}/passwordreset/${resetToken}`;

    const message = `
        <h1>You have requested a password reset</h1>
        <p>Please go to this link to reset your password</p>
        <a href=${resetUrl} clicktracting=off>${resetUrl}</a>
        `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      });
      res.status(200).json({ success: true, data: "Email Sent" });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return next(new ErrorResponse("Email could not be sent", 500));
    }
  } catch (error) {
    next(error);
  }
};
export const Requestverifyemail = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(
        new ErrorResponse("Email could not be found,Create Account", 404)
      );
    }

    const resetToken = user.getConfirmEmailToken();
    await user.save();

    const resetUrl = `${process.env.RESET_BASE_URL}/confirmemail/${resetToken}`;

    const message = `
        <h1>Bwenge User Email Confirmation</h1>
        <p>Please go to this link to confirm your email</p>
        <a href=${resetUrl} clicktracting=off>${resetUrl}</a>
        `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Email Confirmation Request",
        text: message,
      });
      res.status(200).json({ success: true, data: "Email Sent" });
    } catch (error) {
      user.confirmEmailToken = undefined;

      await user.save();

      return next(new ErrorResponse("Email could not be sent", 500));
    }
  } catch (error) {
    next(error);
  }
};
export const resetpassword = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
      return next(new ErrorResponse("Invalid Reset Token", 400));
    }
    user.password = req.body.password;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({
      success: true,
      data: "Password reset success",
    });
  } catch (error) {
    next(error);
  }
};
export const verifyemail = async (req, res, next) => {
  console.log("ok ok ok");
  const confirmEmailToken = crypto
    .createHash("sha256")
    .update(req.params.verifytoken)
    .digest("hex");
  console.log(confirmEmailToken);

  try {
    const user = await User.findOne({
      confirmEmailToken,
    });
    if (!user) {
      return next(new ErrorResponse("Invalid Token", 400));
    }
    user.onEmailVerified = true;

    await user.save();

    res.status(201).json({
      success: true,
      data: "Email verification success",
    });
  } catch (error) {
    next(error);
  }
};

export const verifyUser = async (req, res, next) => {
  const { email, newPassword } = req.body;
  var student = await User.findOne({ email });
  student.password = newPassword;
  student.institution.verified = true;
  try {
    await student.save();
    res.status(201).json({
      success: true,
      data: "Password reset success",
    });
  } catch (error) {
    next(error);
  }
};

export const addInstitutionUser = async (req, res, next) => {
  const {
    prefix,
    firstName,
    lastName,
    birthDate,
    gender,
    phoneNumber,
    email,
    password,
    institution,
  } = req.body;
  console.log({
    firstName,
    lastName,
    birthDate,
    phoneNumber,
    email,
    password,
    institution: JSON.parse(institution),
  });
  const role = "user";
  const user = await User.findOne({ email });
  if (user) {
    return next(new ErrorResponse("Already have an account", 401));
  }
  try {
    const user = await User.create({
      prefix,
      firstName,
      lastName,
      birthDate,
      phoneNumber,
      email,
      password,
      gender,
      joinedDate: new Date(),
      role,
      institution: JSON.parse(institution),
    });
    res.status(200).json({ success: true, message: "Institution User Added" });
  } catch (error) {
    next(error);
  }
};
export const follow = async (req, res, next) => {
  const { followInput } = req.body;

  var followerFolloweeInput = JSON.parse(followInput);
  const checkifNotAlreadyFollowed = await FollowerFollowee.findOne({
    "follower.userId": followerFolloweeInput.follower.userId,
    "follower.firstName": followerFolloweeInput.follower.firstName,
    "follower.lastName": followerFolloweeInput.follower.lastName,
    "followee.userId": followerFolloweeInput.followee.userId,
    "followee.firstName": followerFolloweeInput.followee.firstName,
    "followee.lastName": followerFolloweeInput.followee.lastName,
  });
  if (!checkifNotAlreadyFollowed) {
    try {
      const newFollowing = new FollowerFollowee(followerFolloweeInput);
      await newFollowing.save();
      res.status(200).json({ success: true, message: "followed" });
    } catch (error) {
      next(error);
    }
  }

  return checkifNotAlreadyFollowed;
};

export const updateProfilePicture = async (req, res, next) => {
  const { id } = req.params;
  const file = req.files.selectedPic;
  var uploadPath = `profilepics/${id}.jpg`;
  console.log(file);
  sharp(file.data)
    .resize(400, 400)
    .jpeg({ mozjpeg: true })
    .toBuffer((err, buff) => {
      uploadImageFile(buff, uploadPath);
    });
  try {
    const updatedUserProfile = await User.findByIdAndUpdate(id, {
      profilePicture: uploadPath,
    });
    res.status(200).json({ success: true, message: "profile updated" });
  } catch (error) {
    next(error);
  }
};

export const sendUsersEmail = async (req, res, next) => {
  const { message, subject } = req.body;
  const emailList = ["gasanaelvis20@gmail.com", "jackesjean852@gmail.com"];
  const usersEmails = await User.find();
  console.log(usersEmails);
  Promise.all(
    usersEmails.map((singleEmail) => {
      return sendEmail({
        to: singleEmail.email,
        subject,
        text: message,
      });
    })
  )
    .then(() => {
      res.status(200).json({ success: true, data: "Emails Sent" });
    })
    .catch((error) => {
      next(error);
    });
};
//get the token
const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({
    success: true,
    token,
    email: user.email,
    prefix: user.prefix,
    userName: user.firstName + user.lastName,
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    institution: user.institution,
    birthDate: user.birthDate,
    onEmailVerified: user.onEmailVerified,
    role: user.role,
    id: user._id,
  });
};
