import express from "express";
import {
  createComment,
  createLike,
  createPost,
  deleteLike,
  deletePost,
  getComments,
  getLike,
  getPost,
  getRelatedPosts,
} from "../controllers/postController.js";

const postRouter = express.Router();

postRouter.get("/", getPost);
postRouter.post("/create-post", createPost);
postRouter.post("/delete-post", deletePost);
postRouter.post("/create-like", createLike);
postRouter.post("/delete-like", deleteLike);
postRouter.post("/create-comment", createComment);
postRouter.get("/get-comment", getComments);
postRouter.get("/get-related-posts", getRelatedPosts);
postRouter.get("/get-like", getLike);

export default postRouter;
