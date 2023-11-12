import mongoose from "mongoose";

const PostModel = new mongoose.Schema(
  {
    content: {
      type: String,
    },
    image: {
      url: { type: String },
      public_id: { type: String },
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    number_like: {
      type: Number,
      default: 0,
    },
    number_comment: {
      type: Number,
      default: 0,
    },
    number_share: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", PostModel);
