import express from "express";
import { InsertService, getServices, setChecked, setDone } from "../controllers/Service.js";
const router = express.Router();

router.post('/insertservice', InsertService);
router.get('/getservices', getServices);
router.patch('/setservicechecked/:id', setChecked);
router.patch('/setservicedone/:id', setDone);

export default router;