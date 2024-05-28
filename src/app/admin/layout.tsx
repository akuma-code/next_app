import { Box, List, ListItem, ListItemButton, Paper, Stack } from "@mui/material";

interface ContainerLayoutProps {
    children: React.ReactNode
}

const links = [
    {
        href: "/admin/players",
        label: "Игроки",
    },
    {
        href: "/admin/backup",
        label: "Backup",
    },
]


const AdminLayout: React.FC<ContainerLayoutProps> = ({ children }) => {
    return (
        <Stack direction={ 'row' } gap={ 2 }>

            <List>
                <Paper>
                    { links.map(link =>

                        <ListItem key={ link.href }>
                            <ListItemButton
                                href={ link.href }
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

