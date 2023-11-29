import Institution from "../models/institution.js";

export const InstitutionsResolvers = {
  Query: {
    getAllInstitutionsData: async () => {
      return await Institution.find();
    },
    getSingleInstistutionData: async (parent, { name }, context, info) => {
      return await Institution.findOne({ InstitutionName: name });
    },
  },
};
