import { getAllUsers } from "@/Services/userService";
import { Avatar, Box, Button, IconButton, List, ListItem, ListItemText, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";
import UserList from "./userList";

async function UsersPage() {
    const allUsers = await getAllUsers({ pass: true })

    return (
        <Box component={ Paper }>
            <Stack direction={ 'column' } gap={ 2 }>
                <UserList users={ allUsers } />
            </Stack>
        </Box>
    )
}




export default UsersPage