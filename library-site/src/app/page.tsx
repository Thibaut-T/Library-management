'use client'
import { FC, ReactElement } from 'react';
import { BrowserRouter, Route,Routes} from 'react-router-dom';
import { useRouter } from 'next/router'
import { useState } from 'react';
import Link from 'next/link';
import ProfilePage from './users/page';
import profilPageID from './users/[id]/page';

  const Home: FC = (): ReactElement => {
    const [selectedOption, setSelectedOption] = useState('');
  
    const handleSelectChange = (event: { target: { value: any; }; }) => {
      setSelectedOption(event.target.value);
    };
  
    const handleButtonClick = () => {
      // Change the current user to the selected option here.
      console.log(`Current user changed to: ${selectedOption}`);
    };



  return (
 
    <div className="h-screen bg-cover bg-center" >
  <div className="flex flex-col items-center justify-center h-full text-white bg-black bg-opacity-50">
  <div className="absolute top-0 left-0 m-4 flex flex-col w-40 mt-24">
        <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md text-black" value={selectedOption} onChange={handleSelectChange}>
          <option>PSEUDO</option>
          <option>PSEUDO 2</option>
          <option>PSEUDO 3</option>
        </select>
        <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleButtonClick}>
          Confirm
        </button>
      </div>
    <h1 className="text-5xl font-bold">Welcome to Our Library</h1>
    <p className="mt-4 text-lg">
      <Link href="/signUp">
        <p>Sign Up </p>
      </Link>
    </p>
  </div>
</div>
);
  };

export default Home;

