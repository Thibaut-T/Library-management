import axios from 'axios';
import { useState } from 'react';
import { PlainBookModel, bookToAdd } from '@/models';
import { adaptToPlainBook } from '@/utils/convertingFunctions';

type UseListBooksProvider = {
  books: PlainBookModel[];
  load: (userId: string) => void;
};

export const useListBooks = (): UseListBooksProvider => {
  const [books, setBooks] = useState<PlainBookModel[]>([]);
  const [userId, setUserId] = useState<string>('');

  const fetchBooks = (userId: string): void => {
    console.log("userId: ", userId)
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/books/${userId}`)
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
  userId: string;
  addBook: (bookData: bookToAdd, userId: string) => Promise<PlainBookModel>;
};

export const useAddBook = (): UseAddBookProvider => {
  const [book, setBook] = useState<bookToAdd>({
    name: '',
    writtenOn: new Date(),
    author: '',
    genreId: '',
  });
  const [userId, setUserId] = useState<string>('');
  const addBook = (bookData: bookToAdd, userId: string): Promise<PlainBookModel> => {
    console.log('book to add: ',bookData)
    console.log('User: ', userId)
    return axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/books/${userId}`, bookData)
        .then((data) => {
          console.log('Book added:', data.data)
          return(data.data);
        })
        .catch((err) => {
          console.error(err);
          throw err; 
        })
  }
  return { book, userId,  addBook }; 
} 

type AddBookProviders = {
  useAddBook: () => UseAddBookProvider;
};

export const useAddBookProviders = (): AddBookProviders => ({
  useAddBook,
});

type UseDeleteBookProvider = {
  deleteBook: (id: string, userId: string) => Promise<string>;
};

export const useDeleteBook = (): UseDeleteBookProvider => {
  const deleteBook = (id: string, userId: string): Promise<string> => {
    return axios
        .delete(`${process.env.NEXT_PUBLIC_API_URL}/books/${userId}/${id}`)
        .then((data) => {
          console.log('Book deleted:', data.data)
          return(data.data);
        })
        .catch((err) => {
          console.error(err);
          return Promise.reject(err.message); 
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
