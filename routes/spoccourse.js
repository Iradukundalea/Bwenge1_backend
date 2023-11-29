import express from "express";
import { createSpoc, editSpoc } from "../controllers/spoccourses.js";
const router = express.Router();

router.post("/createspoc/:id", createSpoc);
router.patch("/editspoc", editSpoc);

export default router;
