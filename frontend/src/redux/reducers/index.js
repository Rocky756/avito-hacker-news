import { DOWNLOAD_POSTS, SWITCH_ON_HOME, DOWNLOAD_COMMENTS } from "../types";

export const reducer = (state, action) => {
  // console.log("reducer", action.payload);
  switch (action.type) {
    case DOWNLOAD_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case SWITCH_ON_HOME:
      return {
        ...state,
        onHome: action.payload,
      };
    case DOWNLOAD_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };
    default:
      return state;
  }
};
