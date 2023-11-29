import { gql } from "apollo-server-express";

export const userCourseTypedefs = gql`
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
    startingDate: Date
    endingDate: Date
    lastUpdated: Date
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
    questionFile: String
    fileRequired: Boolean
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
    userName: String
  }

  type UserCourseSchema {
    id: ID
    userId: String
    enrolledDate: Date
    courseId: String
    assignments: [UserAssignment]
    exams: [UserAssignment]
    quizes: [UserAssignment]
    content: [ContentSchema]
  }
  type UserAssignment {
    id: ID
    AssignmentId: String
    AssignmentTitle: String
    UserProblemsAnswers: [UserQuizPackage]
    Userscore: Float
    startTime: Date
    finishTime: Date
  }
  type ContentSchema {
    id: ID
    Filetitle: String
    lastCheckPoint: Float
    maxWatched: Float
    contentDuration: Float
    DateViewed: Date
  }
  type UserQuizPackage {
    id: ID
    problem: problemSchema
    Useranswer: String
    score: Float
  }
  type problemSchema {
    type: String
    questionQ: String
    answers: [String]
    correctAnswer: String
    score: Float
  }
  type userCourseRes {
    id: ID
    userId: String
    firstName: String
    lastName: String
    studentNumber: String
    email: String
    enrolledDate: Date
    courseId: String
    assignments: [UserAssignment]
    quizes: [UserAssignment]
    exams: [UserAssignment]
    content: [ContentSchema]
  }
  type studentsMarksRes {
    userId: String
    firstName: String
    lastName: String
    studentNumber: String
    marks: marksSchema
  }
  type marksSchema {
    quizesMarks: Float
    assignmentsMarks: Float
    examsMarks: Float
    contentViewMarks: Float
    discussionsParticipationsMarking: Float
  }
  type Query {
    getBWENGEUserCourses(userId: String): [LongBwengeCourse]
    getUserCourses(userId: String): [universitySpoc]
    getStudentCourses(userId: String, institutionName: String): [universitySpoc]
    getUserCourseData(userId: String, courseId: String): [UserCourseSchema]
    getUserCourseQuizResults(userId: String, courseId: String, AssignmentTitle: String): UserCourseSchema
    getInstructorAssignmentData(courseId: String, AssignmentTitle: String): [userCourseRes]
    getInstructorQuizData(courseId: String, AssignmentTitle: String): [userCourseRes]
    getInstructorExamData(courseId: String, AssignmentTitle: String): [userCourseRes]
    getUserCourseAssignmentResults(userId: String, courseId: String, AssignmentTitle: String): UserCourseSchema
    getUserCourseExamResults(userId: String, courseId: String, AssignmentTitle: String): UserCourseSchema
    getContentData(userId: String, courseId: String, title: String): UserCourseSchema
    getAllInstructorData(courseId: String): [userCourseRes]
    getBwengeLongCourseInstructorData(courseId: String): [userCourseRes]
  }
`;
