import React from 'react';
import { Link } from '@reach/router';
import { FaUsers } from 'react-icons/fa/index';

export default function Navigation({ user, logout }) {
  return (
    <nav className='site-nav family-sans navbar navbar-expand bg-primary navbar-dark higher'>
      <div className='container-fluid'>
        <Link to='/' className='navbar-brand'>
          <FaUsers className='mr-1' />
          Meeting Log
        </Link>

        <div className='navbar-nav ml-auto'>
          {!user && (
            <Link className='nav-item nav-link' to='/login'>
              log in
            </Link>
          )}

          {!user && (
            <Link className='nav-item nav-link' to='/register'>
              register
            </Link>
          )}

          {user && (
            <Link className='nav-item nav-link' to='/meetings'>
              meetings
            </Link>
          )}

          {user && (
            <Link className='nav-item nav-link' to='/login' onClick={logout}>
              log out
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
