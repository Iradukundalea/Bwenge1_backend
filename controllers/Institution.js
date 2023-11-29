import Mongoose from "mongoose";
import Institution from "../models/institution.js";
import ErrorResponse from "../utils/errorResponse.js";
import excelToJson from "convert-excel-to-json";
import fs from "fs";
import xlsx from "xlsx";
import Excel from "exceljs";
import csvToJson from "csvtojson";
import bcrypt from "bcryptjs";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const AddInstitution = async (req, res, next) => {
  const { name, email } = req.body;
  console.log({ name, email });
  const newInstitution = new Institution({
    InstitutionName: name,
    InstitutionEmail: email,
    enrolledDate: new Date(),
  });

  try {
    await newInstitution.save();
    res.status(200).json({ success: "true", message: "Institution Enrolled" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const AddInstitutionAdmin = async (req, res, next) => {
  const { InstitutionName, firstName, lastName, email, password, phoneNumber } =
    req.body;
  //Password encryption
  let encryptPasword;
  const salt = await bcrypt.genSalt(10);
  encryptPasword = await bcrypt.hash(password, salt);
  try {
    const afterAddingInstitutionAdmin = await Institution.findOneAndUpdate(
      { InstitutionName },
      {
        $push: {
          InstitutionAdmin: {
            firstName,
            lastName,
            password: encryptPasword,
            phoneNumber,
            email,
            OnVerified: false,
          },
        },
      }
    );
    res.status(200).json({
      success: "true",
      message: "Institution admin added",
      admin: afterAddingInstitutionAdmin,
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const InstitutionAdminLogin = async (req, res, next) => {
  const { InstitutionName, email, password } = req.body;

  if (!email || !password) {
    return next(
      new ErrorResponse("Please provide an email and a password", 400)
    );
  }
  console.log("here here");
  try {
    const admin = await Institution.findOne(
      { InstitutionName, InstitutionAdmin: { $elemMatch: { email } } },
      { "InstitutionAdmin.$": 1 }
    ).select("+password");
    console.log(admin);

    if (!admin) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }
    const isMatch = await admin.matchPasswords(
      password,
      admin.InstitutionAdmin[0].password
    );

    if (!isMatch) {
      return next(new ErrorResponse("wrong password", 401));
    } else {
      res.status(200).json({
        success: "true",
        message: "Institution admin loged in",
      });
    }
    // remember to send toooooooooooooooooooooooooookeeeeeeeeeeeeeeeeeeeennnnnnnnn
    // sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const AddInstitutionInstructor = async (req, res, next) => {
  const {
    InstitutionName,
    firstName,
    lastName,
    password,
    phoneNumber,
    email,
    role,
  } = req.body;
  //Password encryption
  let encryptPasword;
  const salt = await bcrypt.genSalt(10);
  encryptPasword = await bcrypt.hash(password, salt);
  try {
    const afterAddingInstitutionInstructor = await Institution.findOneAndUpdate(
      { InstitutionName },
      {
        $push: {
          InstitutionInstructor: {
            firstName,
            lastName,
            password: encryptPasword,
            phoneNumber,
            email,
            role,
          },
        },
      }
    );
    res
      .status(200)
      .json({ success: "true", message: "Institution Instructor added" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const AddInstitutionStudent = async (req, res, next) => {
  console.log(req.files.selectedStudents);
  const selectedstuts = req.files.selectedStudents;

  let uploadPath =
    path.join(__dirname, "./../pdfs/").replace(/\\/g, "/") + selectedstuts.name;
  selectedstuts.mv(uploadPath, function (err) {
    if (err) console.log(err);
  });
  let uploadcsvPath =
    path.join(__dirname, "./../pdfs/").replace(/\\/g, "/") + "thecsv.csv";
  let uploadjsonPath =
    path.join(__dirname, "./../pdfs/").replace(/\\/g, "/") + "thejson.json";

  const xlsxRead = fs.createReadStream(uploadPath);
  const csvWrite = fs.createWriteStream(uploadcsvPath);
  const csvRead = () => fs.createReadStream(uploadcsvPath);
  const jsonWrite = fs.createWriteStream(uploadjsonPath);
  (async function process() {
    const workbook = new Excel.Workbook();
    await workbook.xlsx.read(xlsxRead);
    await workbook.csv.write(csvWrite, { sheetName: "Sheet1" });
    csvRead().pipe(csvToJson()).pipe(jsonWrite);
  })();
  console.log(jsonWrite);
  // const result = excelToJson({
  //   source: uploadPath, // fs.readFileSync return a Buffer
  //   header: {
  //     // Is the number of rows that will be skipped and will not be present at our result object. Counting from top to bottom
  //     rows: 1, // 2, 3, 4, etc.
  //   },
  // });
  // const stuts = xlsx.readFile(uploadPath);
  // console.log(stuts.SheetNames);
  // const thesheet = stuts.Sheets["Sheet1"];
  // console.log(thesheet);
  res.status(200).json(jsonWrite);
  // const result = xlsx.utils.sheet_add_json(thesheet, [
  //   "Brand",
  //   "Model",
  //   "RAM (GB)",
  //   "	Chipset",
  //   "Price",
  // ]);
  // console.log(result);

  // header: [
  //   "学号",
  //   "姓名",
  //   "班号",
  //   "学院",
  //   "课程号",
  //   "课程名",
  //   "学分",
  //   "日期",
  //   "时间",
  //   "考场",
  //   "考场编号",
  //   "备注",
  // ],
  // });
  // console.log(result);
  // const {
  //   InstitutionName,
  //   firstName,
  //   lastName,
  //   password,
  //   phoneNumber,
  //   studentNumber,
  //   department,
  //   major,
  //   email,
  //   enrolledYear,
  // } = req.body;
  // //Password encryption
  // let encryptPasword;
  // const salt = await bcrypt.genSalt(10);
  // encryptPasword = await bcrypt.hash(password, salt);
  // try {
  //   const afterAddingInstitutionStudent = await Institution.findOneAndUpdate(
  //     { InstitutionName },
  //     {
  //       $push: {
  //         InstitutionStudent: {
  //           firstName,
  //           lastName,
  //           department,
  //           major,
  //           studentNumber,
  //           password: encryptPasword,
  //           phoneNumber,
  //           email,
  //           enrolledYear,
  //         },
  //       },
  //     }
  //   );
  //   res
  //     .status(200)
  //     .json({ success: "true", message: "Institution student added" });
  // } catch (error) {
  //   res.status(409).json({ message: error.message });
  // }
};
