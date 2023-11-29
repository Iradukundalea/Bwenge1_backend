import { gql } from "apollo-server-express";
    //MOOC COURSE

export const typeDefs = gql`
  type LongMoocCourse {
    id: ID
    title: String
    instructors: [String]
    university: [String]
    announcement: [announcementSchema]
    discussionForum: [discussionForumSchema]
    courseIcon: String
    gradingCriteria: String
    field: String
    department: String
    type: String
    language: String
    objectives: [String]
    requirements: [String]
    description: String
    chapters: [chapterSchema]
    lastUpdated: String
    creator: creatorSchema
  }
  type QnAForumSchema {
    user: String
    question: String
  }
  type courseDiscussionSchema {
    user: String
    question: String
  }
  type discussionForumSchema {
    QnAForum: [QnAForumSchema]
    courseDiscussion: [courseDiscussionSchema]
  }
  type announcementSchema {
    title: String
    content: String
    announcementDate: String
  }
  type problemSchema {
    type: String
    questionQ: String
    answers: [String]
    correctAnswer: String
    score: Float
  }
  type assignmentSchema {
    title: String
    problems: [problemSchema]
    maximumScore: Float
    estimatedDuration: Float
    openTime: Boolean
    openTimeRange: [String]
    instructions: String
  }
  type lectureSchema {
    title: String
    lectureFiles: [LectureFileSchema]
    assignment: [assignmentSchema]
    id: ID
  }
  type LectureFileSchema {
    title: String
    fileLocation: String
    id: ID
  }
  type chapterSchema {
    title: String
    lectures: [lectureSchema]
    exam: [assignmentSchema]
    id: ID
  }
  type creatorSchema {
    email: String
    userName: String
  }
  type Query {
    getAllMoocs: [LongMoocCourse]
    getMooc(id: ID): LongMoocCourse
  }
`;
