<ListGroup key={el?.id} className='listGroup'>
        <Link to={`/posts/page/${el?.id}`}>
          <ListGroup.Item className='postTitle'>{index+1}. {el?.title}</ListGroup.Item>
        </Link>
          <div className='postInfo'>
            <p className='pInfo'>{el?.score} points</p>
            <p className='pInfo'>by {el?.by}</p>
            <p className='pInfo'>{el?.time}</p>
          </div>
      </ListGroup>
