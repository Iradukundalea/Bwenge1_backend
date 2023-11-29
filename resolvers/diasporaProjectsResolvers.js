import Paper from "../models/papers.js";

export const diasporaProjectsResolvers = {
  Query: {
    getAllApprovedprojects: async () => {
      return await Paper.find({ onApproved: true });
    },
    getAllProjects: async () => {
      return await Paper.find();
    },
    getProject: async (parent, { id }, context, info) => {
      return await Paper.findById(id);
    },
  },
  Mutation: {
    approveProject: async (parent, { id }, context, info) => {
      return await Paper.findByIdAndUpdate(id, {
        onApproved: true,
      });
    },
    viewProject: async (parent, { id, userId }, context, info) => {
      const viewed = await Paper.findOne({
        _id: id,
        viewers: {
          $in: [userId],
        },
      });
      console.log(viewed);
      if (!viewed)
        return await Paper.findByIdAndUpdate(id, {
          $push: {
            viewers: userId,
          },
        });
      else return viewed;
    },
    likeProject: async (parent, { id, userId }, context, info) => {
      const liked = await Paper.findOne({
        _id: id,
        likes: {
          $in: [userId],
        },
      });
      console.log(liked);
      if (!liked)
        return await Paper.findByIdAndUpdate(id, {
          $push: {
            likes: userId,
          },
        });
      else
        return await Paper.findByIdAndUpdate(id, {
          $pull: {
            likes: userId,
          },
        });
    },
    commentProject: async (parent, { id, creator, parentId, message }, context, info) => {
      if (parentId) {
        var course = await Paper.findById(id);

        var parentComment = course.comments.filter((item) => item._id == parentId);
        console.log(parentComment);
        var updatedCourse = await Paper.findByIdAndUpdate(
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
        return await Paper.findByIdAndUpdate(
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
