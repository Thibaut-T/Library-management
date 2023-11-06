'use client';
import { FC, ReactElement, useEffect, useState } from 'react';
import { useUserProviders } from '@/hooks';

const UsersPage: FC = (): ReactElement => {

const { useListUsers } = useUserProviders();
const { users, load: loadUsers} = useListUsers();

useEffect(() => {
    loadUsers();
}, []);

return <>
    <div className="flex -mx-4">
        {users.map((user) =>
        <div className="px-6 pt-4 pb-2" key={user.username}>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{user.username}</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"> Id:{user.id}</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                Friends: {user.friends.map((friend) => 
                <span key={friend}>
                    <p>{friend}</p>
                </span>
                )}
            </span>
        </div>
        )}
    </div>
</>;

};
export default UsersPage;
