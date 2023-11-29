import express from "express";
import { createMoocCourse, getAllMoocCourses, getInstructorCourses, editMoocCourse, addCourseDiscussion } from "../controllers/mooccourses.js";
const router = express.Router();

router.post("/createcourse", createMoocCourse);
router.get("/mooccourses", getAllMoocCourses);
router.patch("/editmooc", editMoocCourse);
router.get("/getinstructorcourse/:email", getInstructorCourses);
router.patch("/postdiscussion", addCourseDiscussion);

export default router;
