import { gql } from "apollo-server-express";

export const bwengeNsangizaTypedefs = gql`
  scalar Date
  type NsangizaRequest {
    id: ID
    title: String
    briefIntroduction: String
    meetingTime: Date
    hostNames: String
    meetingTheme: String
    hostIntroduction: String
    hostContacts: String
    email: String
    likes: [String]
    bookings: [String]
    comments: [CommentSchema]
    hostLink: String
    attendeeLink: String
    onApproved: Boolean
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
  input NsangizaRequestInput {
    title: String
    briefIntroduction: String
    meetingTime: Date
    hostNames: String
    meetingTheme: String
    hostIntroduction: String
    hostContacts: String
    email: String
    hostLink: String
    attendeeLink: String
    onApproved: Boolean
  }
  type Query {
    getAllNsangiza: [NsangizaRequest]
    getNsangiza(id: ID): NsangizaRequest
  }
  type Mutation {
    approveNsangiza(id: ID): NsangizaRequest
    updateApproveNsangiza(id: ID, nsangizaRequestInput: NsangizaRequestInput): NsangizaRequest
    likeNsangiza(id: ID, userId: String): NsangizaRequest
    bookingNsangiza(id: ID, userId: String): NsangizaRequest
    commentNsangiza(id: ID, creator: creatorSchemaInput, parentId: String, message: String): NsangizaRequest
  }
`;
