import {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  submitQuestion,
} from "../controllers/question.js";
import express from "express";

const router = express.Router();

router.post("/create/new", createQuestion);
router.get("/get/all", getAllQuestions);
router.get("/get/:id", getQuestionById);
router.post("/submit", submitQuestion);

export default router;
