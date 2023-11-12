import * as actionPostType from "../action/postActionType";

const initialState = {
  posts: [],
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionPostType.SET_POST:
      return {
        ...state,
        posts: [...state.posts, ...action.payload],
      };

    case actionPostType.ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };

    case actionPostType.REMOVE_POST:
      return {
        ...state,
        posts: state.posts.filter((item) => item._id !== action.payload),
      };

    default:
      return state;
  }
};

export { postReducer };
