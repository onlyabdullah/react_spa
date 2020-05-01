import React from 'react';

export default function FormErrors({ errors }) {
  return (
    <ul className='alert alert-danger px-3'>
      {errors.map((error) => (
        <li key={error} className='ml-3'>
          {error}
        </li>
      ))}
    </ul>
  );
}
