"use client"
import { FC, ReactElement, createContext } from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../components/navbar';
import BooksPage from './books/page';
import AuthorsPage from './authors/page';

const MyContext = createContext({});

const Home: FC = (): ReactElement => (
  <>
    <div>
      <Navbar />
    </div>
    <div className='bg-gray-500'>
      <MemoryRouter>
        <Routes>
          <Route path='/'/>
          <Route path='/books' element={<BooksPage />} />
          <Route path='/authors' element={< AuthorsPage/>} />
          <Route path='/users' element={< BooksPage/>} />   {/*Need to put the users component when created*/}
        </Routes>
      </MemoryRouter>
      <div className='flex justify-center items-center h-screen'>
        <h1 className='text-4xl font-bold'>Welcome to our Library management tool</h1>
      </div>
    </div>
  </>
);

export default Home;