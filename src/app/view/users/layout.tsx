import { Box, Divider, Stack } from "@mui/material";
import prisma from "../../../../prisma/client/client";
import { UserList } from "./UserList";


interface UserLayoutProps {
    children: React.ReactNode
}

const UserLayout: React.FC<UserLayoutProps> = async ({ children }) => {
    const users = await getAllUsers()
    return (
        <Stack bgcolor={ 'lightgray' } maxWidth={ 400 } px={ 2 }>

            <Divider flexItem>Список пользователей ({ users.length })</Divider>
            <LayoutHeader />

            { children }

        </Stack>
    );
}

function LayoutHeader() {
    return (
        <Box component={ Stack } flexDirection={ 'row' } borderBottom={ '2px solid black' } mb={ 2 } pb={ 1 } fontWeight={ 'bold' }>
            <Box flexGrow={ 1 } >
                Имя
            </Box>
            {/* <Divider flexItem orientation="vertical" /> */ }
            <Box>
                Уровень доступа
            </Box>
        </Box>
    )
}
async function getAllUsers() {
    const users = await prisma.user.findMany()
    return users
}
export default UserLayout;

