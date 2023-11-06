import axios from 'axios';
import { useState } from 'react';
import { PlainBookModel, bookToAdd } from '@/models';
import { adaptToPlainBook } from '@/utils/convertingFunctions';

type UseListBooksProvider = {
  books: PlainBookModel[];
  load: () => void;
};

export const useListBooks = (): UseListBooksProvider => {
  const [books, setBooks] = useState<PlainBookModel[]>([]);

  const fetchBooks = (): void => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/books`)
      .then((data) => setBooks(data.data))
      .catch((err) => console.error(err));
  };
  return { books, load: fetchBooks };
};

type BookProviders = {
  useListBooks: () => UseListBooksProvider;
};

export const useBooksProviders = (): BookProviders => ({
  useListBooks,
});

type UseAddBookProvider = {
  book: bookToAdd;
  addBook: (bookData: bookToAdd) => void;
};

export const useAddBook = (): UseAddBookProvider => {
  const [book, setBook] = useState<bookToAdd>({
    name: '',
    writtenOn: new Date(),
    author: '',
    genreId: '',
  });
  const addBook = (bookData: bookToAdd): void => {
    console.log(bookData)
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/books/`, bookData)
      .then((data) => {
        console.log('Book added:', data.data)
        return(data.data);
      })
      .catch((err) => {
        console.error(err);
        throw err; 
      })
  }
  return { book, addBook }; 
} 

type AddBookProviders = {
  useAddBook: () => UseAddBookProvider;
};

export const useAddBookProviders = (): AddBookProviders => ({
  useAddBook,
});

type UseDeleteBookProvider = {
  deleteBook: (id: string) => Promise<any>;
};

export const useDeleteBook = (): UseDeleteBookProvider => {
  const deleteBook = (id: string): Promise<any> => {
    return axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/books/${id}`)
      .then((data) => {
        console.log('Book deleted:', data.data)
        return(data.data);
      })
      .catch((err) => {
        console.error(err);
        throw err; 
      })
  }
  return { deleteBook }; 
}

type DeleteBookProviders = {
  useDeleteBook: () => UseDeleteBookProvider;
};

export const useDeleteBookProviders = (): DeleteBookProviders => ({
  useDeleteBook,
});