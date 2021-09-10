import React from 'react';

export const Comments = ({comment}) => {
  const kids = comment.kids;
  const openCommentsHandler = async(event) => {
    event.preventDefault();
    console.log(kids);

  }
  return (
    <div>
      <li>{comment?.text}</li>
      {!comment.kids ?
      <a href="#" onClick={((event) => openCommentsHandler(event))}>Еще комментарии</a>
      :null
      }
    </div>
  );
};

