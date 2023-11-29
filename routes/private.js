import express from "express";
import { getPrivateData } from "../controllers/private.js";
const router = express.Router();

import { protect } from "../middleware/auth.js";

router.route("/").get(protect, getPrivateData)

export default router;