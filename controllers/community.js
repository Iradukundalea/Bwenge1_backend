import Community from "../models/Community.js";
import sharp from "sharp";
import { uploadImageFile } from "../middleware/BwengeCommunityS3.js";
import User from "../models/user.js";
import DailyContest from "../models/DailyContest.js";

export const createCommunity = async (req, res, next) => {
  const { name, type, field, department, description, creator } = req.body;
  var creatorUser = JSON.parse(creator);
  var newCommunity = new Community({
    name,
    type,
    field,
    department,
    description,
    creator: JSON.parse(creator),
    date_created: new Date(),
  });
  try {
    const thocom = await newCommunity.save();
    console.log(thocom);
    res.status(200).json({
      success: "true",
      message: "Community created",
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const updateCommunityProfilePict = async (req, res, next) => {
  const { id } = req.params;
  const file = req.files.selectedPic;
  var uploadPath = `communityprofilepics/${id}.jpg`;
  sharp(file.data)
    .resize(400, 400)
    .jpeg({ mozjpeg: true })
    .toBuffer((err, buff) => {
      uploadImageFile(buff, uploadPath);
    });
  try {
    const updatedUserProfile = await Community.findByIdAndUpdate(id, { profile_picture: uploadPath });
    res.status(200).json({ success: true, message: "profile updated" });
  } catch (error) {
    next(error);
  }
};

export const createDailyContest = async (req, res, next) => {
  const { contest } = req.body;

  var Thocontest = JSON.parse(contest);

  var newContest = new DailyContest(Thocontest);
  try {
    await newContest.save();
    res.status(200).json({
      success: "true",
      message: "Daily Contest created",
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
