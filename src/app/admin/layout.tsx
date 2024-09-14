import { verifySession } from "@/auth/verifySession";
import AccessDenied from "@/ClientComponents/auth/AccessDenied";
import LinkMui from "@/ClientComponents/UI/LinkMui";
import { mdiMathNorm } from "@mdi/js";
import Icon from "@mdi/react";

import { Box, Breadcrumbs, Button, Paper, Stack } from "@mui/material";
import { AppProvider } from "@toolpad/core/nextjs";
import { Metadata } from "next";

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
        href: "/admin/backup",
        label: "DB",
    },
    {
        href: "/admin/compare",
        label: "Сервак",
    },
    {
        href: "/admin/players",
        label: "Игроки",
    },
];
export const metadata: Metadata = {
    title: "Админка",
    description: "Панель администратора",
    icons: "public/icon_admin.ico",
};

const AdminLayout: React.FC<ContainerLayoutProps> = async ({
    children,
    view,
}) => {
    const { isAuth } = await verifySession();

    return (
        <Paper>
            {isAuth ? (
                <Stack direction={{ sm: "column" }} m={1} gap={1}>
                    <Breadcrumbs
                        separator={<Icon path={mdiMathNorm} size={1} />}
                        maxItems={3}
                    >
                        {links.map((link) => (
                            <Button
                                variant="outlined"
                                color="primary"
                                size={"small"}
                                key={link.href}
                            >
                                <LinkMui
                                    key={link.href}
                                    href={link.href}
                                    underline="hover"
                                    fontSize={"1rem"}
                                >
                                    {link.label}
                                </LinkMui>
                            </Button>
                        ))}
                    </Breadcrumbs>
                    {/* </List> */}
                    <Box>{children}</Box>
                    <Box>{view}</Box>
                </Stack>
            ) : (
                <AccessDenied />
            )}
        </Paper>
    );
};

export default AdminLayout;
