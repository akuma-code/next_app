import { getAllUsers } from "@/Services/userService";
import { Box, Paper, Stack } from "@mui/material";
import { UserList } from "./UserList";


async function UsersPage() {
    const allUsers = await getAllUsers({ select: ['id', 'email', "role", 'password'] }
        // { select: ['email', 'role', 'password', "id"] }

    )

    return (
        <Box component={ Paper }>
            <Stack direction={ 'column' } gap={ 2 }>
                <UserList users={ allUsers } />
            </Stack>
        </Box>
    )
}




export default UsersPage