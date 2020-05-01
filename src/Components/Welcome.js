import React from 'react';
import { Link } from '@reach/router';

export default function Welcome({ user, logout }) {
  return (
    <div className='text-center mt-4'>
      <span className='text-secondary font-weight-bold pl-1'>
        Welcome, {user.displayName}
      </span>
      <Link
        to='/login'
        className='text-primary font-weight-bold pl-1'
        onClick={logout}
      >
        Logout
      </Link>
    </div>
  );
}
