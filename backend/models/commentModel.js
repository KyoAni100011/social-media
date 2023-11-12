import mongoose from "mongoose";

const CommentModel = new mongoose.Schema(
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
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    commentParentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
  },
  { timestamps: true }
);

export const Comment = mongoose.model("Comment", CommentModel);
