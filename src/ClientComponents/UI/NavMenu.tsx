"use client";
import React, { useState, useTransition } from "react";

import { Box, Button, ListItemText, Menu, MenuItem } from "@mui/material";
import { useSession } from "next-auth/react";

import { ColorModeContext } from "@/app/providers";
import { useToggle } from "@/Hooks/useToggle";
import { mdiCog, mdiCookieCogOutline } from "@mdi/js";
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
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [p, start] = useTransition();
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
            <Button
                onClick={handleOpen}
                // endIcon={ <Icon path={ mdiCog } size={ 1 } /> }
                color={isAuth ? "warning" : "error"}
                size="small"
                variant="contained"
                sx={{ bgcolor: "primary.dark", color: "primary.contrastText" }}
            >
                <Icon path={mdiCog} size={1} />
            </Button>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem
                    onClick={toggleColorMode}
                    sx={{ display: "flex", gap: 2 }}
                    divider
                >
                    <ListItemText primary={"Тема"} />
                    <Icon path={mdiCookieCogOutline} size={1} />
                </MenuItem>

                {user_id ? (
                    <MenuItem divider>
                        <LinkMui color="primary" href={`/profile/${user_id}`}>
                            Профиль
                        </LinkMui>
                    </MenuItem>
                ) : (
                    <MenuItem divider>
                        <LinkMui href={"/api/auth/login"}>Авторизация</LinkMui>
                    </MenuItem>
                )}
                {!user_id && (
                    <MenuItem divider>
                        <LinkMui color="secondary" href={"/api/auth/register"}>
                            Регистрация
                        </LinkMui>
                    </MenuItem>
                )}
                {children}
            </Menu>
        </Box>
    );
};
