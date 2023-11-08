'use client';
import { FC, ReactElement, useEffect, useState } from 'react';
import { useUserProviders, useGetUserProvider, useCreateUserProvider, useDeleteUserProvider} from '@/hooks';

const UsersPage: FC = (): ReactElement => {

const { useListUsers } = useUserProviders();
const { users, load: loadUsers} = useListUsers();

const { useGetUser } = useGetUserProvider();
const { user, load: loadUser} = useGetUser();

const { useCreateUser } = useCreateUserProvider();
const { user: newUser, load: addUser } = useCreateUser();

const { useDeleteUser } = useDeleteUserProvider();
const { deleteUser } = useDeleteUser();
const Thomas = {
    userName: "Thomas",
    userLastName: "Vigneron",
    id: "none",
};
useEffect(() => {
    loadUsers();
}, []);


return <>
    <div>
        <div className="flex -mx-4">
            {users.map((user) =>
            <div className="px-6 pt-4 pb-2" key={user.userName}>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{user.userName}{user.userLastName}</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"> Id:{user.id}</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    Friends: {user.friends ? user.friends.map((friend) => 
                    <span key={friend}>
                        <p>{friend}</p>
                    </span>
                    ): 'No friends'}
                </span>
            </div>
            )}
        </div>
        <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={loadUsers}>Refresh</button>
        </div>
        <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={() => loadUser("1")}>Show user 1</button>
        </div>
        <div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={() => addUser(Thomas)}>Add Thomas</button>
        </div>
        <div>
        <button className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={() => deleteUser("2")}>Delete Thib</button>
        </div>
    </div>
</>;

};
export default UsersPage;
