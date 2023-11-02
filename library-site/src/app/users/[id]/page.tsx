'use client';

import { useParams } from 'next/navigation';
import { FC } from 'react';

const profilPageID: FC = () => {
    const user = {
        name: 'John Doe',
        surname: 'Smith',
        email: 'johndoe@example.com',
        favoriteBooks: ['Book 1', 'Book 2', 'Book 3'],
        ownedBooks: ['Book A', 'Book B'],
        favoriteGenre: 'Science Fiction',
        friendList: ['Friend 1', 'Friend 2', 'Friend 3'],
      };
    
      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="bg-white w-96 p-8 rounded-lg shadow-md">
            <div className="text-center">
              <h1 className="text-2xl font-semibold">{user.name} {user.surname}</h1>
              <p className="text-gray-500">{user.email}</p>
            </div>
    
            <div className="mt-8">
              <h2 className="text-lg font-semibold">Favorite Books</h2>
              <ul>
                {user.favoriteBooks.map((book, index) => (
                  <li key={index} className="text-gray-700">{book}</li>
                ))}
              </ul>
            </div>
    
            <div className="mt-8">
              <h2 className="text-lg font-semibold">Owned Books</h2>
              <ul>
                {user.ownedBooks.map((book, index) => (
                  <li key={index} className="text-gray-700">{book}</li>
                ))}
              </ul>
            </div>
    
            <div className="mt-8">
              <h2 className="text-lg font-semibold">Favorite Genre</h2>
              <p className="text-gray-700">{user.favoriteGenre}</p>
            </div>
    
            <div className="mt-8">
              <h2 className="text-lg font-semibold">Friend List</h2>
              <ul>
                {user.friendList.map((friend, index) => (
                  <li key={index} className="text-gray-700">{friend}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );
    };

export default profilPageID;
