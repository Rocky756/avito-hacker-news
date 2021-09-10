import { DOWNLOAD_COMMENTS } from "../types";

export const getCommentsFetch = async (id, kids) => {
  console.log('зашел в феч');
  console.log(id, kids);
  const response = await fetch(`/posts/comments/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ kids }),
  });
  const result = await response.json();
  console.log('result:', result);
  return result;
};

export const getCommentsAC = (id, kids) => async (dispatch) => {
  const { comments } = await getCommentsFetch(id, kids);
  dispatch({
    type: DOWNLOAD_COMMENTS,
    payload: comments,
  });
};


