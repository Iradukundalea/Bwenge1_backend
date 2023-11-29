import NsangizaRequest from "../models/nsangizaRequest.js";
import { uploadFile, uploadImageFile } from "../middleware/NsangizaS3.js";
import Jimp from "jimp";
import sharp from "sharp";
export const requestNsangiza = async (req, res, next) => {
  const { title, briefIntroduction, meetingTime, hostNames, hostIntroduction, hostContacts, email } = req.body;
  let meetingIcon;
  if (req.files) {
    meetingIcon = req.files.meetingIcon;
    var thoname = meetingIcon.name.split(".")[0];
    var uploadPath = `NsangizaTheme/${title}/${thoname}.jpeg`;

    sharp(meetingIcon.data)
      .resize(2048, 1352)
      .jpeg({ mozjpeg: true })
      .toBuffer((err, buff) => {
        uploadImageFile(buff, uploadPath);
      });
    // uploadFile(meetingIcon, `NsangizaTheme/${title}`);
  }

  const newNsangizaRequest = new NsangizaRequest({
    title,
    briefIntroduction,
    meetingTime,
    hostNames,
    meetingTheme: req.files ? `NsangizaTheme\\${title}\\${thoname}.jpeg` : "",
    hostIntroduction,
    hostContacts,
    email,
  });
  try {
    await newNsangizaRequest.save();
    res.status(200).json({
      success: true,
      message: "Nsangiza Request Successfully",
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
