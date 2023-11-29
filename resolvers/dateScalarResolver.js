import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language/index.js";

export const resolverMap = {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.toISOString();
    },
  }),
};
