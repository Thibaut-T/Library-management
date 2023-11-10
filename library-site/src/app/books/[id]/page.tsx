'use client';
import React from "react";
import { useState, useEffect, FC} from "react";
import { useParams } from 'next/navigation';
import { useDeleteFavoriteGenreProvider, useUpdateUserProvider, useDeleteFriendProvider, useAddFriendProvider, useGetUserProvider, useUserProviders, useGenresProviders, useBooksProviders, useDeleteUserProvider, useAddBookProviders, useDeleteBookProviders, useGetBookProviders } from "@/hooks";
import { PlainUserModel, UserUpdateModel, GenreModel, PlainBookModel } from "@/models";
import Link from 'next/link';

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
const BooksDetailsPage: FC = () => {
  const { id } = useParams();
  if(!id) return <div>Book not found</div>
  const bookId  = (id as string).split('%20')[1];
  const userId = (id as string).split('%20')[0];
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState('');

  const { useGetBook } = useGetBookProviders();
  const { book: bookToShow, load: loadBook } = useGetBook();

  const { useGetUser } = useGetUserProvider();
  const { user: userToShow, load: loadUsers } = useGetUser();


  const { useListUsers } = useUserProviders();
  const { users, load: loadUsersList } = useListUsers();

  const { useListGenres } = useGenresProviders();
  const { genres, load: loadGenres } = useListGenres();

  const { useListBooks } = useBooksProviders();
  const { books, load: loadBooks } = useListBooks();

  const { useDeleteUser } = useDeleteUserProvider();
  const { deleteUser } = useDeleteUser();
  
  const { useAddBook } = useAddBookProviders();
  const { addBook } = useAddBook();

  const { useDeleteBook } = useDeleteBookProviders();
  const { deleteBook } = useDeleteBook();

  const { useAddFriend } = useAddFriendProvider();
  const { addFriend } = useAddFriend();

  const { useDeleteFriend } = useDeleteFriendProvider();
  const { deleteFriend } = useDeleteFriend();

  const { useDeleteFavoriteGenre } = useDeleteFavoriteGenreProvider();
  const { deleteFavoriteGenre } = useDeleteFavoriteGenre();

  const { useUpdateUser } = useUpdateUserProvider();
  const { updateUser } = useUpdateUser();
  const [userToUpdate, setUserToUpdate] = useState<PlainUserModel>();

  const [showModal, setShowModal] = useState(false);
  const [selectedModalValue, setSelectedModalValue] = useState<string>('');

  const [owners, setOwners] = useState<string[]>([]);

  const handleDeleteBook = async () => {
    const response = await deleteBook(bookId, userId);
    if (response) {
      alert("Book deleted successfully");
    } else {
      alert("Failed to delete book");
    }
  };
  const handleRedirectUser = (user: string) => {
    const userToRedirect = users?.find((u) => `${u.userName} ${u.userLastName}` === user);
    if (userToRedirect) {
      window.location.href = `/users/${userToRedirect.id}`;
    }
  };
  const [modalInfo, setModalInfo] = useState<{
    category: string;
    action: string;
  } | null>(null);
  
  const handleOpenModal = (category: string, action: string) => {
    setModalInfo({ category, action });
  };
  
  const handleCloseModal = () => {
    setSelectedModalValue(''); // Clear the selected value
    setModalInfo(null);
  };

  //create a array owners where all the owners of the book are stored
  function getBookOwners(bookToShow: PlainBookModel, users: PlainUserModel[]) {
    const ownersToSet = [''];
    if (bookToShow) {
      users.forEach((user) => {
        if (user.ownedBooks && user.ownedBooks.includes(bookToShow.id)) {
          ownersToSet.push(`${user.userName} ${user.userLastName}`);
        }
      });
    }
    return ownersToSet;
  }
  function updateOwners(bookToShow: PlainBookModel, users: PlainUserModel[]) {
    const ownersToSet = getBookOwners(bookToShow, users);
    ownersToSet.shift();
    setOwners(ownersToSet);
  }
  useEffect(() => {
    loadBook(bookId);
    loadBooks("none");
    loadGenres();
    loadUsersList();
    
  }, []);
  useEffect(() => {
    if (bookToShow && users) {
      updateOwners(bookToShow, users);
    }
  }, [bookToShow, users]);
  if(error){
    return <div>Error: {error}</div>
  }
  return (
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
        <Link href="/books">
          <p className="cursor-pointer text-xl font-bold transition duration-500 ease-in-out transform hover:-translate-y-1">
            Books
          </p>
        </Link>
      </li>
      <li>/</li>
      <li>
        <p className=" text-xl font-bold transition duration-500 ease-in-out ">
          {bookToShow?.name}
        </p>
      </li>
    </ul>
  </nav>
</div>
      {bookToShow && (
        <>
          <div className="flex justify-center">
            <h1 className="text-2xl font-bold">Title: {bookToShow.name}</h1>
          </div>
          {/* Display Author */}
          <div className=" flex flex-col items-center px-8 py-4">
            <span className="text-gray-700 block">Author:</span>
            <div className="relative inline-block bg-blue-200 text-blue-800 px-2 py-1 rounded m-1">
              {bookToShow.author.firstName} {bookToShow.author.lastName}
            </div>
          </div>
          
          {/* Display Genre */}
          <div className="flex flex-col items-center justify-center px-8 py-4">
            <span className="text-gray-700 block">Owned Books:</span>
            <div className="relative inline-block bg-blue-200 text-blue-800 px-2 py-1 rounded m-1">
              {bookToShow.genres[0]? bookToShow.genres[0].name: 'No genres'}
            </div>
          </div>
          
          {/* Display owners */}
          <div className=" flex flex-col items-center justify-center px-8 py-4">
            <span className="text-gray-700 block">User who owns this book:</span>
            {/* Display friends items */}
            {owners.length > 0 && owners.map((owner) => (
              <div className="flex" key={owner}>
                <div className="relative inline-block bg-blue-200 text-blue-800 px-2 py-1 rounded m-1">
                  <button onClick={() => handleRedirectUser(owner)}>
                    {owner}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      {/* Delete Book button */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => {
            const confirmDelete = window.confirm("Do you really want to delete this book ?");
            if (confirmDelete) {
              handleDeleteBook();
            }
          }}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Delete book
        </button>
      </div>
    </div>
  );
};

export default BooksDetailsPage;
