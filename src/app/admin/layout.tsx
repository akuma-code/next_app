import LinkMui from "@/ClientComponents/UI/LinkMui";
import { NavLink } from "@/ClientComponents/UI/NavLink";
import { Box, List, ListItem, ListItemButton, Paper, Stack } from "@mui/material";
import { Metadata } from "next";
import Link from "next/link";

interface ContainerLayoutProps {
    children: React.ReactNode
}

const links = [
    {
        href: "/admin/users",
        label: "Пользователи",
    },
    {
        href: "/admin/players",
        label: "Игроки",
    },

    {
        href: "/admin/backup",
        label: "Backup",
    },

]
export const metadata: Metadata = {
    title: "Админка",
    description: "Панель администратора",
    icons: "icon.ico"

};

const AdminLayout: React.FC<ContainerLayoutProps> = ({ children }) => {
    return (
        <Stack direction={ { md: 'row', sm: "column" } } m={ 1 }>

            <Paper >
                <List sx={ {
                    display: 'flex',
                    flexDirection: { sm: "row", md: 'column' },
                    bgcolor: 'background.default',
                    justifyContent: 'space-between',
                    p: 1
                    // justifyItems: 'center'
                } }>
                    { links.map(link =>

                        <NavLink key={ link.href }
                            href={ link.href }
                            label={ link.label }
                        // className="text-center flex-grow"
                        >
                            <ListItem disableGutters sx={ { flexGrow: 1, textAlign: 'center' } } divider>
                                { link.label }
                            </ListItem>
                        </NavLink>
                    ) }
                </List>
            </Paper>
            <Box>

                { children }
            </Box>
        </Stack>
    );
}

export default AdminLayout;

