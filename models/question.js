import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
    },
    desc: {
      type: String,
      required: true,
    },
    examples: {
      type: [
        {
          name: {
            type: String,
          },
          exampleTexts: [String],
        },
      ],
    },
    note: {
      type: String,
    },
    testcases: {
      type: [{}],
    },
    functionPrototype: {
      type: String,
    },
    actualFunction: {
      type: String,
    },
    attemptedBy: {
      type: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Question", questionSchema);
