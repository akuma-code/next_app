import LinkMui from "@/ClientComponents/UI/LinkMui";
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
        <Stack direction={ 'row' } gap={ 2 }>

            <List>
                <Paper>
                    { links.map(link =>

                        <ListItem key={ link.href }>
                            <ListItemButton LinkComponent={ Link }
                                href={ link.href + '/' }
                            >
                                { link.label }
                            </ListItemButton>
                        </ListItem>
                    ) }
                </Paper>
            </List>
            <Box>

                { children }
            </Box>
        </Stack>
    );
}

export default AdminLayout;

