import { gql } from "apollo-server-express";

export const diasporaProjectsTypedefs = gql`
  scalar Date
  type paper {
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
    country: String
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
    getAllApprovedprojects: [paper]
    getAllProjects: [paper]
    getProject(id: ID): paper
  }
  type Mutation {
    approveProject(id: ID): paper
    likeProject(id: ID, userId: String): paper
    viewProject(id: ID, userId: String): paper
    commentProject(id: ID, creator: creatorSchemaInput, parentId: String, message: String): paper
  }
`;
