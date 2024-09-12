"use client";

import { ExitButton } from "@/ClientComponents/UI/ExitButton";
import LinkMui from "@/ClientComponents/UI/LinkMui";
import { NavLink } from "@/ClientComponents/UI/NavLink";
import { NavMenu } from "@/ClientComponents/UI/NavMenu";
import useMediaDetect from "@/Hooks/useMediaDetect";
import { useToggle } from "@/Hooks/useToggle";
import {
    mdiApplicationImport,
    mdiMicrosoftXboxControllerMenu,
    mdiPassport,
    mdiTableTennis,
} from "@mdi/js";
import Icon from "@mdi/react";
import {
    AppBar,
    Box,
    Breadcrumbs,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    Toolbar,
    Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Suspense, useState } from "react";

const routes = [
    {
        to: "/avangard/events",
        text: "Авангард",
        path: mdiTableTennis,
    },
    {
        to: "/avangard",
        text: "Статистика",
        path: mdiApplicationImport,
    },
    {
        to: "/admin",
        text: "Управление",
        path: mdiPassport,
    },
];

export function NavigationBar() {
    const session = useSession();
    const { isMobile } = useMediaDetect();

    return (
        <AppBar
            position="static"
            color={"primary"}
            elevation={4}
            sx={{ mb: 1 }}
        >
            <Suspense fallback={<div>loading...</div>}>
                {isMobile ? <MobileBar /> : <PcBar />}
            </Suspense>
        </AppBar>
    );
}

function MobileBar() {
    const [show, cl] = useToggle();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const session = useSession();
    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        cl.on();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        cl.off();
        setAnchorEl(null);
    };
    const isOpen = Boolean(anchorEl);
    return (
        <Toolbar variant="regular" sx={{ display: "flex" }}>
            <IconButton onClick={handleOpen}>
                <Icon
                    path={mdiMicrosoftXboxControllerMenu}
                    size={1.5}
                    color="whitesmoke"
                />
            </IconButton>

            <Drawer
                anchor={"left"}
                open={show}
                onClose={handleClose}
                closeAfterTransition
            >
                <List>
                    {routes.map((r) => (
                        <ListItem
                            key={r.to}
                            divider
                            alignItems="center"
                            sx={{ gap: 2 }}
                        >
                            <NavLink href={r.to}>{r.text}</NavLink>
                            <ListItemIcon color="warning.main">
                                <Icon path={r.path} size={1} />
                            </ListItemIcon>
                        </ListItem>
                    ))}
                </List>
                {session.status === "authenticated" ? (
                    <ExitButton />
                ) : (
                    <>
                        <LinkMui href="/api/auth/login" color="#00ffaa">
                            Войти
                        </LinkMui>
                        <LinkMui href="/api/auth/register" color="#00ffaa">
                            Зарегестрироваться
                        </LinkMui>
                    </>
                )}
            </Drawer>
            <Box
                gap={1}
                display={"flex"}
                flexGrow={1}
                justifyContent={"space-between"}
            >
                <NavMenu />
            </Box>
        </Toolbar>
    );
}

function PcBar() {
    const session = useSession();

    return (
        <Toolbar variant="regular" sx={{ display: "flex" }}>
            <Breadcrumbs separator={"/"} sx={{ color: "white", flexGrow: 2 }}>
                {routes.map((r) => (
                    <Link href={r.to} key={r.to}>
                        <Typography
                            variant="body2"
                            color={"whitesmoke"}
                            key={r.to}
                        >
                            {r.text}
                        </Typography>
                    </Link>
                ))}
            </Breadcrumbs>
            <Box gap={1} display={"flex"} flexGrow={1} justifyContent={"end"}>
                <NavMenu />
                {session.status === "authenticated" ? (
                    <ExitButton />
                ) : (
                    <LinkMui href="/api/auth/login" color="#00ffaa">
                        Войти
                    </LinkMui>
                )}
            </Box>
        </Toolbar>
    );
}
