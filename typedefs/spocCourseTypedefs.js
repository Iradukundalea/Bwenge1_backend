import { gql } from "apollo-server-express";

export const spocCourseTypedefs = gql`
  scalar Date
  type universitySpoc {
    id: ID
    courseId: String
    spocTitle: String
    instructors: [InstructorSchema]
    university: String
    announcement: [announcementSchema]
    discussionForum: discussionForumSchema
    courseIcon: String
    coursePreview: String
    gradingCriteria: String
    field: String
    department: String
    type: String
    language: String
    objectives: [String]
    requirements: [String]
    description: String
    chapters: [chapterSchema]
    markingSettings: markingSettingsSchema
    startingDate: Date
    endingDate: Date
    lastUpdated: Date
  }
  type markingSettingsSchema {
    quizes: Float
    exams: Float
    contentView: Float
    assignments: Float
    discussionsParticipations: Float
  }
  type InstructorSchema {
    InstructorId: String
    firstName: String
    lastName: String
  }
  type QnAForumSchema {
    user: String
    question: String
  }
  type courseDiscussionSchema {
    sender: String
    title: String
    topic: String
    content: String
    dateSent: Date
    comments: [commentsSchema]
  }
  type commentsSchema {
    sender: String
    content: String
    dateSent: Date
  }
  type discussionForumSchema {
    QnAForum: [QnAForumSchema]
    courseDiscussion: [courseDiscussionSchema]
  }
  type announcementSchema {
    title: String
    content: String
    announcementDate: Date
  }
  type problemSchema {
    type: String
    questionQ: String
    answers: [String]
    correctAnswer: String
    questionFile: String
    fileRequired: Boolean
    score: Float
  }
  type assignmentSchema {
    id: ID
    title: String
    problems: [problemSchema]
    maximumScore: Float
    estimatedDuration: Float
    openTime: Boolean
    openTimeRange: [String]
    instructions: String
    checkedRules: Boolean
  }
  type lectureSchema {
    title: String
    lectureFiles: [LectureFileSchema]
    assignment: [assignmentSchema]
    quiz: [assignmentSchema]
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
  type maximumMarks {
    quizesMarks: Float
    assignmentsMarks: Float
    examsMarks: Float
  }
  type Query {
    getAllSpocs(courseId: String, InstructorId: String): [universitySpoc]
    getSpoc(id: ID): universitySpoc
    getMaximumMarksforInstructor(id: ID): maximumMarks
  }
`;
