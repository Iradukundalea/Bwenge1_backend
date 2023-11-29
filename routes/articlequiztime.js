import express from "express";
import { endQuizUpdater, PoststartQuizInfo, UpdateUserQuizInfo } from "../controllers/articlequiztime.js";

const router = express.Router();

router.post("/startquizinfo/:userId/:articleId", PoststartQuizInfo);
router.patch("/updateuserquizinfo/:userId/:articleId", UpdateUserQuizInfo);
router.delete("/endquiztime/:userId/:articleId", endQuizUpdater);

export default router;
