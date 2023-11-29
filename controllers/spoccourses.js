import LongMoocCourse from "../models/universitylongcourses.js";
import universitySpoc from "../models/universitySpoc.js";
import fs from "fs";
import _ from "lodash";
import { fileURLToPath } from "url";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { uploadFile } from "./../middleware/s3.js";

export const createSpoc = async (req, res, next) => {
  const { id } = req.params;
  const { spocTitle, startingDate, endingDate, instructors } = req.body;

  const mooccourse = await LongMoocCourse.findById(id);
  console.log(mooccourse);

  const newspoc = new universitySpoc({
    spocTitle,
    courseId: mooccourse._id,
    chapters: mooccourse.chapters,
    university: mooccourse.university,
    courseIcon: mooccourse.courseIcon,
    coursePreview: mooccourse.coursePreview,
    field: mooccourse.field,
    department: mooccourse.department,
    language: mooccourse.language,
    description: mooccourse.description,
    objectives: mooccourse.objectives,
    type: mooccourse.type,
    requirements: mooccourse.requirements,
    gradingCriteria: mooccourse.gradingCriteria,
    startingDate,
    endingDate,
    instructors: JSON.parse(instructors),
    markingSettings: {
      exams: 25,
      assignments: 25,
      quizes: 25,
      contentView: 12.5,
      discussionsParticipations: 12.5,
    },
    lastUpdated: new Date(),
  });
  try {
    await newspoc.save();
    res.status(200).json({
      success: "true",
      message: "spoc uploaded",
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const editSpoc = async (req, res, next) => {
  const {
    spocTitle,
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
    startingDate,
    endingDate,
    creator,
    announcement,
  } = req.body;
  var title = spocTitle;
  console.log(instructors);
  var dir = path.join(__dirname, "../Mooccourses");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  dir = path.join(__dirname, `../Mooccourses/${title}`);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  dir = path.join(__dirname, `../Mooccourses/${title}/chapters`);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  const prevVersion = await universitySpoc.findById(id);
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
      dir = path.join(__dirname, `../Mooccourses/${title}/chapters/Chapter${i + 1}`);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      for (var j = 0; j < newChpts[i].lectures.length; j++) {
        dir = path.join(__dirname, `../Mooccourses/${title}/chapters/Chapter${i + 1}/lecture${j + 1}`);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
        }
        //modified to remove number of files
        var l = 0;
        for (l = 0; l < newChpts[i].lectures[j].lectureFiles.length; l++) {
          if (typeof newChpts[i].lectures[j].lectureFiles[l].fileLocation != "string") {
            if (_.isArray(files)) {
              newChpts[i].lectures[j].lectureFiles[l].fileLocation = `Mooccourses\\${title}\\chapters\\Chapter${i + 1}\\lecture${j + 1}\\${
                files[k].name
              }`;
              let uploadPath =
                path.join(__dirname, `./../Mooccourses/${title}/chapters/Chapter${i + 1}/lecture${j + 1}/`).replace(/\\/g, "/") + files[k].name;
              files[k].mv(uploadPath, function (err) {
                if (err) console.log(err);
              });
              uploadFile(files[k], `Mooccourses/${title}/chapters/Chapter${i + 1}/lecture${j + 1}`);
              k++;
            } else {
              newChpts[i].lectures[j].lectureFiles[l].fileLocation = `Mooccourses\\${title}\\chapters\\Chapter${i + 1}\\lecture${j + 1}\\${
                files.name
              }`;
              let uploadPath =
                path.join(__dirname, `./../Mooccourses/${title}/chapters/Chapter${i + 1}/lecture${j + 1}/`).replace(/\\/g, "/") + files.name;
              files.mv(uploadPath, function (err) {
                if (err) console.log(err);
              });
              uploadFile(files, `Mooccourses/${title}/chapters/Chapter${i + 1}/lecture${j + 1}`);
            }
            // if (
            //   prevVersion.chapters[i].lectures &&
            //   prevVersion.chapters[i].lectures[j] &&
            //   prevVersion.chapters[i].lectures[j].lectureFiles &&
            //   prevVersion.chapters[i].lectures[j].lectureFiles[l]
            // ) {
            //   try {
            //     fs.unlinkSync(prevVersion.chapters[i].lectures[j].lectureFiles[l].fileLocation);
            //   } catch (error) {
            //     console.log("okk");
            //   }
            // }

            k++;
          }
          console.log(newChpts[i].lectures[j].lectureFiles[l]);
        }
        // for (
        //   ;
        //   prevVersion.chapters[i].lectures &&
        //   prevVersion.chapters[i].lectures[j] &&
        //   prevVersion.chapters[i].lectures[j].lectureFiles &&
        //   prevVersion.chapters[i].lectures[j].lectureFiles[l];
        //   l++
        // ) {
        //   try {
        //     fs.unlinkSync(prevVersion.chapters[i].lectures[j].lectureFiles[l].fileLocation);
        //   } catch (error) {
        //     console.log("okk");
        //   }
        // }
      }
    }
  }
  //Modify Exam files
  if (req.files && req.files.examFiles) {
    Examfiles = req.files.examFiles;
    for (var i = 0; i < newChpts.length; i++) {
      dir = path.join(__dirname, `../Mooccourses/${title}/chapters/Chapter${i + 1}/exams`);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      //exams files
      for (var j = 0; j < newChpts[i].exam.length; j++) {
        dir = path.join(__dirname, `../Mooccourses/${title}/chapters/Chapter${i + 1}/exams/exam${j + 1}`);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
        }
        for (var l = 0; newChpts[i].exam[j] && l < newChpts[i].exam[j].problems.length; l++) {
          if (newChpts[i].exam[j].problems[l].questionFile && typeof newChpts[i].exam[j].problems[l].questionFile != "string") {
            if (_.isArray(Examfiles)) {
              newChpts[i].exam[j].problems[l].questionFile = `Mooccourses\\${title}\\chapters\\Chapter${i + 1}\\exams\\exam${j}\\${
                Examfiles[ef].name
              }`;
              let uploadPath =
                path.join(__dirname, `./../Mooccourses/${title}/chapters/Chapter${i + 1}/exams/exam${j + 1}/`).replace(/\\/g, "/") +
                Examfiles[ef].name;
              Examfiles[ef].mv(uploadPath, function (err) {
                if (err) console.log(err);
              });
              uploadFile(Examfiles[ef], `Mooccourses/${title}/chapters/Chapter${i + 1}/exams/exam${j + 1}`);

              ef++;
            } else {
              newChpts[i].exam[j].problems[l].questionFile = `Mooccourses\\${title}\\chapters\\Chapter${i + 1}\\exams\\exam${j + 1}\\${
                Examfiles.name
              }`;
              let uploadPath =
                path.join(__dirname, `./../Mooccourses/${title}/chapters/Chapter${i + 1}/exams/exam${j + 1}/`).replace(/\\/g, "/") + Examfiles.name;
              console.log(uploadPath);
              Examfiles.mv(uploadPath, function (err) {
                if (err) console.log(err);
              });
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
      dir = path.join(__dirname, `../Mooccourses/${title}/chapters/Chapter${i + 1}`);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      for (var j = 0; j < newChpts[i].lectures.length; j++) {
        dir = path.join(__dirname, `../Mooccourses/${title}/chapters/Chapter${i + 1}/lecture${j + 1}`);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
        }
        dir = path.join(__dirname, `../Mooccourses/${title}/chapters/Chapter${i + 1}/lecture${j + 1}/quizes`);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
        }
        //modified to remove number of files
        var l = 0;
        for (l = 0; l < newChpts[i].lectures[j].quiz.length; l++) {
          dir = path.join(__dirname, `../Mooccourses/${title}/chapters/Chapter${i + 1}/lecture${j + 1}/quizes/quiz${l + 1}`);
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
          }
          for (var m = 0; m < newChpts[i].lectures[j].quiz[l].problems.length; m++) {
            if (newChpts[i].lectures[j].quiz[l].problems[m] && typeof newChpts[i].lectures[j].quiz[l].problems[m] != "string") {
              if (_.isArray(Quizfiles)) {
                newChpts[i].lectures[j].quiz[l].problems[m].questionFile = `Mooccourses\\${title}\\chapters\\Chapter${i + 1}\\lecture${
                  j + 1
                }\\quizes\\quiz${l + 1}\\${Quizfiles[qf].name}`;

                let uploadPath =
                  path
                    .join(__dirname, `./../Mooccourses/${title}/chapters/Chapter${i + 1}/lecture${j + 1}/quizes/quiz${l + 1}/`)
                    .replace(/\\/g, "/") + Quizfiles[qf].name;
                Quizfiles[qf].mv(uploadPath, function (err) {
                  if (err) console.log(err);
                });
                uploadFile(Quizfiles[qf], `Mooccourses/${title}/chapters/Chapter${i + 1}/lecture${j + 1}/quizes/quiz${l + 1}`);

                qf++;
              } else {
                newChpts[i].lectures[j].quiz[l].problems[m].questionFile = `Mooccourses\\${title}\\chapters\\Chapter${i + 1}\\lecture${
                  j + 1
                }\\quizes\\quiz${l + 1}\\${Quizfiles.name}`;

                let uploadPath =
                  path
                    .join(__dirname, `./../Mooccourses/${title}/chapters/Chapter${i + 1}/lecture${j + 1}/quizes/quiz${l + 1}/`)
                    .replace(/\\/g, "/") + Quizfiles.name;
                Quizfiles.mv(uploadPath, function (err) {
                  if (err) console.log(err);
                });
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
      dir = path.join(__dirname, `../Mooccourses/${title}/chapters/Chapter${i + 1}`);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      for (var j = 0; j < newChpts[i].lectures.length; j++) {
        dir = path.join(__dirname, `../Mooccourses/${title}/chapters/Chapter${i + 1}/lecture${j + 1}`);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
        }
        dir = path.join(__dirname, `../Mooccourses/${title}/chapters/Chapter${i + 1}/lecture${j + 1}/assignments`);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
        }
        //modified to remove number of files
        var l = 0;
        for (l = 0; l < newChpts[i].lectures[j].assignment.length; l++) {
          dir = path.join(__dirname, `../Mooccourses/${title}/chapters/Chapter${i + 1}/lecture${j + 1}/assignments/assignment${l + 1}`);
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
          }
          for (var m = 0; m < newChpts[i].lectures[j].assignment[l].problems.length; m++) {
            if (newChpts[i].lectures[j].assignment[l].problems[m] && typeof newChpts[i].lectures[j].assignment[l].problems[m] != "string") {
              if (_.isArray(Assignmentfiles)) {
                let uploadPath =
                  path
                    .join(__dirname, `./../Mooccourses/${title}/chapters/Chapter${i + 1}/lecture${j + 1}/assignments/assignment${l + 1}/`)
                    .replace(/\\/g, "/") + Assignmentfiles[af].name;
                Assignmentfiles[af].mv(uploadPath, function (err) {
                  if (err) console.log(err);
                });
                newChpts[i].lectures[j].assignment[l].problems[m].questionFile = `Mooccourses\\${title}\\chapters\\Chapter${i + 1}\\lecture${
                  j + 1
                }\\assignments\\assignment${l + 1}\\${Assignmentfiles[af].name}`;
                uploadFile(Assignmentfiles[af], `Mooccourses/${title}/chapters/Chapter${i + 1}/lecture${j + 1}/assignments/assignment${l + 1}`);

                af++;
              } else {
                newChpts[i].lectures[j].assignment[l].problems[m].questionFile = `Mooccourses\\${title}\\chapters\\Chapter${i + 1}\\lecture${
                  j + 1
                }\\assignments\\assignment${l + 1}\\${Assignmentfiles.name}`;
                let uploadPath =
                  path
                    .join(__dirname, `./../Mooccourses/${title}/chapters/Chapter${i + 1}/lecture${j + 1}/assignments/assignment${l + 1}/`)
                    .replace(/\\/g, "/") + Assignmentfiles.name;
                Assignmentfiles.mv(uploadPath, function (err) {
                  if (err) console.log(err);
                });
                uploadFile(Assignmentfiles, `Mooccourses/${title}/chapters/Chapter${i + 1}/lecture${j + 1}/assignments/assignment${l + 1}`);
              }
            }
          }
        }
      }
    }
  }

  dir = path.join(__dirname, `../Mooccourses/${title}/LandingPage`);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  let courseIconLoc = "";
  if (prevVersion.courseIcon) courseIconLoc = prevVersion.courseIcon;
  if (req.files && req.files.courseIcon) {
    let courseIconFile = req.files.courseIcon;
    courseIconLoc = `Mooccourses\\${title}\\LandingPage\\${courseIconFile.name}`;

    let uploadPath = path.join(__dirname, `./../Mooccourses/${title}/LandingPage/`).replace(/\\/g, "/") + courseIconFile.name;
    console.log(uploadPath);
    courseIconFile.mv(uploadPath, function (err) {
      if (err) console.log(err);
    });
    uploadFile(courseIconFile, `Mooccourses/${title}/LandingPage`);
  }
  let coursePreviewloc = "";
  if (prevVersion.coursePreview) coursePreviewloc = prevVersion.coursePreview;
  if (req.files && req.files.coursePreview) {
    let coursePreviewFile = req.files.coursePreview;
    coursePreviewloc = `Mooccourses\\${title}\\LandingPage\\${coursePreviewFile.name}`;

    let uploadPath = path.join(__dirname, `./../Mooccourses/${title}/LandingPage/`).replace(/\\/g, "/") + coursePreviewFile.name;
    coursePreviewFile.mv(uploadPath, function (err) {
      if (err) console.log(err);
    });
    uploadFile(coursePreviewFile, `Mooccourses/${title}/LandingPage`);
  }

  const newUpdatedCourse = {
    spocTitle,
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
    startingDate,
    endingDate,
    lastUpdated: new Date(),
  };
  try {
    const afterUpdate = await universitySpoc.findByIdAndUpdate(id, newUpdatedCourse, {
      runValidators: true,
    });
    res.status(200).json(afterUpdate);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
