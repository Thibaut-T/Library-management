import axios from 'axios';
import { useState } from 'react';
import { PlainAuthorModel, authorToAdd} from '@/models';

type UseListAuthorsProvider = {
  authors: PlainAuthorModel[];
  load: () => void;
};

export const useListAuthors = (): UseListAuthorsProvider => {
  const [authors, setAuthors] = useState<PlainAuthorModel[]>([]);

  const fetchAuthors = (): void => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/authors`)
      .then((data) => setAuthors(data.data))
      .catch((err) => console.error(err));
  };
  return { authors, load: fetchAuthors };
};

type AuthorProviders = {
  useListAuthors: () => UseListAuthorsProvider;
};

export const useAuthorsProviders = (): AuthorProviders => ({
  useListAuthors,
});


//Provider to add an author

type UseAddAuthorProvider = {
  author: authorToAdd;
  addAuthor: (newAuthor: authorToAdd) => Promise<void>;
};

export const useAddAuthor = (): UseAddAuthorProvider => {
  const [author, setAuthor] = useState<authorToAdd>({
    firstName: "none",
    lastName: "none"
  });

  const addAuthor = (newAuthor: authorToAdd): Promise<void> => {
    console.log('Provider', newAuthor);
    return axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/authors`, { newAuthor })
      .then((response) => {
        setAuthor(response.data);
      })
      .catch((error) => {
        console.error(error);
        throw error; // Re-throw the error to handle it in the component if needed
      });
  };

  return { author, addAuthor };
};

type AddAuthorProviders = {
  useAddAuthor: () => UseAddAuthorProvider;
};

export const useAddAuthorsProviders = (): AddAuthorProviders => ({
  useAddAuthor,
});
