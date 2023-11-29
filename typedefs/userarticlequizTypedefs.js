import { gql } from "apollo-server-express";

export const userarticlequizTypedefs = gql`
  type problemSchema {
    type: String
    questionQ: String
    answers: [String]
    fileRequired: Boolean
    questionFile: String
    score: Float
  }

  type UserQuizPackage {
    id: ID
    problem: problemSchema
    Useranswer: String
    score: Float
  }
  type UserProblemsSchema {
    problemInstruction: String
    problemFile: String
    questions: [UserQuizPackage]
  }
  type UserAssignment {
    id: ID
    AssignmentId: String
    AssignmentTitle: String
    userProblemsAnswers: [UserProblemsSchema]
  }
  type userQuizTime {
    id: ID
    userId: String
    articleId: String
    AssignmentId: String
    QuizDuration: Float
    StartTime: Float
    assignment: UserAssignment
  }
  type Query {
    getUserArticleQuizData(userId: String, articleId: String, AssignmentId: String): userQuizTime
  }
`;
