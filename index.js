import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import QuestionRoutes from "./routes/question.js";
import UserRoutes from "./routes/user.js";

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
dotenv.config();

let options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//routes
app.use("/api/v1/question", QuestionRoutes);
app.use("/api/v1/user", UserRoutes);

//database
mongoose.connect(process.env.MONGO_URL, options).then(() => {
  console.log("Database connected");
});

//server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server Connected on port ${process.env.PORT}`);
});
