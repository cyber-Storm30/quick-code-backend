import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 3,
    },
    image: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    questionsAttempted: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        default: null,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
