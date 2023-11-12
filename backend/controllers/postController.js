import { Like } from "../models/likeModel.js";
import { Post } from "../models/postModel.js";
import { Comment } from "../models/commentModel.js";
import pusher from "../pusher/config.js";
import { deleteImage } from "../utils/image.js";

const getPost = async (req, res) => {
  try {
    const limitValue = req.query.limit || 3;
    const skipValue = req.query.skip || 0;
    const posts = await Post.find()
      .populate("userId", "_id email username dateOfBirth")
      .limit(limitValue)
      .skip(skipValue);
    res.status(200).json({ message: "OK", data: posts });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const getRelatedPosts = async (req, res) => {
  try {
    const { userId } = req.query;
    const posts = await Post.find({ userId: userId }).populate(
      "userId",
      "_id email username dateOfBirth"
    );
    res.status(200).json({ message: "OK", data: posts });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const createPost = async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    const populatedPost = await savedPost.populate(
      "userId",
      "_id email username dateOfBirth"
    );

    res.status(200).json({ message: "OK", populatedPost });
    pusher.trigger("create-post", "send-notification-new-post", {
      message: `${newPost.userId.username} has posted a new post`,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { public_id, id } = req.body;
    if (public_id) await deleteImage(public_id);
    await Post.findOneAndDelete({ _id: id })
      .then(() => res.status(200).json({ message: "OK" }))
      .catch((error) => res.status(400).json({ message: error }));
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const getLike = async (req, res) => {
  try {
    const { postId, userId } = req.query;
    const like = await Like.findOne(
      { postId: postId, userId: userId },
      "_id userId postId"
    );
    res.status(200).json({ message: "OK", data: like });
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

const createLike = async (req, res) => {
  try {
    const newLike = new Like(req.body);
    await newLike.save();

    res.status(200).json({ message: "OK", data: newLike });
    pusher.trigger("my-channel", "my-event", {
      message: "New post",
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const deleteLike = async (req, res) => {
  try {
    const { id } = req.body;
    await Like.findOneAndDelete({ _id: id });
    res.status(200).json({ message: "OK" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const createComment = async (req, res) => {
  try {
    const newCmt = new Comment(req.body);
    await newCmt.save();
    const cmt = await Comment.findById(newCmt._id).populate(
      "userId",
      "_id email username dateOfBirth"
    );

    res.status(200).json({ message: "OK", data: cmt });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const getComments = async (req, res) => {
  try {
    const { commentParentId, postId } = req.query;
    const comments = await Comment.find({
      commentParentId: commentParentId,
      postId: postId,
    }).populate("userId", "_id email username dateOfBirth");
    res.status(200).json({ message: "OK", data: comments });
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

export {
  getPost,
  createPost,
  deletePost,
  createLike,
  deleteLike,
  getLike,
  createComment,
  getComments,
  getRelatedPosts,
};
