import axios from "axios";
import { useState } from "react";
import { PlainUserModel, UserModel} from "@/models";

//Provider for the list of users
type UseListUsersProvider = {
    users: UserModel[];
    load: () => void;
};

export const useListUsers = (): UseListUsersProvider => {
    const [users, setUsers] = useState<UserModel[]>([]);

    const fetchUsers = (): void => {
        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/users`)
            .then((data) => {
                setUsers(data.data)
                console.log("User list: ", data.data)
            })
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
            .then((data) => {
                setUser(data.data)
                console.log("User: ", data.data)
            })
            .catch((err) => console.error(err));
    };
    return { user: user || { id: "none", username: "none" }, load: fetchUser };
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
        username: "",
    })

    const createUser = (user: UserModel): void => {
        console.log(user)
        axios
            .post(`${process.env.NEXT_PUBLIC_API_URL}/users`, user)
            .then((data) => {
                setUser(data.data)
                console.log("User: ", data.data)
                console.log("user sent: ", user, "type: ", typeof(user))
            })
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