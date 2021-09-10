import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Switch, Route, useHistory } from 'react-router-dom';
import { downloadAllPostsAC } from './redux/actionCreators/downloadAllPostsAC';
import { ListGroup, Card, Button } from 'react-bootstrap';
import { PostPage } from './components/PostPage';
import { Home } from './components/Home';

const App = () => {
  const dispatch = useDispatch();
  const [onHome, setOnHome] = useState(true);
  useEffect(() => {
    const action = downloadAllPostsAC();
    dispatch(action);
    const myInterval = setInterval(() => {
      console.log('useEffect');
      const action = downloadAllPostsAC();
      dispatch(action);
    }, 60000);
    return () => {
      clearInterval(myInterval);
      console.log('STOPED!!!');
    };
  }, []);

  const renewHandler = async() => {
    const action = downloadAllPostsAC();
    dispatch(action);
  }

  return (
    <div className='cont1'>
      {onHome ? 
      <div className='btnCont'>
        <Link to="/"><Button className='cardBtn1' variant="light"><p className='pBtn'>Главная</p></Button></Link>
        <Button className='cardBtn1' variant="light"><p className='pBtn' onClick={renewHandler}>Обновить</p></Button>
      </div>
      : null
      }
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path={'/posts/page/:postID'}>
          <PostPage setOnHome={setOnHome} />
        </Route>
      </Switch>
    </div>
//     <div className='cont'>
//     {posts.map((el) =>
//   <ul key={el.id}>
//     <li>{el.title}</li>
//     <li>{el.score}</li>
//     <li>{el.by}</li>
//     <li>{el.time}</li>
//     <li><a href={`${el.url}`}>{el.url}</a></li>
//   </ul>
//     )}
// </div>
  );
};

export default App;
