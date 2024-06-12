import { getOneUser, getUser } from "@/Services/userService";
import { Box, Stack } from "@mui/material";

async function UserProfilePage(params: { params: { userId: string } }) {
    const { userId } = params.params
    const user = await getUser({ id: userId })
    console.table(user)
    return (
        <Box component={ Stack } direction={ 'column' }>

            User Id: { userId }
            User Email: { user?.email }

        </Box>
    )
}


export default UserProfilePage