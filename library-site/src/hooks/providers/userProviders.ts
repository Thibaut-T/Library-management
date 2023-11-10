import axios from "axios";
import { useState } from "react";
import { PlainUserModel, UserModel, UserUpdateModel} from "@/models";

//Provider for the list of users
type UseListUsersProvider = {
    users: PlainUserModel[];
    load: () => void;
};

export const useListUsers = (): UseListUsersProvider => {
    const [users, setUsers] = useState<PlainUserModel[]>([]);

    const fetchUsers = (): void => {
        //console.log("fetching users: ", process.env.NEXT_PUBLIC_API_URL);
        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/users`)
            .then((data) => setUsers(data.data))
            .catch((err) => console.error(err));
    };
    return { users, load: fetchUsers };
};

type UserProviders = {
    useListUsers: () => UseListUsersProvider;
};

export const useUserProviders = (): UserProviders => ({
    useListUsers,
});

//Provider for a single user
type UseGetUserProvider = {
    user: PlainUserModel;
    load: (id: string) => void;
};

export const useGetUser = (): UseGetUserProvider => {
    const [user, setUser] = useState<PlainUserModel | undefined>(undefined);

    const fetchUser = (id: string): void => {
        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`)
            .then((data) => setUser(data.data))
            .catch((err) => console.error(err));
    };
    return { user: user || { id: "none", userName: "none", userLastName: "none" }, load: fetchUser };
};

type GetUserProvider = {
    useGetUser: () => UseGetUserProvider;
};

export const useGetUserProvider = (): GetUserProvider => ({
    useGetUser,
});

//Provider for creating a user
type UseCreateUserProvider = {
    user: UserModel;
    load: (user: UserModel) => void;
};

export const useCreateUser = (): UseCreateUserProvider => {
    const [user, setUser] = useState<UserModel>({
        id: "none",
        userName: "",
        userLastName: "",
    })

    const createUser = (user: UserModel): void => {
        console.log(user)
        axios
            .post(`${process.env.NEXT_PUBLIC_API_URL}/users`, user)
            .then((data) => setUser(data.data))
            .catch((err) => {
                console.error(err)
                throw err;
            });
        
    };
    return { user, load: createUser };
}

type CreateUserProvider = {
    useCreateUser: () => UseCreateUserProvider;
};

export const useCreateUserProvider = (): CreateUserProvider => ({
    useCreateUser,
});

//Provider for deleting a user

type UseDeleteUserProvider = {
    deleteUser: (id: string) => Promise<string>;
};

export const useDeleteUser = (): UseDeleteUserProvider => {
    const deleteUser = (id: string): Promise<string> => {
        return axios
            .delete(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`)
            .then((data) => {return(data.data)})
            .catch((err) => {
                console.error(err);
                return Promise.reject(err.message); 
            })
    }
    return { deleteUser };
}

type DeleteUserProvider = {
    useDeleteUser: () => UseDeleteUserProvider;
};

export const useDeleteUserProvider = (): DeleteUserProvider => ({
    useDeleteUser,
});

//Provider for updating a user
type UseUpdateUserProvider = {
    updateUser: (user: UserUpdateModel) => void;
};

export const useUpdateUser = (): UseUpdateUserProvider => {
    const [user, setUser] = useState<PlainUserModel>({
        id: "none",
        userName: "",
        userLastName: "",
    })
    
    const updateUser = (user: UserUpdateModel): void => {
        console.log("Provider: ",user);
        axios
            .put(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}`, user)
            .then((data) => setUser(data.data))
            .catch((err) => {
                console.error(err)
                throw err;
            });
        
    };
    return { updateUser };
}

type UpdateUserProvider = {
    useUpdateUser: () => UseUpdateUserProvider;
};

export const useUpdateUserProvider = (): UpdateUserProvider => ({
    useUpdateUser,
});

//Provider for adding a friend to a user
type UseAddFriendProvider = {
    addFriend: (userId: string, friend: string) => void;
};

export const useAddFriend = (): UseAddFriendProvider => {
    const addFriend = (userId: string, friend: string): void => {
        axios
            .post(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/friends/${friend}`)
            .then((data) => console.log(data))
            .catch((err) => {
                console.error(err)
                throw err;
            });
        
    };
    return { addFriend };
}

type AddFriendProvider = {
    useAddFriend: () => UseAddFriendProvider;
};

export const useAddFriendProvider = (): AddFriendProvider => ({
    useAddFriend,
});

//Provider for deleting a friend from a user
type UseDeleteFriendProvider = {
    deleteFriend: (userId: string, friend: string) => void;
};

export const useDeleteFriend = (): UseDeleteFriendProvider => {
    const deleteFriend = (userId: string, friend: string): void => {
        axios
            .delete(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/friends/${friend}`)
            .then((data) => console.log(data))
            .catch((err) => {
                console.error(err)
                throw err;
            });
        
    };
    return { deleteFriend };
}

type DeleteFriendProvider = {
    useDeleteFriend: () => UseDeleteFriendProvider;
};

export const useDeleteFriendProvider = (): DeleteFriendProvider => ({
    useDeleteFriend,
});

//Provider for deleting a favorite genre to a user

type UseDeleteFavoriteGenreProvider = {
    deleteFavoriteGenre: (userId: string, genreId: string) => void;
};

export const useDeleteFavoriteGenre = (): UseDeleteFavoriteGenreProvider => {
    const deleteFavoriteGenre = (userId: string, genreId: string): void => {
        axios
            .delete(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/favoriteGenres/${genreId}`)
            .then((data) => console.log(data))
            .catch((err) => {
                console.error(err)
                throw err;
            });
        
    };
    return { deleteFavoriteGenre };
}

type DeleteFavoriteGenreProvider = {
    useDeleteFavoriteGenre: () => UseDeleteFavoriteGenreProvider;
};

export const useDeleteFavoriteGenreProvider = (): DeleteFavoriteGenreProvider => ({
    useDeleteFavoriteGenre,
});

