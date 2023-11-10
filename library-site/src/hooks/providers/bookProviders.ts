import axios from 'axios';
import { useState } from 'react';
import { PlainBookModel, bookToAdd, PlainAuthorModel } from '@/models';
import { adaptToPlainBook } from '@/utils/convertingFunctions';
import { Palanquin } from 'next/font/google';

type UseListBooksProvider = {
  books: PlainBookModel[];
  load: (userId: string) => void;
};

export const useListBooks = (): UseListBooksProvider => {
  const [books, setBooks] = useState<PlainBookModel[]>([]);
  const [userId, setUserId] = useState<string>('');

  const fetchBooks = (userId: string): void => {
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

//Provider to get a single book
type UseGetBookProvider = {
  author: PlainAuthorModel;
  book: PlainBookModel;
  load: (id: string) => void;
};

export const useGetBook = (): UseGetBookProvider => {
  const [author, setAuthor] = useState<PlainAuthorModel>({
    id: '',
    firstName: '',
    lastName: '',
    photoUrl: '',
  });
  const [book, setBook] = useState<PlainBookModel>({
    id: '',
    name: '',
    writtenOn: new Date(),
    author: author,
    genres: [],
  });
  const fetchBookById = (id: string): void => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/books/user/${id}`)
      .then((data) => {
          setBook(data.data)
          console.log("book fetched: ",data.data)
      })
      .catch((err) => console.error(err));
  };
  return { author, book, load: fetchBookById };
}

type GetBookProviders = {
  useGetBook: () => UseGetBookProvider;
};

export const useGetBookProviders = (): GetBookProviders => ({
  useGetBook,
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
    return axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/books/${userId}`, bookData)
        .then((data) => {
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
    console.log("deleteBook called: ", id, " ", userId);
    return axios
        .delete(`${process.env.NEXT_PUBLIC_API_URL}/books/${userId}/${id}`)
        .then((data) => {
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
