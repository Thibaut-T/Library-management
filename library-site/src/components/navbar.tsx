'use client'

import React, { useState } from 'react';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);
  const isBooksPage = typeof window !== 'undefined' && window.location.pathname === '/books';
  const isAuthorsPage = typeof window !== 'undefined' && window.location.pathname === '/authors';
  const isUsersPage = typeof window !== 'undefined' && window.location.pathname === '/users';
 
  return (
    <div className='sticky fixed w-full h-[80px] flex justify-between items-center px-4 bg-[#0a192f] text-gray-300'>
      <div className='text-4xl font-bold font-montserrat'>
        <a href='/'>Library</a>
      </div>
      <div className='flex items-center space-x-4'>
        <div
          onClick={handleClick}
          className='text-3xl font-bold hover:text-gray-300 cursor-pointer font-montserrat'
        >
          <a href='./books'><p className="m-5 relative group">
        <span>Books</span>
        <span className="absolute -bottom-1 left-1/2 w-0 h-2 bg-blue-600 group-hover:w-1/2 group-hover:transition-all"></span>
        <span className="absolute -bottom-1 right-1/2 w-0 h-2 bg-blue-600 group-hover:w-1/2 group-hover:transition-all"></span>
        </p></a>
        </div>
        <div
          onClick={handleClick}
          className='text-3xl font-bold hover:text-gray-300 cursor-pointer font-montserrat'
        >
          <a href='./authors'><p className="m-5 relative group">
        <span>Authors</span>
        <span className="absolute -bottom-1 left-1/2 w-0 h-2 bg-blue-600 group-hover:w-1/2 group-hover:transition-all"></span>
        <span className="absolute -bottom-1 right-1/2 w-0 h-2 bg-blue-600 group-hover:w-1/2 group-hover:transition-all"></span>
        </p></a>
        </div>
        <div
          onClick={handleClick}
          className='text-3xl font-bold hover:text-gray-300 cursor-pointer font-montserrat'
        >
          <a href='./users'><p className="m-5 relative group">
        <span>Users</span>
        <span className="absolute -bottom-1 left-1/2 w-0 h-2 bg-blue-600 group-hover:w-1/2 group-hover:transition-all"></span>
        <span className="absolute -bottom-1 right-1/2 w-0 h-2 bg-blue-600 group-hover:w-1/2 group-hover:transition-all"></span>
        </p></a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;