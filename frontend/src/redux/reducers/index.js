import { DOWNLOAD_POSTS } from "../types";

export const reducer = (state, action) => {
  switch (action.type) {
    case DOWNLOAD_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    default:
      return state;
  }
};
