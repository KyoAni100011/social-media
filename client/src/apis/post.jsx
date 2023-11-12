import { instance } from "./config";
import { uploadImage } from "../apis/image";

const getPost = async (skip, limit) => {
  try {
    const response = await instance.get("/post", {
      params: {
        skip: skip,
        limit: limit,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

const getRelatedPosts = async (userId) => {
  try {
    const response = await instance.get("/post/get-related-posts", {
      params: { userId: userId },
    });
    return response;
  } catch (error) {
    return error;
  }
};

const createPost = async ({ post }) => {
  try {
    if (post.image) {
      const data = new FormData();
      data.append("file", post.image);
      const reponse = await uploadImage(data);
      post.image = reponse.data.image;
    }
    const response = await instance.post("/post/create-post", post);
    return response;
  } catch (error) {
    throw error;
  }
};

const deletePost = async (data) => {
  try {
    const reponse = await instance.post("/post/delete-post", data);
  } catch (error) {
    return error;
  }
};

const getLike = async (data) => {
  try {
    const reponse = await instance.get("/post/get-like", {
      params: data,
    });
    return reponse;
  } catch (error) {
    return error;
  }
};

const createLike = async (data) => {
  try {
    const respone = await instance.post("/post/create-like", data);
    return respone;
  } catch (error) {
    return error;
  }
};

const deleteLike = async (data) => {
  try {
    const respone = await instance.post("/post/delete-like", data);
  } catch (error) {}
};

const createComment = async (data) => {
  try {
    const respone = await instance.post("/post/create-comment", data);
    return respone;
  } catch (error) {
    return error;
  }
};

const getComments = async (data) => {
  try {
    const reponse = await instance.get("/post/get-comment", {
      params: data,
    });
    return reponse;
  } catch (error) {
    return error;
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
