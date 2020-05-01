import React from 'react';

export default function SearchForm({ handleOnSearch, query }) {
  return (
    <div className='form-group my-2 mx-5'>
      <input
        type='text'
        className='form-control'
        id='search'
        placeholder='Search'
        onChange={handleOnSearch(query)}
      />
    </div>
  );
}
