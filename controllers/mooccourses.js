import Mongoose from "mongoose";
import LongMoocCourse from "../models/universitylongcourses.js";
import _ from "lodash";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { uploadFile, uploadImageFile } from "./../middleware/s3.js";
import universitySpoc from "../models/universitySpoc.js";
import sharp from "sharp";
// import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getAllMoocCourses = async (req, res, next) => {
  try {
    const moocCourses = await LongMoocCourse.find();
    res.status(200).json(moocCourses);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const createMoocCourse = async (req, res, next) => {
  const {
    title,
    lead_headline,
    instructors,
    courseIcon,
    coursePreview,
    field,
    type,
    department,
    university,
    gradingCriteria,
    language,
    objectives,
    description,
    requirements,
    chapters,
    creator,
    announcement,
  } = req.body;
  let files = req.files.courseFiles;
  let Examfiles = req.files.examFiles;
  let Assignmentfiles = req.files.assignmentFiles;
  let Quizfiles = req.files.quizFiles;
  console.log(Examfiles);
  //k for lecture files
  let k = 0;
  //ef for exam files
  let ef = 0;
  //qf for quiz files
  let qf = 0;
  //af for assignment files
  let af = 0;

  let newChpts = JSON.parse(chapters);
  for (var i = 0; i < newChpts.length; i++) {
    for (var j = 0; j < newChpts[i].lectures.length; j++) {
      //quizes files
      for (var l = 0; l < newChpts[i].lectures[j].quiz.length; l++) {
        for (var m = 0; m < newChpts[i].lectures[j].quiz[l].problems.length; m++) {
          if (newChpts[i].lectures[j].quiz[l].problems[m].questionFile) {
            if (_.isArray(Quizfiles)) {
              newChpts[i].lectures[j].quiz[l].problems[m].questionFile = `Mooccourses\\${title}\\chapters\\Chapter${i + 1}\\lecture${
                j + 1
              }\\quizes\\quiz${l + 1}\\${Quizfiles[qf].name}`;
              qf++;
            } else {
              newChpts[i].lectures[j].quiz[l].problems[m].questionFile = `Mooccourses\\${title}\\chapters\\Chapter${i + 1}\\lecture${
                j + 1
              }\\quizes\\quiz${l + 1}\\${Quizfiles.name}`;
            }
          }
        }
      }
      //assignment files
      for (var l = 0; l < newChpts[i].lectures[j].assignment.length; l++) {
        for (var m = 0; m < newChpts[i].lectures[j].assignment[l].problems.length; m++) {
          if (newChpts[i].lectures[j].assignment[l].problems[m].questionFile) {
            if (_.isArray(Quizfiles)) {
              newChpts[i].lectures[j].assignment[l].problems[m].questionFile = `Mooccourses\\${title}\\chapters\\Chapter${i + 1}\\lecture${
                j + 1
              }\\assignments\\assignment${l + 1}\\${Assignmentfiles[af].name}`;
              af++;
            } else {
              newChpts[i].lectures[j].assignment[l].problems[m].questionFile = `Mooccourses\\${title}\\chapters\\Chapter${i + 1}\\lecture${
                j + 1
              }\\assignments\\assignment${l + 1}\\${Assignmentfiles.name}`;
            }
          }
        }
      }
      //modified to remove number of files
      for (var l = 0; l < newChpts[i].lectures[j].lectureFiles.length; l++) {
        if (_.isArray(files)) {
          newChpts[i].lectures[j].lectureFiles[l].fileLocation = `Mooccourses\\${title}\\chapters\\Chapter${i + 1}\\lecture${j + 1}\\${
            files[k].name
          }`;
          k++;
        } else {
          newChpts[i].lectures[j].lectureFiles[l].fileLocation = `Mooccourses\\${title}\\chapters\\Chapter${i + 1}\\lecture${j + 1}\\${files.name}`;
        }
      }
    }
    //exams files
    for (var j = 0; j < newChpts[i].exam.length; j++) {
      for (var l = 0; newChpts[i].exam[j] && l < newChpts[i].exam[j].problems.length; l++) {
        if (newChpts[i].exam[j].problems[l].questionFile) {
          if (_.isArray(Examfiles)) {
            newChpts[i].exam[j].problems[l].questionFile = `Mooccourses\\${title}\\chapters\\Chapter${i + 1}\\exams\\exam${j}\\${Examfiles[ef].name}`;
            ef++;
          } else {
            newChpts[i].exam[j].problems[l].questionFile = `Mooccourses\\${title}\\chapters\\Chapter${i + 1}\\exams\\exam${j + 1}\\${Examfiles.name}`;
          }
        }
      }
    }
  }

  k = 0;
  ef = 0;
  qf = 0;
  for (var i = 0; i < newChpts.length; i++) {
    for (var j = 0; j < newChpts[i].lectures.length; j++) {
      //quizes files upload on server
      for (var l = 0; l < newChpts[i].lectures[j].quiz.length; l++) {
        for (var m = 0; m < newChpts[i].lectures[j].quiz[l].problems.length; m++) {
          if (newChpts[i].lectures[j].quiz[l].problems[m].questionFile) {
            if (_.isArray(Quizfiles)) {
              uploadFile(Quizfiles[k], `Mooccourses/${title}/chapters/Chapter${i + 1}/lecture${j + 1}/quizes/quiz${l + 1}`);

              qf++;
            } else {
              uploadFile(Quizfiles, `Mooccourses/${title}/chapters/Chapter${i + 1}/lecture${j + 1}/quizes/quiz${l + 1}`);
            }
          }
        }
      }

      //Assignment files upload on server
      for (var l = 0; l < newChpts[i].lectures[j].assignment.length; l++) {
        for (var m = 0; m < newChpts[i].lectures[j].assignment[l].problems.length; m++) {
          if (newChpts[i].lectures[j].assignment[l].problems[m].questionFile) {
            if (_.isArray(Assignmentfiles)) {
              uploadFile(Assignmentfiles[k], `Mooccourses/${title}/chapters/Chapter${i + 1}/lecture${j + 1}/assignments/assignment${l + 1}`);

              qf++;
            } else {
              uploadFile(Assignmentfiles, `Mooccourses/${title}/chapters/Chapter${i + 1}/lecture${j + 1}/assignments/assignment${l + 1}`);
            }
          }
        }
      }

      for (var l = 0; l < newChpts[i].lectures[j].lectureFiles.length; l++) {
        if (_.isArray(files)) {
          uploadFile(files[k], `Mooccourses/${title}/chapters/Chapter${i + 1}/lecture${j + 1}`);

          k++;
        } else {
          uploadFile(files, `Mooccourses/${title}/chapters/Chapter${i + 1}/lecture${j + 1}`);
        }
      }
    }
    //exam files
    for (var j = 0; j < newChpts[i].exam.length; j++) {
      for (var l = 0; newChpts[i].exam[j] && l < newChpts[i].exam[j].problems.length; l++) {
        if (newChpts[i].exam[j].problems[l].questionFile) {
          if (_.isArray(Examfiles)) {
            uploadFile(Examfiles[ef], `Mooccourses/${title}/chapters/Chapter${i + 1}/exams/exam${j + 1}`);

            ef++;
          } else {
            uploadFile(Examfiles, `Mooccourses/${title}/chapters/Chapter${i + 1}/exams/exam${j + 1}`);
          }
        }
      }
    }
  }
  let courseIconFile = req.files.courseIcon;
  console.log(courseIconFile);
  if (courseIconFile) {
    let courseIconFile = req.files.courseIcon;
    var thoname = courseIconFile.name.split(".")[0];
    var uploadPath = `Mooccourses/${title}/LandingPage/${thoname}.jpeg`;

    sharp(courseIconFile.data)
      .resize(2048, 1352)
      .jpeg({ mozjpeg: true })
      .toBuffer((err, buff) => {
        uploadImageFile(buff, uploadPath);
      });
    // await uploadFile(courseIconFile, `Mooccourses/${title}/LandingPage`);
  }

  let coursePreviewFile = req.files.coursePreview;
  if (coursePreviewFile) {
    uploadFile(coursePreviewFile, `Mooccourses/${title}/LandingPage`);
  }

  const newLongMoocCourse = new LongMoocCourse({
    title,
    lead_headline,
    instructors: JSON.parse(instructors),
    courseIcon: `Mooccourses\\${title}\\LandingPage\\${thoname}.jpeg`,
    coursePreview: coursePreviewFile && `Mooccourses\\${title}\\LandingPage\\${coursePreviewFile.name}`,
    field,
    department,
    university,
    gradingCriteria,
    language,
    description,
    type,
    objectives: JSON.parse(objectives),
    announcement: JSON.parse(announcement),
    requirements: JSON.parse(requirements),
    chapters: newChpts,
    lastUpdated: new Date(),
    creator: JSON.parse(creator),
  });

  try {
    await newLongMoocCourse.save();
    res.status(200).json({
      success: "true",
      message: "Course uploaded",
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const editMoocCourse = async (req, res, next) => {
  const {
    title,
    id,
    lead_headline,
    instructors,
    courseIcon,
    coursePreview,
    field,
    type,
    department,
    university,
    gradingCriteria,
    language,
    objectives,
    description,
    requirements,
    chapters,
    creator,
    announcement,
  } = req.body;
  console.log(instructors);
  const prevVersion = await LongMoocCourse.findById(id);
  console.log(req.files);
  let k = 0;
  let ef = 0;
  let qf = 0;
  let af = 0;
  let files;
  let Examfiles;
  let Assignmentfiles;
  let Quizfiles;
  let newChpts = JSON.parse(chapters);
  //Modify lecture files locations on server
  if (req.files && req.files.courseFiles) {
    files = req.files.courseFiles;
    console.log(files);
    for (var i = 0; i < newChpts.length; i++) {
      for (var j = 0; j < newChpts[i].lectures.length; j++) {
        //modified to remove number of files
        var l = 0;
        for (l = 0; l < newChpts[i].lectures[j].lectureFiles.length; l++) {
          if (typeof newChpts[i].lectures[j].lectureFiles[l].fileLocation != "string") {
            if (_.isArray(files)) {
              newChpts[i].lectures[j].lectureFiles[l].fileLocation = `Mooccourses\\${title}\\chapters\\Chapter${i + 1}\\lecture${j + 1}\\${
                files[k].name
              }`;

              uploadFile(files[k], `Mooccourses/${title}/chapters/Chapter${i + 1}/lecture${j + 1}`);
              k++;
            } else {
              newChpts[i].lectures[j].lectureFiles[l].fileLocation = `Mooccourses\\${title}\\chapters\\Chapter${i + 1}\\lecture${j + 1}\\${
                files.name
              }`;

              uploadFile(files, `Mooccourses/${title}/chapters/Chapter${i + 1}/lecture${j + 1}`);
            }
          }
        }
      }
    }
  }
  //Modify Exam files
  if (req.files && req.files.examFiles) {
    Examfiles = req.files.examFiles;
    for (var i = 0; i < newChpts.length; i++) {
      //exams files
      for (var j = 0; j < newChpts[i].exam.length; j++) {
        for (var l = 0; newChpts[i].exam[j] && l < newChpts[i].exam[j].problems.length; l++) {
          if (newChpts[i].exam[j].problems[l].questionFile && typeof newChpts[i].exam[j].problems[l].questionFile != "string") {
            if (_.isArray(Examfiles)) {
              newChpts[i].exam[j].problems[l].questionFile = `Mooccourses\\${title}\\chapters\\Chapter${i + 1}\\exams\\exam${j}\\${
                Examfiles[ef].name
              }`;

              uploadFile(Examfiles[ef], `Mooccourses/${title}/chapters/Chapter${i + 1}/exams/exam${j + 1}`);

              ef++;
            } else {
              newChpts[i].exam[j].problems[l].questionFile = `Mooccourses\\${title}\\chapters\\Chapter${i + 1}\\exams\\exam${j + 1}\\${
                Examfiles.name
              }`;

              uploadFile(Examfiles, `Mooccourses/${title}/chapters/Chapter${i + 1}/exams/exam${j + 1}`);
            }
          }
        }
      }
    }
  }
  //Modify quiz files
  if (req.files && req.files.quizFiles) {
    Quizfiles = req.files.quizFiles;

    console.log(files);
    for (var i = 0; i < newChpts.length; i++) {
      for (var j = 0; j < newChpts[i].lectures.length; j++) {
        //modified to remove number of files
        var l = 0;
        for (l = 0; l < newChpts[i].lectures[j].quiz.length; l++) {
          for (var m = 0; m < newChpts[i].lectures[j].quiz[l].problems.length; m++) {
            if (newChpts[i].lectures[j].quiz[l].problems[m] && typeof newChpts[i].lectures[j].quiz[l].problems[m] != "string") {
              if (_.isArray(Quizfiles)) {
                newChpts[i].lectures[j].quiz[l].problems[m].questionFile = `Mooccourses\\${title}\\chapters\\Chapter${i + 1}\\lecture${
                  j + 1
                }\\quizes\\quiz${l + 1}\\${Quizfiles[qf].name}`;

                uploadFile(Quizfiles[qf], `Mooccourses/${title}/chapters/Chapter${i + 1}/lecture${j + 1}/quizes/quiz${l + 1}`);

                qf++;
              } else {
                newChpts[i].lectures[j].quiz[l].problems[m].questionFile = `Mooccourses\\${title}\\chapters\\Chapter${i + 1}\\lecture${
                  j + 1
                }\\quizes\\quiz${l + 1}\\${Quizfiles.name}`;

                uploadFile(Quizfiles, `Mooccourses/${title}/chapters/Chapter${i + 1}/lecture${j + 1}/quizes/quiz${l + 1}`);
              }
            }
          }
        }
      }
    }
  }

  //Modify assignment files
  if (req.files && req.files.assignmentFiles) {
    Assignmentfiles = req.files.assignmentFiles;
    console.log("hereee");
    console.log(Assignmentfiles);
    for (var i = 0; i < newChpts.length; i++) {
      for (var j = 0; j < newChpts[i].lectures.length; j++) {
        //modified to remove number of files
        var l = 0;
        for (l = 0; l < newChpts[i].lectures[j].assignment.length; l++) {
          for (var m = 0; m < newChpts[i].lectures[j].assignment[l].problems.length; m++) {
            if (newChpts[i].lectures[j].assignment[l].problems[m] && typeof newChpts[i].lectures[j].assignment[l].problems[m] != "string") {
              if (_.isArray(Assignmentfiles)) {
                newChpts[i].lectures[j].assignment[l].problems[m].questionFile = `Mooccourses\\${title}\\chapters\\Chapter${i + 1}\\lecture${
                  j + 1
                }\\assignments\\assignment${l + 1}\\${Assignmentfiles[af].name}`;
                uploadFile(Assignmentfiles[af], `Mooccourses/${title}/chapters/Chapter${i + 1}/lecture${j + 1}/assignments/assignment${l + 1}`);

                af++;
              } else {
                newChpts[i].lectures[j].assignment[l].problems[m].questionFile = `Mooccourses\\${title}\\chapters\\Chapter${i + 1}\\lecture${
                  j + 1
                }\\assignments\\assignment${l + 1}\\${Assignmentfiles.name}`;

                uploadFile(Assignmentfiles, `Mooccourses/${title}/chapters/Chapter${i + 1}/lecture${j + 1}/assignments/assignment${l + 1}`);
              }
            }
          }
        }
      }
    }
  }

  let courseIconLoc = "";
  if (prevVersion.courseIcon) courseIconLoc = prevVersion.courseIcon;
  if (req.files && req.files.courseIcon) {
    let courseIconFile = req.files.courseIcon;
    var thoname = courseIconFile.name.split(".")[0];
    var uploadPath = `Mooccourses/${title}/LandingPage/${thoname}.jpeg`;

    sharp(courseIconFile.data)
      .resize(2048, 1352)
      .jpeg({ mozjpeg: true })
      .toBuffer((err, buff) => {
        uploadImageFile(buff, uploadPath);
      });
    // uploadFile(courseIconFile, `Bwengelongcourses/${title}/LandingPage`);
    courseIconLoc = `Mooccourses\\${title}\\LandingPage\\$${thoname}.jpeg`;

    // uploadFile(courseIconFile, `Mooccourses/${title}/LandingPage`);
  }
  let coursePreviewloc = "";
  if (prevVersion.coursePreview) coursePreviewloc = prevVersion.coursePreview;
  if (req.files && req.files.coursePreview) {
    let coursePreviewFile = req.files.coursePreview;
    coursePreviewloc = `Mooccourses\\${title}\\LandingPage\\${coursePreviewFile.name}`;

    uploadFile(coursePreviewFile, `Mooccourses/${title}/LandingPage`);
  }

  const newUpdatedCourse = {
    title,
    lead_headline,
    instructors: JSON.parse(instructors),
    courseIcon: courseIconLoc,
    coursePreview: coursePreviewloc,
    field,
    type,
    department,
    university,
    gradingCriteria,
    language,
    objectives: JSON.parse(objectives),
    announcement: JSON.parse(announcement),
    requirements: JSON.parse(requirements),
    description,
    chapters: newChpts,
    lastUpdated: new Date(),
    creator: JSON.parse(creator),
  };
  try {
    const afterUpdate = await LongMoocCourse.findByIdAndUpdate(id, newUpdatedCourse, {
      runValidators: true,
    });
    res.status(200).json(afterUpdate);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getInstructorCourses = async (req, res, next) => {
  const { email } = req.params;

  console.log(email);
  try {
    const InstructorCourses = await LongMoocCourse.find({
      "creator.email": email,
    });
    console.log(InstructorCourses);
    res.status(200).json(InstructorCourses);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const addCourseDiscussion = async (req, res, next) => {
  const { title, courseId, topic, content, sender } = req.body;
  console.log({ title, courseId, topic, content, sender });
  try {
    const updatedDiscusions = await universitySpoc.findOneAndUpdate(
      { _id: courseId },
      {
        $push: {
          "discussionForum.courseDiscussion": {
            sender: sender,
            title: title,
            topic: topic,
            content: content,
            dateSent: new Date(),
          },
        },
      }
    );

    console.log(updatedDiscusions);

    res.status(200).json(updatedDiscusions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
