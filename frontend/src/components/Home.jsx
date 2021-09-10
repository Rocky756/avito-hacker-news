import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Switch, Route, useHistory } from 'react-router-dom';
import { downloadAllPostsAC } from '../redux/actionCreators/downloadAllPostsAC';
import { ListGroup, Card, Button } from 'react-bootstrap';

export const Home = () => {
  const posts = useSelector((state) => state.posts);
  return (
    <div className='cont'>
      {posts?.map((el, index) =>
      <Card
      border="dark"
      bg='light'
      text='dark'
      style={{ width: '80%', borderRadius: '15px' }}
      className="mb-2 cardCont"
      >
        <Card.Body className='cardBody'>
          <Card.Title
          className='cardTitle'
          e>{index+1}. {el?.title}</Card.Title>
          <Card.Text
          className='cardText'
          >
            <tr style={{borderSpacing: '2px'}}>
              <td >{el?.score} points</td>
              <td className='cells'> by {el?.by}</td>
              <td className='cells'>{el?.time} ago</td>
            </tr>
          </Card.Text>
          <Link to={`/posts/page/${el.id}`}><Button className='cardBtn' variant="dark"><p className='pBtn'>Перейти</p></Button></Link>
        </Card.Body>
      </Card>
      )}
    </div>
  );
};

