"use client";

import { ExitButton } from "@/ClientComponents/UI/ExitButton";
import LinkMui from "@/ClientComponents/UI/LinkMui";
import LoadSpinner from "@/ClientComponents/UI/Loader/LoadSpinner";
import { NavMenu } from "@/ClientComponents/UI/NavMenu";
import useMediaDetect from "@/Hooks/useMediaDetect";
import { useToggle } from "@/Hooks/useToggle";
import {
    mdiMicrosoftXboxControllerMenu,
    mdiTrainCar,
    mdiTableTennis,
    mdiPassport,
    mdiApplicationImport,
} from "@mdi/js";
import Icon from "@mdi/react";
import {
    AppBar,
    Toolbar,
    Breadcrumbs,
    Typography,
    Box,
    Menu,
    MenuItem,
    IconButton,
    Button,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
} from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Suspense, useState } from "react";

const routes = [
    {
        to: "/avangard/events",
        text: "Тренировки",
        path: mdiTableTennis,
    },
    {
        to: "/admin",
        text: "Админка",
        path: mdiPassport,
    },
    {
        to: "/avangard",
        text: "Сводка",
        path: mdiApplicationImport,
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

            <Drawer anchor={"left"} open={show} onClose={handleClose}>
                <List>
                    {routes.map((r) => (
                        <ListItem key={r.to} divider>
                            <Link href={r.to}>
                                <ListItemIcon>
                                    <Icon path={r.path} size={1} />
                                </ListItemIcon>
                                {r.text}
                            </Link>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box
                gap={1}
                display={"flex"}
                flexGrow={1}
                justifyContent={"space-between"}
            >
                <NavMenu />
                {session.status === "authenticated" && <ExitButton />}
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
