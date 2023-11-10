"use client";
import { FC, ReactElement, useEffect, useState } from "react";
import {
  useBooksProviders,
  useGenresProviders,
  useAddBookProviders,
  useDeleteBookProviders,
  useAuthorsProviders,
  useAddAuthorsProviders
} from "@/hooks";
import { useSortByNameInv } from "@/utils/sortingFunctions";
import { PlainBookModel, authorToAdd } from "@/models";
import { useUserContext } from "@/contexts";

const AuthorsPage: FC = (): ReactElement => {
  const { userId } = useUserContext();

  const { useListBooks } = useBooksProviders();
  const { books, load: loadBooks } = useListBooks();

  const { useListGenres } = useGenresProviders();
  const { genres, load: loadGenres } = useListGenres();

  const { useListAuthors } = useAuthorsProviders();
  const { authors, load: loadAuthors } = useListAuthors();

  const { useAddAuthor } = useAddAuthorsProviders();
  const { author: newAuthor, addAuthor } = useAddAuthor();

  //const [newAuthor, setAuthor] = useState<authorToAdd>();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [bookToDelete, setBookToDelete] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);

  const [sortedBooks, setSortedBooks] = useState(books);
  const [searchQuery, setSearchQuery] = useState("");

  const [sortDirection, setSortDirection] = useState("desc");

  function countBooks(authorId: string) {
    let count = 0;
    books.forEach((book) => {
      if (book.author.id=== authorId) {
        count++;
      }
    });
    return count;
  }
  const filteredAuthors = authors.filter(
    (author) =>
      author.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      author.lastName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const sortedAuthors = [...filteredAuthors].sort((a, b) => {
    const booksCountA = countBooks(a.id);
    const booksCountB = countBooks(b.id);

    if (sortDirection === "asc") {
      return booksCountA - booksCountB;
    } else {
      return booksCountB - booksCountA;
    }
  });
  const handleAddAuthor = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    newAuthor.firstName = firstName;
    newAuthor.lastName = lastName;
    addAuthor(newAuthor);
    loadAuthors();
    toggle();
  };
  useEffect(() => {
    loadBooks("none");
    loadGenres();
    loadAuthors();
  }, []);


  return (
    <>
      <h1 className="text-center text-4xl font-bold my-4 underline">
        Welcome to the authors page
      </h1>
      <div className="inline-flex justify-center mx-auto w-full  text-gray-800 font-bold py-2 px-4">
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4"
          onClick={() => {
            console.log("sort");
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
          }}
        >
          Sort by Books written
        </button>

        <div className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4">
          <label className="block text-sm leading-5 text-gray-800 font-bold">
            Search by Name
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-8"
              placeholder="Enter author name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <button
          className="bg-blue-300 hover:bg-blue-400 text-gray-800 font-bold py-2 px-4"
          onClick={toggle}
        >
          Add author
        </button>
      </div>
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
                        <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Add a book to the collection</h3>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">Be sure to enter the good informations about the  book you're about to add.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    {/*       Add an author form start here      */ }
                    <form onSubmit={handleAddAuthor}>
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
                                placeholder="Author" 
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
                                placeholder="Author" 
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button type="submit" className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto">Add book</button>
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
      <div className="flex flex-wrap justify-start">
        {sortedAuthors.map((author) => (
          <div
            className="max-w-sm flex flex-col rounded overflow-hidden shadow-lg bg-blue-100 m-4 rounded-lg"
            key={author.id}
          >
            <img className="w-full" src={""/*`./images/${author.photoUrl}`*/} alt={`Photo de ${author.firstName} ${author.lastName}`}  />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{author.firstName} {author.lastName}</div>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {countBooks(author.id)} books written
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AuthorsPage;
