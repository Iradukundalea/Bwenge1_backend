import express from "express";
const router = express.Router();
import {
  AddInstitution,
  AddInstitutionAdmin,
  AddInstitutionInstructor,
  AddInstitutionStudent,
  InstitutionAdminLogin,
} from "./../controllers/Institution.js";

router.post("/enrollinstitution", AddInstitution);
router.post("/addinstitutionAdmin", AddInstitutionAdmin);
router.post("/addinstitutionInstructor", AddInstitutionInstructor);
router.post("/addinstitutionStudent", AddInstitutionStudent);
router.post("/institutionadminlogin", InstitutionAdminLogin);

export default router;
