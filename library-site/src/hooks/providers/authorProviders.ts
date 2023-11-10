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


//Provider to get a single author
type UseGetAuthorProvider = {
  author: PlainAuthorModel;
  load: (id: string) => void;
};

export const useGetAuthor = (): UseGetAuthorProvider => {
  const [author, setAuthor] = useState<PlainAuthorModel>({
    id: '',
    firstName: '',
    lastName: '',
    photoUrl: '',
  });
  const fetchAuthorById = (id: string): void => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/authors/${id}`)
      .then((data) => {
          setAuthor(data.data)
          //console.log("author fetched: ",data.data)
      })
      .catch((err) => console.error(err));
  };
  return { author, load: fetchAuthorById };
}

type GetAuthorProviders = {
  useGetAuthor: () => UseGetAuthorProvider;
};

export const useGetAuthorProviders = (): GetAuthorProviders => ({
  useGetAuthor,
});


//Provider to delete an author

type UseDeleteAuthorProvider = {
  author: PlainAuthorModel;
  deleteAuthor: (id: string) => Promise<void>;
};

export const useDeleteAuthor = (): UseDeleteAuthorProvider => {
  const [author, setAuthor] = useState<PlainAuthorModel>({
    id: '',
    firstName: '',
    lastName: '',
    photoUrl: '',
  });

  const deleteAuthor = (id: string): Promise<void> => {
    return axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/authors/${id}`)
      .then((response) => {
        setAuthor(response.data);
      })
      .catch((error) => {
        console.error(error);
        throw error; // Re-throw the error to handle it in the component if needed
      });
  };

  return { author, deleteAuthor };
};

type DeleteAuthorProviders = {
  useDeleteAuthor: () => UseDeleteAuthorProvider;
};

export const useDeleteAuthorsProviders = (): DeleteAuthorProviders => ({
  useDeleteAuthor,
});

//Provider to update an author
type UseUpdateAuthorProvider = {
  author: PlainAuthorModel;
  updateAuthor: (id: string, author: authorToAdd) => Promise<void>;
};

export const useUpdateAuthor = (): UseUpdateAuthorProvider => {
  const [author, setAuthor] = useState<PlainAuthorModel>({
    id: '',
    firstName: '',
    lastName: '',
    photoUrl: '',
  });

  const updateAuthor = (id: string, author: authorToAdd): Promise<void> => {
    return axios
      .put(`${process.env.NEXT_PUBLIC_API_URL}/authors/${id}`, author)
      .then((response) => {
        setAuthor(response.data);
      })
      .catch((error) => {
        console.error(error);
        throw error; // Re-throw the error to handle it in the component if needed
      });
  };

  return { author, updateAuthor };
};

type UpdateAuthorProviders = {
  useUpdateAuthor: () => UseUpdateAuthorProvider;
};

export const useUpdateAuthorsProviders = (): UpdateAuthorProviders => ({
  useUpdateAuthor,
});