import * as actionPostType from "./postActionType";

const setPost = (posts) => {
  return {
    type: actionPostType.SET_POST,
    payload: posts,
  };
};

const addPost = (post) => {
  return {
    type: actionPostType.ADD_POST,
    payload: post,
  };
};

const removePost = (postId) => {
  return {
    type: actionPostType.REMOVE_POST,
    payload: postId,
  };
};

export { setPost, addPost, removePost };
