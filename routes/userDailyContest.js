import express from "express";
import { userSubmitDailyContest } from "../controllers/userDailyContest.js";
const router = express.Router();

router.post("/userpostdailycontest/:userId/:contestId", userSubmitDailyContest);

export default router;
