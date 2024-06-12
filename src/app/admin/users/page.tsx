import { getAllUsers } from "@/Services/userService";
import { Avatar, Box, Button, IconButton, List, ListItem, ListItemText, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";
import UserList from "./userList";

async function UsersPage() {
    const allUsers = await getAllUsers()

    return (
        <Box component={ Paper }>
            <Stack direction={ 'column' } gap={ 2 }>

                <Typography variant="body1">
                    Users Page
                </Typography>
                <Typography variant="body2">
                    total users: { allUsers.length }
                </Typography>
                <UserList users={ allUsers } />
            </Stack>
        </Box>
    )
}




export default UsersPage