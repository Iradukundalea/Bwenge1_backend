import NsangizaRequest from "../models/nsangizaRequest.js";

export const nsangizaResolver = {
  Query: {
    getAllNsangiza: async () => {
      return await NsangizaRequest.find();
    },
    getNsangiza: async (parent, { id }, context, info) => {
      return await NsangizaRequest.findById(id);
    },
  },
  Mutation: {
    approveNsangiza: async (parent, { id }, context, info) => {
      return await NsangizaRequest.findByIdAndUpdate(id, {
        onApproved: true,
      });
    },
    updateApproveNsangiza: async (parent, { id, nsangizaRequestInput }, context, info) => {
      return await NsangizaRequest.findByIdAndUpdate(id, nsangizaRequestInput, { new: true });
    },
    bookingNsangiza: async (parent, { id, userId }, context, info) => {
      const booked = await NsangizaRequest.findOne({
        _id: id,
        bookings: {
          $in: [userId],
        },
      });
      if (!booked)
        return await NsangizaRequest.findByIdAndUpdate(id, {
          $push: {
            bookings: userId,
          },
        });
      else
        return await NsangizaRequest.findByIdAndUpdate(id, {
          $pull: {
            bookings: userId,
          },
        });
    },
    likeShortCourse: async (parent, { id, userId }, context, info) => {
      const liked = await NsangizaRequest.findOne({
        _id: id,
        likes: {
          $in: [userId],
        },
      });
      console.log(liked);
      if (!liked)
        return await NsangizaRequest.findByIdAndUpdate(id, {
          $push: {
            likes: userId,
          },
        });
      else
        return await ShortBwengecourse.findByIdAndUpdate(id, {
          $pull: {
            likes: userId,
          },
        });
    },
    commentNsangiza: async (parent, { id, creator, parentId, message }, context, info) => {
      if (parentId) {
        var course = await NsangizaRequest.findById(id);

        var parentComment = course.comments.filter((item) => item._id == parentId);
        console.log(parentComment);
        var updatedCourse = await NsangizaRequest.findByIdAndUpdate(
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
        return await NsangizaRequest.findByIdAndUpdate(
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
