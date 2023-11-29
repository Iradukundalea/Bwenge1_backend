import UserDailyContest from "../models/userDailyContest.js";

export const userSubmitDailyContest = async (req, res, next) => {
  const { userId, contestId } = req.params;
  const { attempts, score, secondsTaken, lettreContestId } = req.body;

  const existingContest = await UserDailyContest.findOne({
    contestId,
    userId,
  });
  if (existingContest) {
    try {
      await UserDailyContest.findOneAndUpdate(
        {
          userId,
          contestId,
        },
        {
          $push: {
            lettrecontestPackage: {
              attempts: JSON.parse(attempts),
              score,
              secondsTaken,
              lettreContestId,
              timeStamp: new Date(),
            },
          },
        }
      );
      res.status(200).json({ success: "true", message: "New User Daily Contest saved" });
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  } else {
    const newUserDailyContest = new UserDailyContest({
      userId,
      contestId,
      lettrecontestPackage: {
        attempts: JSON.parse(attempts),
        score,
        secondsTaken,
        lettreContestId,
        timeStamp: new Date(),
      },
    });
    try {
      await newUserDailyContest.save();
      res.status(200).json({ success: "true", message: "New User Daily Contest saved" });
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  }
};
