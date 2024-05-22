import React from 'react';
import { Paper } from '@mui/material';


export async function UserList({ users }: { users?: UserListItemProps[]; }) {



    return (
        <Paper elevation={ 1 } sx={ { p: 2 } }>

            <ol className=''>
                { users && users.length > 0 ?
                    users.map((user, idx) => <li key={ user.nickname }
                        className='flex-row justify-between list-decimal list-outside flex'>
                        <UserListItem { ...user } idx={ idx + 1 } />
                    </li>

                    )
                    :
                    <li>No users found</li> }
            </ol>
        </Paper>
    );
}
export type UserListItemProps = {
    nickname: string
    role: string
    idx?: number
}
export const UserListItem = ({ idx, nickname, role }: UserListItemProps) => {
    return (
        <>
            <span>
                {
                    idx &&
                    <span>{ idx }.  </span>
                }
                <em >{ nickname }</em>
            </span>

            <code className='uppercase'>{ role }</code>
        </>
    )
}