'use client'
import { FC, ReactElement } from 'react';
import { BrowserRouter, Route,Routes} from 'react-router-dom';
import { useRouter } from 'next/router'

import Link from 'next/link';
import ProfilePage from './users/page';
import profilPageID from './users/[id]/page';

const Home: FC = (): ReactElement => (
  <>


  <BrowserRouter >
      <Routes>
       
      </Routes>
    </BrowserRouter>
  <div className="h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://source.unsplash.com/random')" }}>
    <div className="flex flex-col items-center justify-center h-full text-white bg-black bg-opacity-50">
      <h1 className="text-5xl font-bold">Welcome to Our Library</h1>
      <p className="mt-4 text-lg">
        <Link href="/signUp">
         <p>Sign Up </p>
        </Link>
      </p>
    </div>
  </div>
  </>
);

export default Home;
