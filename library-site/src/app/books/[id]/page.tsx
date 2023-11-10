'use client';
import React from "react";
import { useState, useEffect, FC} from "react";
import { useParams } from 'next/navigation';
import { useDeleteFavoriteGenreProvider, useUpdateUserProvider, useDeleteFriendProvider, useAddFriendProvider, useGetUserProvider, useUserProviders, useGenresProviders, useBooksProviders, useDeleteUserProvider, useAddBookProviders, useDeleteBookProviders, useGetBookProviders } from "@/hooks";
import { PlainUserModel, UserUpdateModel, GenreModel, PlainBookModel } from "@/models";
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
const BooksDetailsPage: FC = () => {
  const { id } = useParams();
  console.log("Both ids: ", id)
  if(!id) return <div>Book not found</div>
  const bookId  = (id as string).split('%20')[1];
  const userId = (id as string).split('%20')[0];
  console.log("Book id: ", bookId);
  console.log("User id: ", userId);
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
    //console.log("delete user");
    const response = await deleteBook(bookId, userId);
    if (response) {
      console.log("Book deleted successfully");
    } else {
      console.log("Failed to delete book");
    }
  };
  const handleRedirectUser = (user: string) => {
    //console.log("Redirect to user: ", user);
    const userToRedirect = users?.find((u) => `${u.userName} ${u.userLastName}` === user);
    //console.log("User to redirect: ", userToRedirect);
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
    console.log("Inside");
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
    console.log("Owners to set: ", ownersToSet);
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
  console.log("Book to show: ", bookToShow);
  if(error){
    return <div>Error: {error}</div>
  }
  return (
    <div className="p-4 w-full max-w-3xl mx-auto space-y-4 bg-white shadow rounded-lg mt-8">
      {bookToShow && (
        <>
          <div className="flex justify-center">
            <h1 className="text-2xl font-bold">Title: {bookToShow.name}</h1>
          </div>
          {/* Display Author */}
          <div className="px-8 py-4">
            <span className="text-gray-700 block">Author:</span>
            <div className="relative inline-block bg-blue-200 text-blue-800 px-2 py-1 rounded m-1">
              {bookToShow.author.firstName} {bookToShow.author.lastName}
            </div>
          </div>
          
          {/* Display Genre */}
          <div className="px-8 py-4">
            <span className="text-gray-700 block">Owned Books:</span>
            <div className="relative inline-block bg-blue-200 text-blue-800 px-2 py-1 rounded m-1">
              {bookToShow.genres[0]? bookToShow.genres[0].name: 'No genres'}
            </div>
          </div>
          
          {/* Display owners */}
          <div className="px-8 py-4">
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
