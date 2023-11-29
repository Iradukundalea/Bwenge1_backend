import { gql } from "apollo-server-express";
//MOOC COURSE

export const moocCourseTypedefs = gql`
  scalar Date
  type LongMoocCourse {
    id: ID
    title: String
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
    lastUpdated: Date
    creator: creatorSchema
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
  type creatorSchema {
    email: String
    firstName: String
    lastName: String
  }
  type Query {
    getAllMoocs: [LongMoocCourse]
    getMooc(id: ID): LongMoocCourse
    getInstitutionMoocs(name: String): [LongMoocCourse]
    getMoocAssignment(courseId: ID, assignmentId: ID): assignmentSchema
    getMoocExam(courseId: ID, examId: ID): assignmentSchema
    getMoocQuiz(courseId: ID, QuizId: ID): assignmentSchema
    getInstitutionInstructorMoocs(name: String, instructorId: String): [LongMoocCourse]
  }
`;
