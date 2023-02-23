import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModal from "../models/user.js";
import Submissions from "../models/submissions.js";

export const login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser)
      return res.json({ status: 404, message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.json({ status: 400, message: "Invalid credentials" });

    res.json({ status: 200, data: oldUser });
  } catch (err) {
    res.json({ status: 500, message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser)
      return res.json({ status: 400, message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const data = await UserModal.create({
      email,
      password: hashedPassword,
      name,
    });
    return res.json({ status: 201, data });
  } catch (error) {
    return res.json({ status: 500, message: "Something went wrong" });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await UserModal.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserSubmissions = async (req, res) => {
  try {
    const { id, questionId } = req.params;
    const submissions = await Submissions.find({
      $and: [
        {
          userId: id,
        },
        {
          questionId: questionId,
        },
      ],
    }).sort({
      createdAt: -1,
    });
    res.status(200).json(submissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const verifyUser = async (req, res) => {
  try {
    const { email } = req.body;
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser)
      return res.json({ status: 404, message: "User doesn't exist" });
    else return res.json(true);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { userId, password } = req.body;
    const user = await UserModal.findById(userId);

    if (!user) {
      const newHashedPassword = await bcrypt.hash(password, 12);
      const updatedUser = await UserModal.findByIdAndUpdate(userId, {
        password: newHashedPassword,
      });
      res.status(200).json("Password succesfully changed");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
