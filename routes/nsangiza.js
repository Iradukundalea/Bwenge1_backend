import express from "express";
import { requestNsangiza } from "../controllers/nsangiza.js";

const router = express.Router();

router.post("/requestnsangiza", requestNsangiza);
export default router;
