import ShortBwengecourse from "../models/ShortBwengecourses.js";

export const BwengeshortcoursesResolvers = {
  Query: {
    getAllShortCourses: async () => {
      return await ShortBwengecourse.find();
    },
    getAllApprovedShortCourses: async () => {
      return await ShortBwengecourse.find({ onApproved: true });
    },
    getSingleShortCourse: async (parent, { id }, context, info) => {
      return await ShortBwengecourse.findById(id);
    },
    getInstructorShortCourses: async (parent, { email }, context, info) => {
      const results = await ShortBwengecourse.find({
        "creator.email": email,
      });
      return results;
    },
  },
  Mutation: {
    approveShortCourse: async (parent, { id }, context, info) => {
      return await ShortBwengecourse.findByIdAndUpdate(id, {
        onApproved: true,
      });
    },
    viewShortCourse: async (parent, { id, userId }, context, info) => {
      const viewed = await ShortBwengecourse.findOne({
        _id: id,
        viewers: {
          $elemMatch: {
            viewer: userId,
          },
        },
      });
      console.log(viewed);
      if (!viewed)
        return await ShortBwengecourse.findByIdAndUpdate(id, {
          $push: {
            viewers: {
              viewer: userId,
              dateviewed: new Date(),
            },
          },
        });
      else return viewed;
    },
    likeShortCourse: async (parent, { id, userId }, context, info) => {
      const liked = await ShortBwengecourse.findOne({
        _id: id,
        likes: {
          $elemMatch: {
            liker: userId,
          },
        },
      });
      console.log(liked);
      if (!liked)
        return await ShortBwengecourse.findByIdAndUpdate(id, {
          $push: {
            likes: {
              liker: userId,
              dateliked: new Date(),
            },
          },
        });
      else
        return await ShortBwengecourse.findByIdAndUpdate(id, {
          $pull: {
            likes: {
              liker: userId,
            },
          },
        });
    },
    commentCourse: async (parent, { id, creator, parentId, message }, context, info) => {
      if (parentId) {
        var course = await ShortBwengecourse.findById(id);

        var parentComment = course.comments.filter((item) => item._id == parentId);
        console.log(parentComment);
        var updatedCourse = await ShortBwengecourse.findByIdAndUpdate(
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
        return await ShortBwengecourse.findByIdAndUpdate(
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
