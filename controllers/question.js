import Question from "../models/question.js";
import User from "../models/user.js";
import Submissions from "../models/submissions.js";

export const createQuestion = async (req, res) => {
  try {
    const newQuestion = new Question(req.body);
    const savedQuestion = await newQuestion.save();
    res.status(200).json(savedQuestion);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findById(id);
    res.status(200).json(question);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const submitQuestion = async (req, res) => {
  try {
    const { questionId, code, userId } = req.body;
    const user = await User.findById(userId);
    const question = await Question.findById(questionId);
    var testCaseResults = [];

    //evaluating actual code
    const testCases = question.testcases;
    const actualFunctionRes = new Function(question.actualFunction);
    const actualFunctionRes1 = actualFunctionRes();
    for (let i = 0; i < testCases.length; i++) {
      testCaseResults[i] = actualFunctionRes1(
        testCases[i].array,
        testCases[i].target
      );
    }

    // evaluating user code
    var userTestCaseResults = [];
    const userFunctionRes = new Function(code);
    const userFunctionRes1 = userFunctionRes();
    for (let i = 0; i < testCases.length; i++) {
      userTestCaseResults[i] = userFunctionRes1(
        testCases[i].array,
        testCases[i].target
      );
    }

    //comparing user code and actual code
    let flag = -1;
    for (let i = 0; i < testCases.length; i++) {
      if (testCaseResults[i] !== userTestCaseResults[i]) {
        flag = i;
      }
    }
    if (flag !== -1) {
      await question.updateOne({
        $push: { attemptedBy: userId },
      });

      await user.updateOne({
        $push: {
          questionsAttempted: questionId,
        },
      });

      try {
        const newSubmission = new Submissions({
          userId: userId,
          questionId: questionId,
          submission: "Wrong Answer",
        });
        const savedSubmission = newSubmission.save();
      } catch (err) {
        res.status(500).json("Unable to save submission");
      }
      res.status(201).json({ userTestCaseResults, flag });
    } else {
      await question.updateOne({
        $push: { attemptedBy: userId },
      });
      await user.updateOne({
        $push: {
          questionsAttempted: questionId,
        },
      });
      try {
        const newSubmission = new Submissions({
          userId: userId,
          questionId: questionId,
          submission: "Accepted",
        });
        const savedSubmission = newSubmission.save();
      } catch (err) {
        res.status(500).json("Unable to save submission");
      }
      res.status(200).json("Accepted");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
