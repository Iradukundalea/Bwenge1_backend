import { gql } from "apollo-server-express";

export const dailyContestTypedefs = gql`
  scalar Date
  type DailyContestSchema {
    id: ID
    title: String
    dateCreated: Date
    communityConnected: String
    onApproved: Boolean
    description: String
    creator: creatorSchema
    lettreContests: [lettreContestSchema]
  }
  type creatorSchema {
    creatorId: String
    email: String
    firstName: String
    lastName: String
  }
  type lettreContestSchema {
    id: ID
    lettre: String
    shuffledText: String
    lettreContestDescription: String
    contestDate: Date
  }
  type Query {
    getApprovedCommunityDailyContests(communityId: ID): [DailyContestSchema]
    getAllCommunityDailyContests(communityId: ID): [DailyContestSchema]
    getSingleCommunityDailyContest(id: ID): DailyContestSchema
    getSingleCommunityDailyContestSingleDay(lettreContestId: ID): DailyContestSchema
  }
  type Mutation {
    approveContest(contestId: String): DailyContestSchema
  }
`;
