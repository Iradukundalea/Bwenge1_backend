import { gql } from "apollo-server-express";

export const bwengecommunityTypedefs = gql`
  scalar Date
  type communitySchema {
    id: ID
    name: String
    date_created: Date
    profile_picture: String
    type: String
    field: String
    department: String
    description: String
    creator: creatorSchema
    membersCount: Float
    onApproved: Boolean
    communityAdmins: [creatorSchema]
  }
  type UsersSchema {
    id: ID
    prefix: String
    firstName: String
    lastName: String
    phoneNumber: String
    gender: String
    birthDate: Date
    email: String
    institution: Institution
    profilePicture: String
    communities: [communityUserSchema]
    visitors: Float
  }
  type communityUserSchema {
    communityId: String
    communityUserName: String
  }

  type creatorSchema {
    creatorId: String
    email: String
    firstName: String
    lastName: String
  }
  type Query {
    getAllCommunities: [communitySchema]
    getAllApprovedCommunities: [communitySchema]
    getSingleCommunity(id: ID): communitySchema
    getCommunityMembers(id: ID): [UsersSchema]
    getUserCommunities(userId: String): UsersSchema
  }
  type Mutation {
    approveCommunity(id: ID, userId: String, userName: String): communitySchema
    joinLeaveCommunity(id: ID, userId: String, userName: String): UsersSchema
  }
`;
