import LongMoocCourse from "./models/universitylongcourses.js";

export const resolvers = {
    Query: {
        getAllMoocs: async () => {
            return await LongMoocCourse.find();
        },
        getMooc: async (parent, { id }, context, info) => {
            return await LongMoocCourse.findById(id);
        }
    }
}