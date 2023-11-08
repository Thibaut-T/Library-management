"use client";
import React from "react";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useState,
  FC,
} from "react";


interface User {
  name: string;
  surname: string;
  email: string;
  favoriteBooks: string[];
  ownedBooks: string[];
  favoriteGenre: string[];
  friendList: string[];
}

const profilPageID: FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedBook, setSelectedBook] = useState<string>("");
  const [modalAction, setModalAction] = useState<string | null>(null);

  const handleDelete = () => {
    setUser({
      ...user,
      [selectedCategory]: (
        user[selectedCategory as keyof User] as string[]
      ).filter((item: string) => item !== selectedBook),
    });
    setShowModal(false);
  };

  const [user, setUser] = useState<User>({
    name: "John Doe",
    surname: "Smith",
    email: "johndoe@example.com",
    favoriteBooks: ["Book 1"],
    ownedBooks: ["Book A", "Book B"],
    favoriteGenre: ["Science Fiction"],
    friendList: ["Friend 1", "Friend 2", "Friend 3"],
  });

  interface User {
    name: string;
    surname: string;
    email: string;
    favoriteBooks: string[];
    ownedBooks: string[];
    favoriteGenre: string[];
    friendList: string[];
    [key: string]: any;
  }

  const handleDeleteUser = async () => {
    console.log("delete user");
  };

  const handleOpenModal = (category: string, action: string) => {
    setSelectedCategory(category);
    setModalAction(action);
    if (action === "Delete") {
      setSelectedBook(user[category][0]);
    } else if (action === "Add") {
      setSelectedBook("");
    }
    setShowModal(true);
  };

  return (
    <form className="p-4 w-full max-w-3xl mx-auto space-y-4 bg-white shadow rounded-lg mt-8">
      <h1 className="text-2xl font-bold text-center py-4 underline">
        {user.name} {user.surname}
      </h1>

      {["favoriteBooks", "ownedBooks", "favoriteGenre", "friendList"].map(
        (category) => (
          <div className="px-8 py-4" key={category}>
            <span className="text-gray-700 block text-center">
              {category
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}{" "}
              :
            </span>
            <div className="flex flex-wrap justify-center p-4">
              {user[category].map(
                (
                  item:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
                    | null
                    | undefined,
                  index: Key | null | undefined
                ) => (
                  <div
                    key={index}
                    className="relative inline-block bg-blue-200 text-blue-800 px-2 py-1 rounded m-1 hover:bg-red-500 hover:text-white"
                  >
                    {item}
                    
                  </div>
                )
              )}
            </div>
            <button
              type="button"
              onClick={() => handleOpenModal(category, "Delete")}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
              Delete{" "}
              {category
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
            </button>
            <button
              type="button"
              onClick={() => handleOpenModal(category, "Add")}
              className="mt-4 px-4 py-2 bg-blue-500 float-right text-white rounded"
            >
              Add{" "}
              {category
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
            </button>
          </div>
        )
      )}

      {showModal && (
        <div
          className="fixed z-10 inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      {modalAction === "Delete"
                        ? `Are you sure you want to delete this ${selectedCategory
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase())}?`
                        : `Add a new ${selectedCategory
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase())}`}
                    </h3>
                    <form onSubmit={(e) => e.preventDefault()}>
                      <select onChange={(e) => setSelectedBook(e.target.value)}>
                        {modalAction === "Delete"
                          ? user[selectedCategory]
                              .filter(
                                (item: string | number | null | undefined) =>
                                  item !== null && item !== undefined
                              )
                              .map((item: string | number) => (
                                <option key={item} value={item}>
                                  {item}
                                </option>
                              ))
                          : ["Option 1", "Option 2", "Option 3"].map(
                              (option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              )
                            )}
                      </select>
                    </form>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Confirm
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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
    </form>
  );
};

export default profilPageID;
