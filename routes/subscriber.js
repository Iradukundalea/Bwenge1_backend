import express from "express";
import { UserSubscribe } from "../controllers/subscribe.js";
const router = express.Router();

router.post("/subscribe", UserSubscribe);

export default router;
