import {
  changePassword,
  getUserDetails,
  getUserSubmissions,
  login,
  signup,
  verifyUser,
} from "../controllers/user.js";
import express from "express";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/get/all/:id", getUserDetails);
router.get("/get/all/submissions/:id/:questionId", getUserSubmissions);
router.post("/verify", verifyUser);
router.post("/forgot/password", changePassword);

export default router;
