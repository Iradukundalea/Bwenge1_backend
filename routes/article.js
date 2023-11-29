import express from "express";
const router = express.Router();
import { createArticle, imageUploadLink, quizFileUploadLink } from "../controllers/ArticlesC.js";

router.post("/createarticle", createArticle);
router.get("/uploadurl", imageUploadLink);
router.get("/uploadquizfileurl/:type", quizFileUploadLink);

export default router;
