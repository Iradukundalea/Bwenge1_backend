import BwengeArticle from "../models/article.js";
import PollUser from "../models/polluser.js";
import _ from "lodash";

export const bwengearticlesResolvers = {
  Query: {
    getAllApprovedArticles: async () => {
      return await BwengeArticle.find({ onApproved: true });
    },
    getAllArticles: async () => {
      return await BwengeArticle.find({ communityConnected: null });
    },
    getSingleArticle: async (parent, { id }, context, info) => {
      var thoarticle = await BwengeArticle.findById(id);

      if (thoarticle.postArticleQuiz.length > 0) {
        for (let i = 0; i < thoarticle.postArticleQuiz.length; i++) {
          for (let j = 0; j < thoarticle.postArticleQuiz[i].problems.length; j++) {
            for (let k = 0; k < thoarticle.postArticleQuiz[i].problems[j].questions.length; k++) {
              thoarticle.postArticleQuiz[i].problems[j].questions[k].questionInstruction = Array(
                thoarticle.postArticleQuiz[i].problems[j].questions[k].correctAnswer.length
              ).fill("");
              for (let m = 0; m < thoarticle.postArticleQuiz[i].problems[j].questions[k].correctAnswer.length; m++) {
                var thoans = thoarticle.postArticleQuiz[i].problems[j].questions[k].correctAnswer[m];
                // console.log(thoans);

                console.log(thoarticle.postArticleQuiz[i].problems[j].questions[k].questionInstruction);
                console.log(thoans);
                for (let l = 0; l < thoans.length; l++) {
                  let code = thoans.charCodeAt(l) + 5;
                  thoarticle.postArticleQuiz[i].problems[j].questions[k].questionInstruction[m] += String.fromCharCode(code);
                  // thoans = [...thoans, (thoans[l] = String.fromCharCode(code))];
                  console.log(thoarticle.postArticleQuiz[i].problems[j].questions[k].questionInstruction[m]);
                }
                // thoarticle.postArticleQuiz[i].problems[j].questions[k].correctAnswer = thoans;
              }
            }
          }
        }
      }

      return thoarticle;
    },
    getWriterArticles: async (parent, { email }, context, info) => {
      return await BwengeArticle.find({
        "creator.email": email,
        onApproved: true,
      });
    },
    getCommunityArticles: async (parent, { communityId }, context, info) => {
      return await BwengeArticle.find({
        communityConnected: communityId,
      });
    },
  },
  Mutation: {
    approveArticle: async (parent, { id }, context, info) => {
      return await BwengeArticle.findByIdAndUpdate(id, {
        onApproved: true,
      });
    },
    judgeArticle: async (parent, { id, marks }, context, info) => {
      return await BwengeArticle.findByIdAndUpdate(id, {
        bwenge_score: marks,
      });
    },
    viewArticle: async (parent, { id, userId }, context, info) => {
      const viewed = await BwengeArticle.findOne({
        _id: id,
        viewers: {
          $elemMatch: {
            viewer: userId,
          },
        },
      });
      console.log(viewed);
      if (!viewed)
        return await BwengeArticle.findByIdAndUpdate(id, {
          $push: {
            viewers: {
              viewer: userId,
              dateviewed: new Date(),
            },
          },
        });
      else return viewed;
    },
    likeArticle: async (parent, { id, userId }, context, info) => {
      const liked = await BwengeArticle.findOne({
        _id: id,
        likes: {
          $elemMatch: {
            liker: userId,
          },
        },
      });
      console.log(liked);
      if (!liked)
        return await BwengeArticle.findByIdAndUpdate(id, {
          $push: {
            likes: {
              liker: userId,
              dateliked: new Date(),
            },
          },
        });
      else
        return await BwengeArticle.findByIdAndUpdate(id, {
          $pull: {
            likes: {
              liker: userId,
            },
          },
        });
    },
    commentArticle: async (parent, { id, creator, parentId, message }, context, info) => {
      if (parentId) {
        var course = await BwengeArticle.findById(id);

        var parentComment = course.comments.filter((item) => item._id == parentId);
        console.log(parentComment);
        var updatedCourse = await BwengeArticle.findByIdAndUpdate(
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
        return await BwengeArticle.findByIdAndUpdate(
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
    editArticle: async (parent, { id, articleStuff }, context, info) => {
      return await BwengeArticle.findByIdAndUpdate(id, {
        article: articleStuff,
      });
    },
    userPoll: async (parent, { userpoll }, context, info) => {
      const alreadyVoted = await PollUser.findOne({
        userId: userpoll.userId,
        pollId: userpoll.pollId,
      });
      if (!alreadyVoted) {
        var newpoll = new PollUser(userpoll);
        await newpoll.save();
      }
      return await PollUser.find({ pollId: userpoll.pollId });
    },
  },
};
