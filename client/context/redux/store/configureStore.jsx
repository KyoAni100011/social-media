import { createStore, combineReducers } from "redux";
import { postReducer } from "../reducer/postReducer";

const rootReducer = combineReducers({
  post: postReducer,
});

const configureStore = () => createStore(rootReducer);

export { configureStore };
