import express from "express";
import { endQuizUpdater, PoststartQuizInfo, UpdateBwengeUserQuizInfo, UpdateUserQuizInfo } from "../controllers/quizTime.js";

const router = express.Router();

router.post("/startquizinfo/:userId/:courseId", PoststartQuizInfo);
router.patch("/updateuserquizinfo/:userId/:courseId", UpdateUserQuizInfo);
router.patch("/updatebwengeuserquizinfo/:userId/:courseId", UpdateBwengeUserQuizInfo);
router.delete("/endquiztime/:userId/:courseId", endQuizUpdater);

export default router;
