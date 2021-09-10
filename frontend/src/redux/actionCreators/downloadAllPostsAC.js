import { DOWNLOAD_POSTS } from "../types";

export const downloadAllPostsFetch = async () => {
  const response = await fetch("/posts/");
  const result = await response.json();
  // console.log(result);
  return result;
};

export const downloadAllPostsAC = () => async (dispatch) => {
  const { posts } = await downloadAllPostsFetch();
  dispatch({
    type: DOWNLOAD_POSTS,
    payload: posts,
  });
};


