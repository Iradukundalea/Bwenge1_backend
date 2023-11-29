import { gql } from "apollo-server-express";
//MOOC COURSE

export const bwengelongcoursesTypedefs = gql`
  scalar Date
  type LongBwengeCourse {
    id: ID
    title: String
    instructors: [String]
    announcement: [announcementSchema]
    discussionForum: discussionForumSchema
    courseIcon: String
    coursePreview: String
    gradingCriteria: String
    studentsCount: Float
    field: String
    department: String
    type: String
    language: String
    objectives: [String]
    requirements: [String]
    description: String
    chapters: [chapterSchema]
    lastUpdated: Date
    price: Float
    onApproved: Boolean
    creator: creatorSchema
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
  type creatorSchema {
    creatorId: String
    email: String
    firstName: String
    lastName: String
  }
  type Query {
    getAllLongCourses: [LongBwengeCourse]
    getAllApprovedLongCourses: [LongBwengeCourse]
    getLongCourse(id: ID): LongBwengeCourse
    getAssignment(courseId: ID, assignmentId: ID): assignmentSchema
    getExam(courseId: ID, examId: ID): assignmentSchema
    getQuiz(courseId: ID, QuizId: ID): assignmentSchema
    getInstructorLongCourses(email: String): [LongBwengeCourse]
  }
  type Mutation {
    approveLongCourse(id: ID): LongBwengeCourse
  }
`;
