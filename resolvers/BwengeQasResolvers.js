import QAs from "../models/QAs.js";

export const bwengeqasResolvers = {
  Query: {
    getCommunityQAs: async (parent, { id }, context, info) => {
      return await QAs.find({ communityConnected: id });
    },
    getSingleCommunityQAs: async (parent, { id }, context, info) => {
      return await QAs.findById(id);
    },
  },
  Mutation: {
    viewQAs: async (parent, { id, userId }, context, info) => {
      const viewed = await QAs.findOne({
        _id: id,
        viewers: {
          $elemMatch: {
            viewer: userId,
          },
        },
      });
      console.log(viewed);
      if (!viewed)
        return await QAs.findByIdAndUpdate(id, {
          $push: {
            viewers: {
              viewer: userId,
              dateviewed: new Date(),
            },
          },
        });
      else return viewed;
    },
    likeQAs: async (parent, { id, userId }, context, info) => {
      const liked = await QAs.findOne({
        _id: id,
        likes: {
          $elemMatch: {
            liker: userId,
          },
        },
      });
      console.log(liked);
      if (!liked)
        return await QAs.findByIdAndUpdate(id, {
          $push: {
            likes: {
              liker: userId,
              dateliked: new Date(),
            },
          },
        });
      else
        return await QAs.findByIdAndUpdate(id, {
          $pull: {
            likes: {
              liker: userId,
            },
          },
        });
    },
    commentQas: async (parent, { id, creator, parentId, message }, context, info) => {
      if (parentId) {
        var course = await QAs.findById(id);

        var parentComment = course.comments.filter((item) => item._id == parentId);
        console.log(parentComment);
        var updatedCourse = await QAs.findByIdAndUpdate(
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
        return await QAs.findByIdAndUpdate(
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
