import React from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, username, time }, name }) => {
  let isSentByCurrentUser = false;
  let trimmedUsername;
  if (username) {
    trimmedUsername = username.trim().toLowerCase();
  }

  const trimmedName = name.trim().toLowerCase();

  if (trimmedUsername === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div class='media w-50 ml-auto mb-3'>
      <div class='media-body'>
        <p className='small mb-1 '>{trimmedName}</p>
        <div class='bg-primary rounded py-2 px-3 mb-2'>
          <p class='text-small mb-0 text-white'>{ReactEmoji.emojify(text)}</p>
        </div>
        <p class='small text-muted'>{time}</p>
      </div>
    </div>
  ) : (
    <div class='media w-50 mb-3'>
      <img
        src='https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg'
        alt='user'
        width='50'
        class='rounded-circle'
      />
      <div class='media-body ml-3'>
        <p className='small mb-0'>{username}</p>
        <div class='bg-light rounded py-2 px-3 mb-2'>
          <p class='text-small mb-0'>{ReactEmoji.emojify(text)}</p>
        </div>
        <p class='small text-muted'>{time}</p>
      </div>
    </div>
  );
};

export default Message;
