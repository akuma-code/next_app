import { getAllUsers } from "@/Services/userService";
import { Avatar, Box, Button, IconButton, List, ListItem, ListItemText, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";
import UserList from "./UserList";


async function UsersPage() {
    const allUsers = await getAllUsers({ select: ['id', 'email', "role", 'password', 'profile'] }
        // { select: ['email', 'role', 'password', "id"] }

    )

    return (
        <Box component={ Paper }>
            <Stack direction={ 'column' } gap={ 2 }>
                { allUsers && <UserList users={ allUsers } /> }
            </Stack>
        </Box>
    )
}




export default UsersPage