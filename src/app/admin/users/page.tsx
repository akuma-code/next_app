import { getAllUsers } from "@/Services/userService";
import { Avatar, Box, Button, IconButton, List, ListItem, ListItemText, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";
import UserList from "./userList";

async function UsersPage() {
    const allUsers = await getAllUsers({ select: ['id', 'email', "role", 'password', 'profile',] }
        // { select: ['email', 'role', 'password', "id"] }
<<<<<<< HEAD
=======

    )
>>>>>>> 298ba52 (custom signin page)

<<<<<<< HEAD
    )

    return (
        <Box component={ Paper }>
            <Stack direction={ 'column' } gap={ 2 }>
=======
    return (
        <Box component={ Paper }>
            <Stack direction={ 'column' } gap={ 2 }>

                <Typography variant="body1">
                    Users Page
                </Typography>
                <Typography variant="body2">
                    total users: { allUsers.length }
                </Typography>
>>>>>>> 397e0a5 (userlist)
                <UserList users={ allUsers } />
            </Stack>
        </Box>
    )
}




export default UsersPage