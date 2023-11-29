import UnivProjects from "../models/univProjects.js";

export const UnivProjectsResolvers = {
  Query: {
    getAllApprovedUnivprojects: async () => {
      return await UnivProjects.find({ onApproved: true });
    },
    getAllUnivProjects: async () => {
      return await UnivProjects.find();
    },
    getUnivProject: async (parent, { id }, context, info) => {
      return await UnivProjects.findById(id);
    },
  },
  Mutation: {
    approveUnivProject: async (parent, { id }, context, info) => {
      return await UnivProjects.findByIdAndUpdate(id, {
        onApproved: true,
      });
    },
    viewUnivProject: async (parent, { id, userId }, context, info) => {
      const viewed = await UnivProjects.findOne({
        _id: id,
        viewers: {
          $in: [userId],
        },
      });
      console.log(viewed);
      if (!viewed)
        return await UnivProjects.findByIdAndUpdate(id, {
          $push: {
            viewers: userId,
          },
        });
      else return viewed;
    },
    likeUnivProject: async (parent, { id, userId }, context, info) => {
      const liked = await UnivProjects.findOne({
        _id: id,
        likes: {
          $in: [userId],
        },
      });
      console.log(liked);
      if (!liked)
        return await UnivProjects.findByIdAndUpdate(id, {
          $push: {
            likes: userId,
          },
        });
      else
        return await UnivProjects.findByIdAndUpdate(id, {
          $pull: {
            likes: userId,
          },
        });
    },
    commentUnivProject: async (parent, { id, creator, parentId, message }, context, info) => {
      if (parentId) {
        var course = await UnivProjects.findById(id);

        var parentComment = course.comments.filter((item) => item._id == parentId);
        console.log(parentComment);
        var updatedCourse = await UnivProjects.findByIdAndUpdate(
          id,
          {
            $push: {
              comments: {
                message,
                creator,
                createdAt: new Date(),
                depth: parentComment[0].depth + 1,
                parentId,
                likes: [],
              },
            },
          },
          { new: true }
        );
        return updatedCourse;
      } else {
        return await UnivProjects.findByIdAndUpdate(
          id,
          {
            $push: {
              comments: {
                message,
                creator,
                createdAt: new Date(),
                likes: [],
              },
            },
          },
          { new: true }
        );
      }
    },
  },
};
