'use client'
import UsersMRT from "@/ClientComponents/UserTable/UsersMRT";
import { getAllUsers } from "@/Services/userService"
import { UserAuthPayload } from "@/auth/auth"
import { Avatar, Box, IconButton, Link, List, ListItem, ListItemButton, ListItemText, Paper } from "@mui/material"
import { Prisma, User, UserRole } from "@prisma/client";

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
    // const users = await getAllUsers()
    return (
        <Paper elevation={ 2 } sx={ { p: 1 } }>
            <Box
            // maxWidth={ 600 }
            >

            </Box>
            <UsersMRT users={ users } />

        </Paper>
    )
}

export default UserList
