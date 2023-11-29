import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";


const InstitutionDepartmentSchema =mongoose.Schema({
  DepartmentName:{
    type:String,
    required:true
  },
  Majors:{
    type:[String],
    required:false
  }
})

const InstitutionSchema = mongoose.Schema({
  InstitutionName: {
    type: String,
    required: [true, "Please provide Institution name"],
  },
  InstitutionEmail: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    // Regexp to validate emails with more strict rules as added in tests/users.js which also conforms mostly with RFC2822 guide lines
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },
  InstitutionDepartments:{
    type:[InstitutionDepartmentSchema],
    required:false
  },
  InstitutionDescription: {
    type: String,
    required: false,
  },
  InstitutionIcon: {
    type: String,
    required: false,
  },

  enrolledDate: {
    type: String,
    required: [true, "please provide enrolled date"],
  },
});
InstitutionSchema.methods.matchPasswords = async function (
  password,
  crypedPass
) {
  return await bcrypt.compare(password, crypedPass);
};

const Institution = mongoose.model("Institution", InstitutionSchema);
export default Institution;
