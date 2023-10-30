"use client"
import { FC, ReactElement, createContext } from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../components/navbar';
import BooksPage from './books/page';
import AuthorsPage from './authors/page';
import RegisterForm from '@/components/from';
import './globals.css';
const MyContext = createContext({});

const Home: FC = (): ReactElement => (
  <>
    <div>
      <Navbar />
    </div>
    <div >
      <MemoryRouter>
        <Routes>
          <Route path='/'/>
          <Route path='/books' element={<BooksPage />} />
          <Route path='/authors' element={< AuthorsPage/>} />
          <Route path='/users' element={< BooksPage/>} />   {/*Need to put the users component when created*/}
        </Routes>
      </MemoryRouter>
      <div className='flex justify-center'>
        <h1 className='text-4xl font-bold underline'>Welcome to our Library management tool</h1>
      </div>
      <RegisterForm />
    </div>
  </>
);

export default Home;