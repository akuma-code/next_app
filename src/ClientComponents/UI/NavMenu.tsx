"use client";
import React, { useState, useTransition } from "react";

import {
    Box,
    Button,
    IconButton,
    ListItemButton,
    ListItemText,
    Menu,
    MenuItem,
} from "@mui/material";
import { signOut, useSession } from "next-auth/react";

import { ColorModeContext } from "@/app/providers";
import { useToggle } from "@/Hooks/useToggle";
import { mdiAccountCogOutline, mdiCog, mdiCookieCogOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { useContext } from "react";
import LinkMui from "./LinkMui";

export const NavMenu = ({
    user_id,
    children,
}: {
    user_id?: number | null;
    children?: React.ReactNode;
}) => {
    const { data, status } = useSession();
    const { toggleColorMode } = useContext(ColorModeContext);
    const [open, { on, off }] = useToggle();
    const [p, start] = useTransition();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        on();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        off();
        setAnchorEl(null);
    };
    const _clear = () => start(async () => {});
    const isAuth = status === "authenticated";
    return (
        <Box>
            <IconButton
                onClick={handleOpen}
                // endIcon={ <Icon path={ mdiCog } size={ 1 } /> }
                color={isAuth ? "info" : "error"}
                size="small"
                title="Меню"
                // variant="contained"
                sx={{ border: "1px solid", p: 1 }}
            >
                <Icon path={mdiAccountCogOutline} size={1} />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "left", vertical: "top" }}
                sx={{
                    ["& .MuiMenuItem-root"]: {
                        display: "block",
                    },
                }}
            >
                <MenuItem divider>
                    <ListItemButton
                        LinkComponent={LinkMui}
                        href={"/api/auth/login"}
                    >
                        Авторизация
                    </ListItemButton>
                </MenuItem>
                {/* <MenuItem divider>
                    <ListItemButton
                        LinkComponent={LinkMui}
                        href={"/api/auth/register"}
                    >
                        Регистрация
                    </ListItemButton>
                </MenuItem> */}
                <MenuItem divider>
                    <ListItemButton onClick={() => signOut()}>
                        Выход
                    </ListItemButton>
                </MenuItem>

                {children}
            </Menu>
        </Box>
    );
};
