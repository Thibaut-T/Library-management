'use client'
import { FC, ReactElement } from 'react';
import { useUserContext } from '@/contexts';
import { useState, useEffect } from 'react';
import { useUserProviders } from '@/hooks';
import Link from 'next/link';

const Home: FC = (): ReactElement => {
  const [selectedOption, setSelectedOption] = useState('');

  const { useListUsers } = useUserProviders();
  const { users, load: loadUsers } = useListUsers();

  const { userId, setUserId } = useUserContext();
  
  const handleSelectChange = (event: { target: { value: any; }; }) => {
    setSelectedOption(event.target.value);
  };
  
  const handleButtonClick = () => {
    // Change the current user to the selected option here.
    if (selectedOption) {
      setUserId(selectedOption);
      console.log(`Current user changed to: ${selectedOption}`);
    } else {
      console.error('Error: No user selected.');
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
  <div className="h-screen bg-cover bg-center" >
    <div className="flex flex-col items-center justify-center h-full text-white bg-black bg-opacity-50">
      <div className="absolute top-0 left-0 m-4 flex flex-col w-60 mt-24">
        <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md text-black" value={selectedOption} onChange={handleSelectChange}>
        <option key='default'>select a user</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>{user.userName} {user.userLastName}</option>
          ))}
        </select>
        <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleButtonClick}>
          Confirm
        </button>
      </div>
      <h1 className="text-5xl font-bold">Welcome to Our Library</h1>
      <div className="mt-4 text-lg">
        <Link href="/signUp">
          <p>Sign Up </p>
        </Link>
      </div>
    </div>
  </div>
);
  };

export default Home;

