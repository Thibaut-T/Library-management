'use client';

import { FC, ReactElement, useEffect } from 'react';
import { useBooksProviders } from '@/hooks';
import Navbar from '@/components/navbar';


const BooksPage: FC = (): ReactElement => {
  const { useListBooks } = useBooksProviders();
  const { books, load } = useListBooks();

  useEffect(() => load, []);

  return (
    <>
    <Navbar />
      <h1>Books</h1>
      {books.map((book) => (
        <div key={book.id}>{book.name}</div>
      ))}
    </>
  );
};

export default BooksPage;
