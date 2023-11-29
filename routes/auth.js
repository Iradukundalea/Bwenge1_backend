import express from "express";
const router = express.Router();
import {
  register,
  login,
  forgotpassword,
  resetpassword,
  addInstitutionUser,
  verifyUser,
  updateProfilePicture,
  follow,
  Requestverifyemail,
  verifyemail,
  sendUsersEmail,
} from "./../controllers/auth.js";

router.post("/register", register);
router.post("/login", login);
router.post("/forgotpassword", forgotpassword);
router.post("/requestemailverification", Requestverifyemail);
router.put("/verifyemail/:verifytoken", verifyemail);
router.post("/follow", follow);
router.patch("/updateprofilepic/:id", updateProfilePicture);
router.put("/resetpassword/:resetToken", resetpassword);
router.post("/addinstitutionuser", addInstitutionUser);
router.post("/verifyuser", verifyUser);
router.post("/sendemails", sendUsersEmail);

export default router;
