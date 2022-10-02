import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import './Main.css';
import Messages from '../Messages/Messages';
import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png';
let socket;
const Main = ({ location }) => {
  const [name, setName] = useState('');
  const [users, setUsers] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'https://teamtalk.herokuapp.com/';

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit('join', { name, room }, error => {
      if (error) {
        console.log(error);
      }
    });

    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', message => {
      getMessage(message);
      setMessages([...messages, message]);
      console.log(messages);
      console.log(message);
    });
    socket.on('roomData', ({ users }) => {
      setUsers(users);
      console.log(users);
    });
  }, [messages, users]);

  console.log(users);
  // function for sending messages
  const sendMessage = event => {
    event.preventDefault();
    console.log(message);

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  let numberOfUsers;
  if (users) {
    numberOfUsers = users.map(user => (
      <h5 className='bold ml-5 mt-3' key={user.id}>
        {user.name}{' '}
        <span>
          <img style={{ width: '8px' }} src={onlineIcon} alt='online icon' />
        </span>
      </h5>
    ));
  }

  const getMessage = input => {
    console.log(input);
  };

  return (
    <div className='container py-5 px-4'>
      <a href='/' class='btn btn-dark' style={{ fontSize: '12px' }}>
        Leave Room
      </a>
      <div className='text-center'>
        <div className='display-4 font-weight-bold mb-4'>
          <i className='fas fa-users'></i> <h4 className='talky'>Team Talk</h4>
        </div>
      </div>

      <div className='row rounded-lg overflow-hidden shadow'>
        <div className='col-sm-5 '>
          <div className='bg-white'>
            <div className='bg-gray px-4 py-2 bg-light'>
              <p className='h5 mb-0 py-1'>Details</p>
            </div>

            <div className='messages-box container'>
              <div className='list-group rounded-0 mt-3'>
                <h3>
                  <i className='fas fa-comments'></i> Room:
                </h3>
                <button className='font-weight-bold mt-3 btn btn-dark text-white disabled'>
                  <h4># {room}</h4>
                </button>
              </div>
              <div className='list-group rounded-0 mt-3'>
                <h3>
                  <i className='fas fa-users'></i> Team {`(${users.length})`}
                </h3>
                {numberOfUsers}
              </div>
            </div>
          </div>
        </div>

        <div className='col-sm-7 mb-4'>
          <div className='px-4 py-5 chat-box bg-white'>
            <Messages messages={messages} name={name} />
          </div>

          <form action='#' className='bg-light'>
            <div className='input-group' style={{ borderStyle: 'solid' }}>
              <input
                type='text'
                value={message}
                placeholder='Type a message'
                onChange={({ target: { value } }) => setMessage(value)}
                onKeyPress={event =>
                  event.key === 'Enter' ? sendMessage(event) : null
                }
                aria-describedby='button-addon2'
                className='form-control rounded-0 border-0 py-4 bg-light'
              />
              <div
                className='input-group-append'
                style={{ borderColor: '#74ebd5' }}
              >
                <button
                  id='button-addon2'
                  type='submit'
                  className='btn btn-link'
                  onClick={e => sendMessage(e)}
                >
                  {' '}
                  <i className='fa fa-paper-plane'></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Main;
