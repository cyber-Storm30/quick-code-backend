import mongoose from "mongoose";

const submissionsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    questionId: {
      type: String,
      required: true,
    },
    submission: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Submissions", submissionsSchema);
