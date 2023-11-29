import { gql } from "apollo-server-express";

export const bwengearticlesTypedefs = gql`
  scalar Date
  type articleSchema {
    id: ID
    title: String
    article: String
    field: String
    department: String
    tags: [String]
    onApproved: Boolean
    creator: creatorSchema
    communityConnected: String
    viewers: [viewsSchema]
    bwenge_score: Float
    likes: [likesSchema]
    comments: [CommentSchema]
    dateOfSubmission: Date
    polls: [PollsSchema]
    userPolls: [PollUserSchema]
    postArticleQuiz: [assignmentSchema]
  }
  type questionSchema {
    type: String
    questionQ: String
    answers: [String]
    correctAnswer: [String]
    questionInstruction: [String]
    questionFile: String
    score: Float
  }
  type problemSchema {
    problemInstruction: String
    problemFile: String
    questions: [questionSchema]
  }
  type assignmentSchema {
    id: ID
    title: String
    problems: [problemSchema]
    maximumScore: Float
    estimatedDuration: Float
    instructions: String
    checkedRules: Boolean
  }
  type PollsSchema {
    id: ID
    topic: String
    options: [String]
  }
  type PollUserSchema {
    userId: String
    pollId: String
    option: String
  }
  input PollUserInput {
    userId: String
    pollId: String
    option: String
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
    getAllArticles: [articleSchema]
    getAllApprovedArticles: [articleSchema]
    getWriterArticles(email: String): [articleSchema]
    getSingleArticle(id: ID): articleSchema
    getCommunityArticles(communityId: String): [articleSchema]
  }
  type Mutation {
    approveArticle(id: ID): articleSchema
    userPoll(userpoll: PollUserInput): [PollUserSchema]
    judgeArticle(id: ID, marks: Int): articleSchema
    editArticle(id: ID, articleStuff: String): articleSchema
    likeArticle(id: ID, userId: String): articleSchema
    viewArticle(id: ID, userId: String): articleSchema
    commentArticle(id: ID, creator: creatorSchemaInput, parentId: String, message: String): articleSchema
  }
`;
