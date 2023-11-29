import express from "express";

const router = express.Router();
import { createCourse, editcourse } from "./../controllers/coursesC.js";

// router.get('/courses', getCourses);
// router.get('/longcourses', getLongCourses);
router.post("/createcourse", createCourse);
// router.get('/course/:id', getCourse);
router.patch("/editcourse", editcourse);
// router.post('/searchcourse', searchCourse);
// router.delete('/deletecourse/:id', deleteCourse)

export default router;
