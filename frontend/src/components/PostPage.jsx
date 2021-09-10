import React, { useEffect } from 'react';
import { useParams } from "react-router";
import { useDispatch, useSelector } from 'react-redux';

export const PostPage = ({setOnHome}) => {
  const posts = useSelector((state) => state.posts);
  const {postID} = useParams();

  useEffect(() => {
    setOnHome(false);
    console.log(postID);
    }, []);


  return (
    <div>
      <h1 style={{color: 'white'}}>Привет</h1>
    </div>
  );
};

{/* <ListGroup.Item>Ссылка: <a href={`${el.url}`}>{el.url}</a></ListGroup.Item> */}
