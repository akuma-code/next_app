import { verifySession } from "@/auth/verifySession";
import AccessDenied from "@/ClientComponents/auth/AccessDenied";
import LinkMui from "@/ClientComponents/UI/LinkMui";
import { NavLink } from "@/ClientComponents/UI/NavLink";
import {
    Box,
    List,
    ListItem,
    ListItemButton,
    Paper,
    Stack,
} from "@mui/material";
import { Metadata } from "next";
import Link from "next/link";

interface ContainerLayoutProps {
    children: React.ReactNode;
    view: React.ReactNode;
}

const links = [
    {
        href: "/admin",
        label: "Админка",
    },
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
        label: "ДБ",
    },
    {
        href: "/admin/compare",
        label: "Local<->Server",
    },
];
export const metadata: Metadata = {
    title: "Админка",
    description: "Панель администратора",
    icons: "/icon_admin.ico",
};

const AdminLayout: React.FC<ContainerLayoutProps> = async ({
    children,
    view,
}) => {
    const { isAuth } = await verifySession();

    return (
        <Stack direction={{ sm: "column" }} m={1}>
            <Paper>
                <List
                    sx={{
                        display: "flex",
                        flexDirection: { sm: "row" },
                        bgcolor: "background.default",
                        justifyContent: "start",
                        p: 1,
                        // justifyItems: 'center'
                    }}
                    dense
                >
                    {links.map((link) => (
                        <NavLink
                            key={link.href}
                            href={link.href}
                            label={link.label}
                            // className="text-center flex-grow"
                        >
                            <ListItem
                                disableGutters
                                sx={{ flexGrow: 1, textAlign: "center" }}
                                divider
                                dense
                            >
                                {link.label}
                            </ListItem>
                        </NavLink>
                    ))}
                </List>
                {isAuth ? <Box>{children}</Box> : <AccessDenied />}
                <Box>{view}</Box>
            </Paper>
        </Stack>
    );
};

export default AdminLayout;
