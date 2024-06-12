import { getAllUsers } from "@/Services/userService";
import { Avatar, Box, Button, IconButton, List, ListItem, ListItemText } from "@mui/material";
import Link from "next/link";

async function UsersPage() {
    const allUsers = await getAllUsers()

    return (
        <Box>
            Users Page, total users: { allUsers.length }
            <List>
                {
                    allUsers.map(u =>

                        <ListItem key={ u.id }>
                            <ListItemText
                                primary={ u.email }
                                secondary={ `id: ${u.id}, role: ${u.role}` }
                            />
                            <IconButton
                                title="Profile"
                                LinkComponent={ Link }
                                href={ `/admin/users/profile/${u.id}` }
                            ><Avatar /></IconButton>
                        </ListItem>
                    )
                }
            </List>
        </Box>
    )
}




export default UsersPage