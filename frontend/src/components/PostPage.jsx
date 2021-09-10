import React, { useEffect } from 'react';
import { useParams } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { ListGroup, Card, Button } from 'react-bootstrap';
import { getCommentsAC } from '../redux/actionCreators/getCommentsAC';
import { DOWNLOAD_COMMENTS } from '../redux/types';
import { Comments } from './Comments';

export const PostPage = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const onHome = useSelector((state) => state.onHome);
  const comments = useSelector((state) => state.comments);
  const {postID} = useParams();

  const postArr = posts.filter((el) => el.id == postID);
  const post = postArr[0];

  useEffect(() => {
    console.log(postID);
    if (post?.descendants === 0) {
      dispatch({type: DOWNLOAD_COMMENTS, payload: 'Нет комментариев'})
    } else {
      const kids = post?.kids;
      console.log(kids);
      const action = getCommentsAC(postID, kids);
      dispatch(action);
    }
    const myInterval = setInterval(() => {
      console.log('useEffect');
      if (post.descendants === 0) {
        dispatch({type: DOWNLOAD_COMMENTS, payload: 'Нет комментариев'})
      } else {
        const kids = post?.kids;
        console.log(kids);
        const action = getCommentsAC(postID, kids);
        dispatch(action);
      }
    }, 60000);
    // return () => {
    //   clearInterval(myInterval);
    //   console.log('STOPED!!!');
    // };
    }, []);
  console.log('post:', post);


  return (
    <div className='cont'>
      <Card
      border="dark"
      bg='light'
      text='dark'
      style={{ width: '80%', borderRadius: '15px' }}
      className="mb-2 cardCont"
      key={post?.id}
      >
        <Card.Body className='cardBody'>
            <Card.Title
            className='cardTitle'
            >{post?.title}</Card.Title>
            <Card.Text
            className='cardText'
            >
              <tr style={{borderSpacing: '2px'}}>
                <td >{post?.score} points</td>
                <td className='cells'> by {post?.by}</td>
                <td className='cells'>{post?.time} ago</td>
              </tr>
              <ul>
                <li><a href={`${post?.url}`}>Подробнее...</a></li>
              </ul>
              <h4>Комментарии ({post?.descendants} шт):</h4>
              {post?.descendants ? 
              <ol>
                {comments?.map((el, index) =>
                <Comments key={el.id} comment= {el}/>
                )}
              </ol>  
              : <h3>Нет комментариев</h3>           
              }
              
            </Card.Text>
          </Card.Body>
      </Card>
    </div>
  );
};

{/* <ListGroup.Item>Ссылка: <a href={`${el.url}`}>{el.url}</a></ListGroup.Item> */}
