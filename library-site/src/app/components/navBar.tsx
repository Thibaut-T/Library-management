import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-6 bg-blue-500">
      <div>
        <Link href="/">
          <p className="cursor-pointer text-4xl font-bold text-white transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
            Library
          </p>
        </Link>
      </div>
      <div className="flex space-x-4">
        <Link href="/books">
          <p className="cursor-pointer text-3xl text-white transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
            Books
          </p>
        </Link>
        <Link href="/authors">
          <p className="cursor-pointer text-3xl text-white transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
            Authors
          </p>
        </Link>
        
        <Link href="/users">
          <p className="cursor-pointer text-3xl text-white transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
            Users
          </p>
        </Link>
        <Link href="/api">
          <p className="cursor-pointer text-3xl text-white transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
            API 
          </p>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;