'use client'
import { FC, ReactElement } from 'react';
import { useUserContext } from '@/contexts';
import { useState, useEffect } from 'react';
import { useUserProviders } from '@/hooks';
import Link from 'next/link';


const Home: FC = (): ReactElement => {
  const [selectedOption, setSelectedOption] = useState('');
  const [showModal, setShowModal] = useState(false); // State to control the visibility of the modal

  const { useListUsers } = useUserProviders();
  const { users, load: loadUsers } = useListUsers();

  const { userId, setUserId } = useUserContext();

  const handleSelectChange = (event: { target: { value: any; }; }) => {
    setSelectedOption(event.target.value);
  };

  const handleButtonClick = () => {
    if (selectedOption) {
      const selectedUser = users.find(user => user.id === selectedOption);
      if (selectedUser) {
        // Display the modal
        setShowModal(true);

        // Set a timeout to close the modal after 3 seconds
        setTimeout(() => {
          setShowModal(false);
        }, 1500);

        setUserId(selectedOption);
      } else {
        console.error('Error: No user selected.');
      }
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    
    <div className="h-screen bg-cover bg-center">
      <div className="flex flex-col items-center justify-center h-full text-white ">
        <div className="absolute top-0 left-0 m-4 flex flex-col w-60 mt-24">
          <select
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md text-black"
            value={selectedOption}
            onChange={handleSelectChange}
          >
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

     
      <div className={`fixed bottom-0 inset-x-0 mx-auto mb-8 max-w-md bg-blue-500 p-8 rounded shadow-lg transition-opacity duration-300 ${showModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <p className="text-lg font-bold mb-4 text-center">
              You selected {users.find(user => user.id === selectedOption)?.userName} {users.find(user => user.id === selectedOption)?.userLastName}
            </p>    
          </div>
        
      
    </div>
  );
};

export default Home;