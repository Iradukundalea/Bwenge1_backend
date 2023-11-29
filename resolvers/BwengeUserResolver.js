import _ from "lodash";
import User from "../models/user.js";

export const BwengeUserResolver = {
  Query: {
    getAllBwengeUsers: async () => {
      return await User.find();
    },
    getInstitutionStudents: async (parent, { name }, context, info) => {
      const students = await User.find({
        "institution.institutionRole": "Student",
        "institution.institutionName": name,
      });
      console.log(students);
      return students;
    },
    getInstitutionInstructors: async (parent, { name }, context, info) => {
      const instructors = await User.find({
        "institution.institutionRole": "Instructor",
        "institution.institutionName": name,
      });
      const Assistantinstructors = await User.find({
        "institution.institutionRole": "Assistant Instructor",
        "institution.institutionName": name,
      });
      const HeadofDeps = await User.find({
        "institution.institutionRole": "Head of Department",
        "institution.institutionName": name,
      });
      const res = _.union(instructors, Assistantinstructors, HeadofDeps);
      return res;
    },
    getInstitutionAdmins: async (parent, { name }, context, info) => {
      const Admins = await User.find({
        "institution.institutionRole": "admin",
        "institution.institutionName": name,
      });
      return Admins;
    },
    getUserInfo: async (parent, { id }, context, info) => {
      return await User.findById(id, { firstName: 1, lastName: 1, profilePicture: 1 });
    },
  },
};
