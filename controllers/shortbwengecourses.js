import ShortBwengecourse from "../models/ShortBwengecourses.js";
import { uploadFile, uploadImageFile } from "../middleware/BwengeLongCoursesS3.js";
import sharp from "sharp";

export const createShortCourse = async (req, res, next) => {
  const { title, instructor, field, type, department, courseLength, description, creator } = req.body;
  let file = req.files.courseFile;
  let courseIconFile = req.files.courseIcon;
  var thoname = courseIconFile.name.split(".")[0];
  var uploadPath = `Bwengeshortcourses/${title}/${thoname}.jpeg`;

  sharp(courseIconFile.data)
    .resize(2048, 1352)
    .jpeg({ mozjpeg: true })
    .toBuffer((err, buff) => {
      uploadImageFile(buff, uploadPath);
    });
  // uploadFile(courseIconFile, `Bwengeshortcourses/${title}`);
  uploadFile(file, `Bwengeshortcourses/${title}`);

  const newBwengeShortCourse = new ShortBwengecourse({
    title,
    instructor,
    courseIcon: `Bwengeshortcourses\\${title}\\${thoname}.jpeg`,
    field,
    department,
    description,
    courseLength,
    viewers: [],
    likes: [],
    type,
    selectedFile: `Bwengeshortcourses\\${title}\\${file.name}`,
    submissionDate: new Date(),
    creator: JSON.parse(creator),
  });

  try {
    await newBwengeShortCourse.save();
    res.status(200).json({
      success: "true",
      message: "Course uploaded",
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const createShortVideoCourse = async (req, res, next) => {
  const { title, instructor, field, type, courseFile, department, courseLength, description, creator } = req.body;
  let courseIconFile = req.files.courseIcon;
  var thoname = courseIconFile.name.split(".")[0];
  var uploadPath = `Bwengeshortcourses/${title}/${thoname}.jpeg`;

  sharp(courseIconFile.data)
    .resize(2048, 1352)
    .jpeg({ mozjpeg: true })
    .toBuffer((err, buff) => {
      uploadImageFile(buff, uploadPath);
    });
  // uploadFile(courseIconFile, `Bwengeshortcourses/${title}`);

  const newBwengeShortCourse = new ShortBwengecourse({
    title,
    instructor,
    courseIcon: `Bwengeshortcourses\\${title}\\${thoname}.jpeg`,
    field,
    department,
    description,
    courseLength,
    viewers: [],
    likes: [],
    type,
    selectedFile: courseFile,
    submissionDate: new Date(),
    creator: JSON.parse(creator),
  });

  try {
    await newBwengeShortCourse.save();
    res.status(200).json({
      success: "true",
      message: "Course uploaded",
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
