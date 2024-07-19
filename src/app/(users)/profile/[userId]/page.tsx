import { UserProfileView } from "@/ClientComponents/MRT/Profile/UserProfileView";
import { getUser } from "@/Services/userService";
import { Box, Stack } from "@mui/material";

async function UserProfilePage(params: { params: { userId: string } }) {
    const { userId } = params.params
    const user = await getUser({ id: Number(userId) }, { withPass: true })
    // console.table(user)
    // if (!user) return null
    return (
        <Box component={ Stack } direction={ 'column' }>

            { user ? <UserProfileView user={ user } /> : <Box>User not found</Box> }
        </Box>
    )
}


export default UserProfilePage