'use client'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FC } from 'react';

const ProfilePage: FC = () => {
  const [buttonHovered, setButtonHovered] = useState(0);
  const handleMouseEnter = (id: string) => {
    setButtonHovered(1);
    localStorage.setItem('buttonHovered', id);
  };

  const handleMouseLeave = () => {
    setButtonHovered(0);
    localStorage.setItem('buttonHovered', '0');
  };
    const [searchTerm, setSearchTerm] = useState('');
    const [bookSearchTerm, setBookSearchTerm] = useState('');

    const handleBookSearch = (e: React.ChangeEvent<any>) => {
        setBookSearchTerm(e.target.value);
        {/* need to get into the BDD and get all the name that correspond */}
    }


    const handleSearch = (e: React.ChangeEvent<any>) => {
        setSearchTerm(e.target.value);
        {/* need to get into the BDD and get all the id that correspond */}
    }

    
    return (
        <>
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
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-blue-100 m-4 rounded-lg">
           {/* need to add the sorted.users.map(users) when it will be created to print all the users | or only print certain users regarding the name in the searchbar etc ...*/} 
  
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">Tournemaine Thibaut {/*User.surname | user.name*/}</div>
    <p className="text-gray-700 text-base">{/*User.ownedbooks */}
      EXEMPLE DE LIVRE QU'IL POSSEDE 
    </p>
  </div>
  <div className="px-6 pt-4 pb-2">
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Thriller{/*User.favoritegenre*/}</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">SC-FI</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Romance</span>
  </div>
  <div className="px-6 pt-4 pb-2 flex justify-center">
  <Link href='/users/"user.id"'>
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    onMouseEnter={() => handleMouseEnter("user.id")}
    onMouseLeave={handleMouseLeave}>
      Visit the profile
    </button>
    </Link>
  </div>

</div>
<div className="max-w-sm rounded overflow-hidden shadow-lg bg-blue-100 m-4 rounded-lg">
           {/* need to add the sorted.users.map(users) when it will be created to print all the users*/} 
  
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">Tournemaine Thibaut {/*User.surname | user.name*/}</div>
    <p className="text-gray-700 text-base">{/*User.ownedbooks */}
      EXEMPLE DE LIVRE QU'IL POSSEDE 
    </p>
  </div>
  <div className="px-6 pt-4 pb-2">
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Thriller{/*User.favoritegenre*/}</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">SC-FI</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Romance</span>
  </div>
  <div className="px-6 pt-4 pb-2 flex justify-center">
    <Link href='/users/ID123' as={`/users/${'123'}`}>
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Visit the profile
    </button>
    </Link>
  </div>
</div>

</div>

</>
    );
  };
  
  export default ProfilePage;