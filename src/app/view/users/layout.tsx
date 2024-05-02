import { Box, Divider, Stack } from "@mui/material";
import prisma from "../../../../prisma/client/client";
import { UserList } from "./UserList";


interface UserLayoutProps {
    children: React.ReactNode
}

const UserLayout: React.FC<UserLayoutProps> = async ({ children }) => {
    const users = await getAllUsers()

    return (
        <Stack bgcolor={ 'lightgray' } px={ 2 }>

            {/* <Divider flexItem>Список пользователей ({ users.length })</Divider> */ }
            <LayoutHeader />

            { children }

        </Stack>
    );
}

function LayoutHeader() {
    return (
        <Box component={ Stack } flexDirection={ 'row' } borderBottom={ '2px solid black' } mb={ 2 } pb={ 1 } fontWeight={ 'bold' }>
            <Box flexGrow={ 1 } textAlign={ 'center' }>
                Список пользователей
            </Box>

        </Box>
    )
}
async function getAllUsers() {
    const users = await prisma.user.findMany()
    return users
}

async function getUserSession(userId: string) {
    const session = await prisma.userSession.findMany({ where: { userUuid: userId }, select: { user: true, id: true } })
    return session
}
export default UserLayout;

