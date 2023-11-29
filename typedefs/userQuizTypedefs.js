import { gql } from "apollo-server-express";

export const userQuizTypedefs = gql`
  type problemSchema {
    type: String
    questionQ: String
    answers: [String]
    fileRequired: Boolean
    questionFile: String
    correctAnswer: String
    score: Float
  }
  type studentTeacherFilesSchema {
    fileloc: String
    sender: String
    timeSent: Date
  }
  type UserQuizPackage {
    id: ID
    problem: problemSchema
    Useranswer: String
    score: Float
    studentTeacherFiles: [studentTeacherFilesSchema]
  }
  type UserAssignment {
    id: ID
    AssignmentId: String
    AssignmentTitle: String
    UserProblemsAnswers: [UserQuizPackage]
  }
  type userQuizTime {
    id: ID
    userId: String
    courseId: String
    AssignmentId: String
    QuizDuration: Float
    StartTime: Float
    assignment: UserAssignment
  }
  type Query {
    getUserQuizData(userId: String, courseId: String, AssignmentId: String): userQuizTime
  }
`;
