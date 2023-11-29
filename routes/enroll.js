import express from "express";
const router = express.Router();
import {
  enrollUser,
  getUserCourses,
  postUserAssignmentResult,
  postUserQuizResult,
  postUserExamResult,
  postBwengeUserAssignmentResult,
  postBwengeUserQuizResult,
  postBwengeUserExamResult,
  getCourseStudents,
  getInstructorAssignmentData,
  updateQuizScore,
  updateAssignmentScore,
  updateUserContentView,
  enrollStudent,
  updateExamScore,
} from "../controllers/UserCourse.js";

router.post("/enrolluser", enrollUser);
router.post("/enrollstudent/:courseId", enrollStudent);
router.get("/getmycourses/:userId", getUserCourses);
router.patch("/postassignmentresult/:userId/:courseId", postUserAssignmentResult);
router.patch("/postquizresult/:userId/:courseId", postUserQuizResult);
router.patch("/postexamresult/:userId/:courseId", postUserExamResult);
router.patch("/postbwengeassignmentresult/:userId/:courseId", postBwengeUserAssignmentResult);
router.patch("/postbwengequizresult/:userId/:courseId", postBwengeUserQuizResult);
router.patch("/postbwengeexamresult/:userId/:courseId", postBwengeUserExamResult);
router.get("/getcoursestudents/:courseId", getCourseStudents);
router.get("/getinstructorassignmentsdata/:courseId/:AssignmentId", getInstructorAssignmentData);
router.patch("/updatequizScore/:userId/:courseId/:AssignmentName", updateQuizScore);
router.patch("/updateassignmentScore/:userId/:courseId/:AssignmentName", updateAssignmentScore);
router.patch("/updatexamscore/:userId/:courseId/:ExamName", updateExamScore);
router.post("/updateusercontentview/:userId/:courseId", updateUserContentView);

export default router;
