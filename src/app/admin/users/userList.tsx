'use client'
import UsersMRT from "@/ClientComponents/UserTable/UsersMRT";
import { Box, Paper } from "@mui/material";
import { UserRole } from "@prisma/client";

export type DTO_User = {
    id: number;
    email: string;
    role?: UserRole;
    password?: string | null
    profile?: {
        id: number;
        userId: number;
        name?: string | null

    } | null;
}


const UserList: React.FC<{ users: DTO_User[] }> = ({ users }) => {

    return (
        <Paper elevation={ 2 } sx={ { p: 1 } }>

            <UsersMRT users={ users } />

        </Paper>
    )
}

export default UserList
