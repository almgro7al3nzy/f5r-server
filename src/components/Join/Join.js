import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styles from './Join.module.css';

const Join = ({ history }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [value, setValue] = useState('');

  if (room === '' && value) {
    setRoom(value);
  }

  const onSubmit = e => {
    if (name === '' || room === '') {
      alert('Please fill in all fields');
    } else {
      history.push(`/main?name=${name}&room=${room}`);
    }
  };

  return (
    <div className={styles.joinOuterContainer}>
      <div className={styles.innerJoin}>
        <div class='text-center'>
          <h1 class='display-4 text-white mb-5'>
            <i class='fas fa-users'></i>
            Team Talk
          </h1>
          <p class='text-white lead mb-0 font-weight-bold'>
            Simple and Secure Live Chat to collaborate with team members on
            projects.
          </p>
          <p class='text-white lead mb-4 mt-4' style={{ fontSize: '15px' }}>
            Created by{' '}
            <p class='text-white font-weight-bold'>Christos Malamas</p>
          </p>
        </div>
        <div className='container'>
          <h1 className={styles.heading}>Join</h1>

          <div class='form-group'>
            <input
              type='text'
              onChange={event => setName(event.target.value)}
              class='form-control'
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
              placeholder='Username'
              required
            />
          </div>

          <div>
            <input
              class='form-control'
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
              placeholder='Room'
              type='text'
              onChange={event => setRoom(event.target.value)}
            />
          </div>

          <div class='form-group'>
            <label for='exampleFormControlSelect1' className='text-white mt-4'>
              or <br />
              <p style={{ color: '#74ebd5' }}>
                jump in one public room of your organisation
              </p>
            </label>
            <select
              value={value}
              class='form-control'
              id='exampleFormControlSelect1'
              onChange={event => setValue(event.target.value)}
            >
              <option hidden> -- select a public room -- </option>
              <option>Reports on Bugs</option>
              <option>Reports on internal affairs</option>
              <option>Corporate Social Responsibilities Ideas</option>
              <option>Weekly Volunteering with environmental groups</option>
              <option>Innovative Ideas Hub</option>
              <option>New Employees/Senior Hub</option>
            </select>
          </div>
          <a onClick={onSubmit}>
            <button
              className={styles.button}
              type='button'
              style={{ backgroundColor: '#lightgreen' }}
              class='btn btn-primary btn-lg btn-block mt-4'
              type='submit'
            >
              Sign In
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Join);
