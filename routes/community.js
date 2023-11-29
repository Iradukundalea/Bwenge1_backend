import express from "express";

const router = express.Router();

import { createCommunity, createDailyContest, updateCommunityProfilePict } from "../controllers/community.js";
import { CreateQA } from "../controllers/QAsC.js";

router.post("/createcommunity", createCommunity);
router.post("/createqa", CreateQA);
router.patch("/updateprofilepic/:id", updateCommunityProfilePict);
router.post("/createdailycontest", createDailyContest);

export default router;
