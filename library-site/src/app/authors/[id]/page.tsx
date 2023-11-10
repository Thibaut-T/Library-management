'use client';
import React from "react";
import { useState, useEffect, FC} from "react";
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useUpdateUserProvider, useGetUserProvider, useUserProviders, useGenresProviders, useBooksProviders, useDeleteUserProvider, useAddBookProviders, useDeleteBookProviders, useGetBookProviders, useGetAuthorProviders, useDeleteAuthorsProviders, useUpdateAuthorsProviders } from "@/hooks";
import { PlainUserModel, UserUpdateModel, GenreModel, PlainBookModel, authorToAdd } from "@/models";
import { useUserContext } from '@/contexts';

interface DropdownProps {
  options: string[];
  onChange: (value: string) => void;
}

const Dropdown: FC<DropdownProps> = ({ options, onChange }) => {
  return (
    <select onChange={(e) => onChange(e.target.value)}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
const AuthorsDetailsPage: FC = () => {
  const { id } = useParams();
  if(!id) return <div>Authors not found</div>
  const authorId  = id as string;

  const { useGetAuthor } = useGetAuthorProviders();
  const { author: authorToShow, load: loadAuthor } = useGetAuthor();

  const { useListUsers } = useUserProviders();
  const { users, load: loadUsersList } = useListUsers();

  const { useListGenres } = useGenresProviders();
  const { genres, load: loadGenres } = useListGenres();

  const { useListBooks } = useBooksProviders();
  const { books, load: loadBooks } = useListBooks();
  
  const { useAddBook } = useAddBookProviders();
  const { book: newBook, addBook } = useAddBook();

  const { useDeleteBook } = useDeleteBookProviders();
  const { deleteBook } = useDeleteBook();

  const [selectedBookToDelete, setSelectedBookToDelete] = useState('');

  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [writtenOn, setWrittenOn] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  const { useDeleteAuthor } = useDeleteAuthorsProviders();
  const { deleteAuthor } = useDeleteAuthor();

  const { useUpdateAuthor } = useUpdateAuthorsProviders();
  const { updateAuthor } = useUpdateAuthor();

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [modalAddBook, setModalAddBook] = useState(false);
  const toggleAddBook = () => setModalAddBook(!modalAddBook);

  const [modalDeleteBook, setModalDeleteBook] = useState(false);
  const toggleDeleteBook = () => setModalDeleteBook(!modalDeleteBook);

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  const findBookWritten = (books: PlainBookModel[]) => {
    const booksToSet: PlainBookModel[] = [];
    if (books) {
      books.forEach((book) => {
        if (book.author.id === authorId) {
          booksToSet.push(book);
        }
      });
    }
    return booksToSet;
  }

  const handleDeleteBook = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await deleteBook(selectedBookToDelete, "none");
    toggleDeleteBook();
  }
  const handleModifyAuthor = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const authorToUpdate: authorToAdd = {
      firstName: firstName,
      lastName: lastName,
    };
    const response = await updateAuthor(authorId, authorToUpdate);
    toggle();

  };

  const handleDeleteAuthor = async () => {
    const response = await deleteAuthor(authorId);
  };
  const handleRedirectBook = (book: PlainBookModel) => {
    if (book) {
      window.location.href = `/books/${"none"} ${book.id}`;
    }
  };
  
  //create a array owners where all the owners of the book are stored
  function getBookOwners(authorToShow: PlainBookModel, users: PlainUserModel[]) {
    const ownersToSet = [''];
    if (authorToShow) {
      users.forEach((user) => {
        if (user.ownedBooks && user.ownedBooks.includes(authorToShow.id)) {
          ownersToSet.push(`${user.userName} ${user.userLastName}`);
        }
      });
    }
    return ownersToSet;
  }
  const handleAddBook = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    newBook.name = name;
    newBook.writtenOn = new Date(writtenOn);
    newBook.author = authorToShow.firstName + " " + authorToShow.lastName;
    newBook.genreId = selectedGenre;
    addBook(newBook, "none").then(() => {
      loadBooks("none");
    });
    toggleAddBook();
  };

  useEffect(() => {
    loadAuthor(authorId);
    loadBooks("none");
    loadGenres();
    loadUsersList();
    
  }, [authorToShow, books, genres, users]);

  return (
    <>
    
    <div className="p-4 w-full max-w-3xl mx-auto space-y-4 bg-white shadow rounded-lg mt-8">
    <div className="flex justify-end">
      <nav className="text-blue-700" aria-label="Breadcrumb">
        <ul className="flex space-x-2">
          <li>
            <Link href="/">
              <p className="cursor-pointer text-xl font-bold transition duration-500 ease-in-out transform hover:-translate-y-1">
                Home
              </p>
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/authors">
              <p className="cursor-pointer text-xl font-bold transition duration-500 ease-in-out transform hover:-translate-y-1">
                Authors
              </p>
            </Link>
          </li>
          <li>/</li>
          <li>
            <p className=" text-xl font-bold transition duration-500 ease-in-out ">
              {authorToShow? `${authorToShow.firstName} ${authorToShow.lastName}` : 'No author'}
            </p>
          </li>
        </ul>
      </nav>
    </div>
      {authorToShow && (
        <>
          <div className="flex justify-center">
            <h1 className="text-2xl font-bold">{authorToShow.firstName} {authorToShow.lastName}</h1>
          </div>
          {/* Display Photo */}
          <div className="px-8 py-4">
            <span className="text-gray-700 block">Photo: </span>
            <div className="relative inline-block bg-blue-200 text-blue-800 px-2 py-1 rounded m-1">
            </div>
          </div>
          
          {/* Display BookWritten */}
          <div className="px-8 py-4">
            <span className="text-gray-700 block">Books written: </span>
            {findBookWritten(books).length > 0 && findBookWritten(books).map((book) => (
              <div className="relative inline-block bg-blue-200 text-blue-800 px-2 py-1 rounded m-1" key={book.id}>
                <div className="flex">
                  <div className="relative inline-block bg-blue-200 text-blue-800 px-2 py-1 rounded m-1">
                    <button onClick={() => handleRedirectBook(book)}>
                      {book.name}
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
          </div>
          
        </>
      )}
      {/* Delete Book button */}
      <div className="flex justify-center">
        <div className="flex justify-center p-1">
          <button
            type="button"
            onClick={() => {
              const confirmDelete = window.confirm("Do you really want to delete this book ?");
              if (confirmDelete) {
                handleDeleteAuthor();
              }
            }}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          >
            Delete Author
          </button>
        </div>
        <div className="flex justify-center p-1">
          <button
            type="button"
            onClick={() => {
              toggle();
            }}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Modify Author
          </button>
          {modal && (
        <div>
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                        <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Modify {authorToShow.firstName} {authorToShow.lastName}</h3>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">Be sure to enter the good informations about the author you're about to modify.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    {/*       Add an author form start here      */ }
                    <form onSubmit={handleModifyAuthor}>
                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                          <label className="block text-sm font-medium leading-6 text-gray-900">
                              Author first name
                          </label>
                          <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                              <input 
                                required 
                                type="text" 
                                name="author" 
                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                onChange={(e) => setFirstName(e.target.value)} 
                                placeholder={authorToShow.firstName}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                          <label className="block text-sm font-medium leading-6 text-gray-900">
                              Author last name
                          </label>
                          <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                              <input 
                                required 
                                type="text" 
                                name="author" 
                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                onChange={(e) => setLastName(e.target.value)} 
                                placeholder={authorToShow.lastName} 
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button type="submit" className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto">Modify Author</button>
                        <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={toggle}>Cancel</button>
                      </div>
                    </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
        </div>
        <div className="flex justify-center p-1">
          <button
            type="button"
            onClick={() => {
              toggleAddBook();
            }}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
          >
            Add a book
          </button>
          {modalAddBook &&
      <div>
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                        <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Add a book to the collection</h3>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">Be sure to enter the good informations about the  book you're about to add.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    {/*       Add a book form start here      */ }
                    <form onSubmit={handleAddBook}>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                          <label className="block text-sm font-medium leading-6 text-gray-900">
                              Name
                          </label>
                          <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                              <input 
                                required
                                type="text" 
                                name="name" 
                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                placeholder="Name" 
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                          <label className="block text-sm font-medium leading-6 text-gray-900">
                              Author
                          </label>
                          <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                             <span className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6">{authorToShow.firstName} {authorToShow.lastName}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                          <label className="block text-sm font-medium leading-6 text-gray-900">
                              Written on
                          </label>
                          <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                              <input 
                                required 
                                type="date" 
                                name="writtenOn" 
                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" 
                                value={writtenOn} 
                                onChange={(e) => setWrittenOn(e.target.value)} 
                                placeholder="writtenOn" 
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                          <label className="block text-sm font-medium leading-6 text-gray-900">
                            Genre
                          </label>
                          <div className="mt-2">
                            <select 
                              required 
                              value={selectedGenre} 
                              onChange={(e) => setSelectedGenre(e.target.value)}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                              <option value="">Select Genre</option>
                              {genres.map((genre) => (
                                <option key={genre.id} value={genre.id}>
                                  {genre.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button type="submit" className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto">Add book</button>
                        <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={toggleAddBook}>Cancel</button>
                      </div>
                    </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  } 
      </div>
      <div className="flex justify-center p-1">
  <button
    type="button"
    onClick={() => {
      toggleDeleteBook();
    }}
    className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
  >
    Delete Book
  </button>
  {modalDeleteBook && (
    <div>
      <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        {/* Modal content goes here, similar to Modify Author modal */}
        {/* ... */}
        <div className=" px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <form onSubmit={handleDeleteBook}>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Select Book to Delete
                </label>
                <div className="mt-2">
                  <select
                    required
                    value={selectedBookToDelete}
                    onChange={(e) => setSelectedBookToDelete(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="">Select Book</option>
                    {findBookWritten(books).map((book) => (
                      <option key={book.id} value={book.id}>
                        {book.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            {/* Add Delete Book button and Cancel button here */}
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="submit"
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Delete Book
              </button>
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={toggleDeleteBook}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )}
</div>  
      </div>
    </div>
    </>
  );
};

export default AuthorsDetailsPage;
