import { gql } from "apollo-server-express";

export const UserDailyContestTypedefs = gql`
  scalar Date
  type UserDailyContestSchema {
    id: ID
    userId: String
    contestId: String
    lettrecontestPackage: [lettrecontestPackageContestSchema]
    participant: [UsersSchema]
  }
  type lettrecontestPackageContestSchema {
    id: ID
    lettreContestId: String
    secondsTaken: Float
    attempts: [String]
    score: Float
    timeStamp: Date
  }
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
    getAllusersDailyContest(contestId: String): [UserDailyContestSchema]
    getAllusersSingleDailyContest(contestId: String, singleContestId: String): [UserDailyContestSchema]
  }
`;
