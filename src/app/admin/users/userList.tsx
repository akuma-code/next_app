'use client'
import ProfileMenuButton from "@/ClientComponents/UI/MenuIconButton";
import UsersMRT from "@/ClientComponents/UserTable/UsersMRT";
import { getAllUsers } from "@/Services/userService"
import { UserAuthPayload } from "@/auth/auth"
import { Settings } from "@mui/icons-material";
import { Avatar, Box, Grid, IconButton, Link, List, ListItem, ListItemButton, ListItemText, MenuItem, Paper, Stack } from "@mui/material"
import { UserRole } from "@prisma/client";

export type DTO_User = {
    id: number;
    email: string;
    role?: UserRole;
    password?: string | null
    profile: {
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
