import { gql } from "apollo-server-express";

export const universityProjectsTypedefs = gql`
  scalar Date
  type univProjects {
    id: ID
    title: String
    authors: [String]
    submissionDate: Date
    field: String
    abstract: String
    keywords: [String]
    selectedFile: String
    level: String
    likeCount: Float
    contacts: String
    university: String
    onApproved: Boolean
    comments: [CommentSchema]
    creator: creatorSchema
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
    getAllApprovedUnivprojects: [univProjects]
    getAllUnivProjects: [univProjects]
    getUnivProject(id: ID): univProjects
  }
  type Mutation {
    approveUnivProject(id: ID): univProjects
    likeUnivProject(id: ID, userId: String): univProjects
    viewUnivProject(id: ID, userId: String): univProjects
    commentUnivProject(id: ID, creator: creatorSchemaInput, parentId: String, message: String): univProjects
  }
`;
