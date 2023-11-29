import { gql } from "apollo-server-express";
//MOOC COURSE

export const BwengeshortcoursesTypedefs = gql`
  scalar Date
  type ShortBwengecourse {
    id: ID
    title: String
    instructor: String
    courseIcon: String
    field: String
    department: String
    type: String
    description: String
    selectedFile: String
    viewers: [viewsSchema]
    likes: [likesSchema]
    comments: [CommentSchema]
    onApproved: Boolean
    creator: creatorSchema
    submissionDate: Date
  }
  type likesSchema {
    liker: String
    dateliked: Date
  }
  type viewsSchema {
    viewer: String
    dateviewed: Date
  }
  type CommentSchema {
    id: ID
    message: String
    parentId: String
    creator: creatorSchema
    createdAt: Date
    depth: Float
    likes: [String]
  }

  type creatorSchema {
    creatorId: String
    email: String
    firstName: String
    lastName: String
  }
  input creatorSchemaInput {
    creatorId: String
    email: String
    firstName: String
    lastName: String
  }
  type Query {
    getAllShortCourses: [ShortBwengecourse]
    getAllApprovedShortCourses: [ShortBwengecourse]
    getSingleShortCourse(id: ID): ShortBwengecourse
    getInstructorShortCourses(email: String): [ShortBwengecourse]
  }
  type Mutation {
    approveShortCourse(id: ID): ShortBwengecourse
    likeShortCourse(id: ID, userId: String): ShortBwengecourse
    viewShortCourse(id: ID, userId: String): ShortBwengecourse
    commentCourse(id: ID, creator: creatorSchemaInput, parentId: String, message: String): ShortBwengecourse
  }
`;
