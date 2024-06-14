'use client'
<<<<<<< HEAD
<<<<<<< HEAD
import UsersMRT from "@/ClientComponents/UserTable/UsersMRT";
import { Box, Paper } from "@mui/material";
=======
import { getAllUsers } from "@/Services/userService"
import { UserAuthPayload } from "@/auth/auth"
import { Avatar, IconButton, Link, List, ListItem, ListItemButton, ListItemText, Paper } from "@mui/material"
>>>>>>> 397e0a5 (userlist)
=======
import UsersMRT from "@/ClientComponents/UserTable/UsersMRT";
import { Box, Paper } from "@mui/material";
>>>>>>> 298ba52 (custom signin page)
import { UserRole } from "@prisma/client";

export type DTO_User = {
    id: number;
    email: string;
<<<<<<< HEAD
    role?: UserRole;
    password?: string | null
    profile?: {
        id: number;
        userId: number;
        name?: string | null

=======
    role?: UserRole;
    profile?: {
        id: number;
        userId: number;
>>>>>>> 397e0a5 (userlist)
    } | null;
}


<<<<<<< HEAD
const UserList: React.FC<{ users: DTO_User[] }> = ({ users }) => {
    // const users = await getAllUsers()
    return (
        <Paper elevation={ 2 } sx={ { p: 1 } }>
            <Box
            // maxWidth={ 600 }
            >

            </Box>
            <UsersMRT users={ users } />

=======
const UserList: React.FC<{ users: DTO_User[] }> = async ({ users }) => {
    // const users = await getAllUsers()
    return (
            <Paper elevation={ 2 } sx={ { p: 1 } }>


                <List sx={ {
                    border: '2px solid',
                    borderColor: (theme) => theme.palette.primary.main,
                    bgcolor: 'InfoBackground'

                } } >
                    {
                        users.map(u =>

                            <ListItem key={ u.id } alignItems="center" divider>

                                <ListItemButton
                                    color="warning.dark"
                                    title="открыть профиль"
                                    LinkComponent={ Link }
                                    href={ `/admin/users/profile/${u.id}` }>
                                    <ListItemText
                                        primary={ u.email }
                                    // secondary={ `id: ${u.id}, role: ${u.role}` }
                                    />

                                </ListItemButton>
                            </ListItem>
                        )
                    }
                </List>
>>>>>>> 397e0a5 (userlist)
            </Paper>
            )
}

            export default UserList
