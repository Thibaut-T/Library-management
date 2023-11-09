"use client";
import React from "react";
import { useState, useEffect, FC} from "react";
import { useParams } from 'next/navigation';
import Modal from "@/app/components/modal";
import { findName, findId } from "@/utils/findingFunctions";
import { useUpdateUserProvider, useGetUserProvider, useUserProviders, useGenresProviders, useBooksProviders, useDeleteUserProvider, useAddBookProviders, useDeleteBookProviders } from "@/hooks";
import { PlainUserModel, UserUpdateModel } from "@/models";

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

const profilPageID: FC = () => {
  const { id } = useParams();
  const userId = id as string;
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState('');

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

  const { useUpdateUser } = useUpdateUserProvider();
  const { updateUser } = useUpdateUser();
  const [userToUpdate, setUserToUpdate] = useState<PlainUserModel>();

  const [showModal, setShowModal] = useState(false);
  const [selectedModalValue, setSelectedModalValue] = useState<string>('');

  const handleUpdate = async (cat: string, action: string, value: string) => {
    // Update userToShow with the new value
    console.log(" Category: ", cat, " Value: ", value, " Action: ", action);
    // Call updateUser function with the updated data
    const update : UserUpdateModel = {
      id: userToShow.id,
      userName: userToShow.userName,
      userLastName: userToShow.userLastName,
    };
    if(action === "Add"){
      cat === "favoriteBook" ?
      update.newFavoriteBook = findId(value, books)
      : cat === "ownedBooks" ?
      update.newOwnedBook = findId(value, books)
      : cat == "friends" ?
      update.newFriend = value
      : cat == "favoriteGenres" ?
      update.newFavoriteGenre = findId(value, genres)
      : null;
      console.log("User: ", userToShow, " update: ", update);
      const updatedUser = await updateUser(update);
    }
    else if(action === "Delete"){
      const bookId = findId(value, books);
      console.log("Book id: ", bookId);
      cat === "ownedBooks" ? 
      await deleteBook(bookId, userId)
      : null;
    }
    // Handle the response if needed
  };

  const handleDeleteUser = async () => {
    console.log("delete user");
    const response = await deleteUser(userId);
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

  useEffect(() => {
    loadUsers(userId);
    loadBooks("none");
    loadGenres();
    loadUsersList();
  }, []);
  if(error){
    return <div>Error: {error}</div>
  }
  //console.log("User to show: ", userToShow) 
  return (
    <div className="p-4 w-full max-w-3xl mx-auto space-y-4 bg-white shadow rounded-lg mt-8">
      {userToShow && (
        <>
          {/* Display favoriteBook */}
          <div className="px-8 py-4">
            <span className="text-gray-700 block text-center">Favorite Book:</span>
            {/* Display favoriteBook items */}
            {userToShow.favoriteBook && (
              <div className="flex justify-center p-4">
                <div className="relative inline-block bg-blue-200 text-blue-800 px-2 py-1 rounded m-1">
                  {findName(userToShow.favoriteBook, books)}
                </div>
              </div>
            )}
            {/* Modal buttons */}
            <button
              type="button"
              onClick={() => handleOpenModal("favoriteBook", "Change")}
              className="mt-4 px-4 py-2 bg-blue-500 float-right text-white rounded"
            >
              Change favorite book
            </button>
          </div>
          
          {/* Display ownedBooks */}
          <div className="px-8 py-4">
            <span className="text-gray-700 block text-center">Owned Books:</span>
            {/* Display ownedBooks items */}
            {userToShow.ownedBooks && userToShow.ownedBooks.map((book) => (
              <div className="flex justify-center p-1" key={book}>
                <div className="relative inline-block bg-blue-200 text-blue-800 px-2 py-1 rounded m-1">
                  {findName(book, books)}
                </div>
              </div>
            ))}
            {/* Modal buttons for ownedBooks */}
            <button
              type="button"
              onClick={() => handleOpenModal("ownedBooks", "Delete")}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
              Delete a book
            </button>
            <button
              type="button"
              onClick={() => handleOpenModal("ownedBooks", "Add")}
              className="mt-4 px-4 py-2 bg-blue-500 float-right text-white rounded"
            >
              Add a book
            </button>
          </div>
          
          {/* Display friends */}
          <div className="px-8 py-4">
            <span className="text-gray-700 block text-center">Friend list:</span>
            {/* Display friends items */}
            {userToShow.friends && userToShow.friends.map((friend) => (
              <div className="flex justify-center p-1" key={friend}>
                <div className="relative inline-block bg-blue-200 text-blue-800 px-2 py-1 rounded m-1">
                  {friend}
                </div>
              </div>
            ))}
          {/* Modal buttons for friends */}
          <button
              type="button"
              onClick={() => handleOpenModal("friends", "Delete")}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
              Delete a friend
            </button>
            <button
              type="button"
              onClick={() => handleOpenModal("friends", "Add")}
              className="mt-4 px-4 py-2 bg-blue-500 float-right text-white rounded"
            >
              Add a friend
            </button>
          </div>

          {/* Display favoriteGenres */}
          <div className="px-8 py-4">
            <span className="text-gray-700 block text-center">Favorite genres:</span>
            {/* Display friends items */}
            {userToShow.favoriteGenres && userToShow.favoriteGenres.map((genre) => (
              <div className="flex justify-center p-1" key={genre}>
                <div className="relative inline-block bg-blue-200 text-blue-800 px-2 py-1 rounded m-1">
                  {findName(genre, genres)}
                </div>
              </div>
            ))}
          {/* Modal buttons for favoriteGenres */}
          <button
              type="button"
              onClick={() => handleOpenModal("favoriteGenres", "Delete")}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
              Delete a favorite genre
            </button>
            <button
              type="button"
              onClick={() => handleOpenModal("favoriteGenres", "Add")}
              className="mt-4 px-4 py-2 bg-blue-500 float-right text-white rounded"
            >
              Add a favorite genre
            </button>
          </div>
        </>
      )}

      {/* Modal component */}
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          {/* Modal content */}
        </div>
      )}
      {/* Modal overlay */}
      {modalInfo && (
        <Modal
          show={true}
          onClose={handleCloseModal}
          title={`Select a ${modalInfo.category}`}
          action={modalInfo.action}
          category={modalInfo.category}
          items={
            modalInfo.category === "favoriteBook"
              ? (userToShow.ownedBooks ? userToShow.ownedBooks.map((book) => findName(book, books)): [])
              : modalInfo.category === "ownedBooks" && modalInfo.action === "Delete"
              ? (userToShow.ownedBooks ? userToShow.ownedBooks.map((book) => findName(book, books)): [])
              : modalInfo.category === "ownedBooks" && modalInfo.action === "Add" 
              ? books.map((book) => book.name)
              : modalInfo.category === "friends" && modalInfo.action === "Delete"
              ? userToShow.friends
              : modalInfo.category === "friends" && modalInfo.action === "Add"
              ? users.map((user) => `${user.userName} ${user.userLastName}`)
              : modalInfo.category === "favoriteGenres" && modalInfo.action === "Delete"
              ? (userToShow.favoriteGenres ? userToShow.favoriteGenres.map((genre) => findName(genre, genres)): [])
              : modalInfo.category === "favoriteGenres" && modalInfo.action === "Add"
              ? genres.map((genre) => genre.name)
              : []
          }
          onSubmit={(selectedValue, category, action) => {
            console.log("Selected value: ", selectedValue);
            // Handle form submission based on the category (ownedBooks, favoriteBook, etc.)
            if (category === 'ownedBooks') {
              // Logic for handling ownedBooks category
              handleUpdate(category, action, selectedValue);
            } else if (category === 'favoriteBook') {
              // Logic for handling favoriteBook category
              handleUpdate(category, action, selectedValue);
            } else if (category === 'friends') {
              // Logic for handling other categories
              handleUpdate(category, action, selectedValue);
            } else if (category === 'favoriteGenres') {
              // Logic for handling other categories
              handleUpdate(category, action, selectedValue);
            }
          }}
        />
      )}


      {/* Delete User button */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => {
            const confirmDelete = window.confirm("Do you really want to delete the user?");
            if (confirmDelete) {
              handleDeleteUser();
            }
          }}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Delete User
        </button>
      </div>
    </div>
  );
};

export default profilPageID;
