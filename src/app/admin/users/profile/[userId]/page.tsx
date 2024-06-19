import { UserProfileView } from "@/ClientComponents/MRT/Profile/UserProfileView";
import { getOneUser, getUser } from "@/Services/userService";
import { Box, Stack } from "@mui/material";

async function UserProfilePage(params: { params: { userId: string } }) {
    const { userId } = params.params
    const user = await getUser({ id: +userId }, { withPass: true })
    // console.table(user)
    return (
        <Box component={ Stack } direction={ 'column' }>

            { user && <UserProfileView user={ user } /> }
        </Box>
    )
}


export default UserProfilePage