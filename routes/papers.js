import express from "express";

import { getPapers, createPaper, getPaper, updatePaper, searchPaper, deletePaper, getAllPapers, createUnivPaper } from "../controllers/papersC.js";
const router = express.Router();

router.get("/papers", getPapers);
router.get("/allpapers", getAllPapers);
router.post("/createpaper", createPaper);
router.post("/createunivproject", createUnivPaper);
router.get("/paper/:id", getPaper);
router.patch("/editpaper/:id", updatePaper);
router.post("/searchpaper", searchPaper);
router.delete("/deletepaper/:id", deletePaper);

export default router;
