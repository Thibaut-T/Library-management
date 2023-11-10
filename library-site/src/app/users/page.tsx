'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FC } from 'react';
import { useUserProviders, useGenresProviders, useBooksProviders } from '@/hooks';
import { findName } from "@/utils/findingFunctions";

const ProfilePage: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [bookSearchTerm, setBookSearchTerm] = useState('');

  const { useListUsers } = useUserProviders();
  const { users, load: loadUsers } = useListUsers();

  const { useListGenres } = useGenresProviders();
  const { genres, load: loadGenres } = useListGenres();

  const { useListBooks } = useBooksProviders();
  const { books, load: loadBooks } = useListBooks();

  const handleBookSearch = (e: React.ChangeEvent<any>) => {
    setBookSearchTerm(e.target.value);
    {/* need to get into the BDD and get all the name that correspond */}
  }


  const handleSearch = (e: React.ChangeEvent<any>) => {
    setSearchTerm(e.target.value);
    {/* need to get into the BDD and get all the id that correspond */}
  }

  


  const filteredUsers = users.filter(user => {
    const book = books.find(book => book.id === user.favoriteBook);
    return user.userName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!user.favoriteBook || (book && book.name.toLowerCase().includes(bookSearchTerm.toLowerCase())));
  });
  
  useEffect(() => {
    loadUsers();
    loadBooks("none");
    loadGenres();
  }, []);
  console.log(users);
  return (
    <div>
      <h1 className='text-center text-4xl font-bold my-4 underline'>Welcome to the users page</h1>
      <div className="inline-flex justify-center mx-auto w-full  text-gray-800 font-bold py-2 px-4">
        <input 
            type="text" 
            placeholder="Search by name" 
            value={searchTerm} 
            onChange={handleSearch} 
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-8"
        />
        <input 
            type="text" 
            placeholder="Search by book" 
            value={bookSearchTerm} 
            onChange={handleBookSearch} 
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex justify-start">
        {filteredUsers.map((user) => ( 
          <div className="max-w-sm rounded overflow-hidden shadow-lg bg-blue-100 m-4 rounded-lg" key={user.userName}>
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{user.userName} {user.userLastName}</div>
                {user.favoriteBook ? 
                  <p className="text-gray-700 text-base">
                    {findName(user.favoriteBook, books)} 
                  </p>
                  : "pas de livre favoris"
                }
              </div>
              <div className="px-6 pt-4 pb-2">
                {user.favoriteGenres && user.favoriteGenres[0] ? user.favoriteGenres.map((genre) => (
                  <span key={genre} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{findName(genre,genres)}</span>
                )) : <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Pas de genres favoris</span>}
              </div>
              <div className="px-6 pt-4 pb-2 flex justify-center">
                <Link href={`/users/${user.id}`}>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Visit the profile
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>   
  );
};
  
export default ProfilePage;