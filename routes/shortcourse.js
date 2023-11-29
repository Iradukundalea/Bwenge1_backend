import express from "express";
const router = express.Router();

import { createShortCourse, createShortVideoCourse } from "../controllers/shortbwengecourses.js";

router.post("/createshortcourse", createShortCourse);
router.post("/createshortvideocourse", createShortVideoCourse);

export default router;
