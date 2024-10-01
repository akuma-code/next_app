import UsersMRT from "@/ClientComponents/UserTable/UsersMRT";
import { getUsers } from "@/Services/userService";
import { Box, Paper, Stack } from "@mui/material";

async function UsersPage() {
    const allUsers = await getUsers();

    return (
        <Box component={Paper}>
            <Stack direction={"column"} gap={2}>
                {/* <UserList users={ allUsers } /> */}
                <UsersMRT users={allUsers} />
            </Stack>
        </Box>
    );
}

export default UsersPage;
