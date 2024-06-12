'use client'
import { getAllUsers } from "@/Services/userService"
import { UserAuthPayload } from "@/auth/auth"
import { Avatar, IconButton, Link, List, ListItem, ListItemButton, ListItemText, Paper } from "@mui/material"
import { UserRole } from "@prisma/client";

export type DTO_User = {
    id: number;
    email: string;
    role?: UserRole;
    profile?: {
        id: number;
        userId: number;
    } | null;
}


const UserList: React.FC<{ users: DTO_User[] }> = async ({ users }) => {
    // const users = await getAllUsers()
    return (
        <Paper elevation={ 2 } sx={ { p: 1 } }>


            <List sx={ {
                border: '2px solid',
                borderColor: (theme) => theme.palette.primary.main,
                bgcolor: 'InfoBackground'

            } } >
                {
                    users.map(u =>

                        <ListItem key={ u.id } alignItems="center" divider>

                            <ListItemButton
                                color="warning.dark"
                                title="открыть профиль"
                                LinkComponent={ Link }
                                href={ `/admin/users/profile/${u.id}` }>
                                <ListItemText
                                    primary={ u.email }
                                // secondary={ `id: ${u.id}, role: ${u.role}` }
                                />

                            </ListItemButton>
                        </ListItem>
                    )
                }
            </List>
        </Paper>
    )
}

export default UserList
