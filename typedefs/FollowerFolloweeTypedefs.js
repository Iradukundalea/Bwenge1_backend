import { gql } from "apollo-server-express";

export const FollowerFolloweeTypedefs = gql`
  type FollowerFolloweeSchema {
    follower: userInfoSchema
    followee: userInfoSchema
  }
  type userInfoSchema {
    userId: String
    firstName: String
    lastName: String
  }
  input userInfoInput {
    userId: String
    firstName: String
    lastName: String
  }
  input FollowerFolloweeInput {
    follower: userInfoInput
    followee: userInfoInput
  }
  type Query {
    getAllFollowees(id: String): [FollowerFolloweeSchema]
    getAllFollowers(id: String): [FollowerFolloweeSchema]
  }

  type Mutation {
    followed(followerFolloweeInput: FollowerFolloweeInput): FollowerFolloweeSchema
    unfollowed(followerFolloweeInput: FollowerFolloweeInput): FollowerFolloweeSchema
  }
`;
