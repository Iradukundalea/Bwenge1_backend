import { gql } from "apollo-server-express";
export const BwengeUserTypedefs = gql`
  scalar Date
  type UsersSchema {
    id: ID
    prefix: String
    firstName: String
    lastName: String
    phoneNumber: String
    gender: String
    birthDate: Date
    email: String
    institution: Institution
    profilePicture: String
    visitors: Float
  }

  type Institution {
    institutionName: String
    studentNumber: String
    department: String
    major: String
    enrolledYear: Float
    institutionRole: String
    verified: Boolean
  }
  type Query {
    getAllBwengeUsers: [UsersSchema]
    getInstitutionStudents(name: String): [UsersSchema]
    getUserInfo(id: ID): UsersSchema
    getInstitutionInstructors(name: String): [UsersSchema]
    getInstitutionAdmins(name: String): [UsersSchema]
  }
`;
