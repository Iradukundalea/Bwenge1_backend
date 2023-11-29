import { gql } from "apollo-server-express";

export const institutionTypeDefs = gql`
  scalar Date
  type institution {
    id: ID
    InstitutionName: String
    InstitutionEmail: String
    enrolledDate: String
  }
  type Query {
    getAllInstitutionsData: [institution]
    getSingleInstistutionData(name: String): institution
  }
`;
