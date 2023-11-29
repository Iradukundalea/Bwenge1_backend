import { gql } from "apollo-server-express";

export const bwengeqasTypedefs = gql`
  scalar Date
  type QAsSchema {
    id: ID
    title: String
    questionridea: String
    field: String
    department: String
    tags: [String]
    onApproved: Boolean
    creator: creatorSchema
    viewers: [viewsSchema]
    likes: [likesSchema]
    comments: [CommentSchema]
    dateOfSubmission: Date
  }
  type likesSchema {
    liker: String
    dateliked: Date
  }
  type viewsSchema {
    viewer: String
    dateviewed: Date
  }
  type creatorSchema {
    creatorId: String
    email: String
    firstName: String
    lastName: String
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
  type Query {
    getCommunityQAs(id: ID): [QAsSchema]
    getSingleCommunityQAs(id: ID): QAsSchema
  }
  type Mutation {
    likeQAs(id: ID, userId: String): QAsSchema
    viewQAs(id: ID, userId: String): QAsSchema
    commentQas(id: ID, creator: creatorSchemaInput, parentId: String, message: String): QAsSchema
  }
`;
