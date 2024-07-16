"use client";

// import { auth } from "@/auth/auth"
import { ListItemText, MenuItem } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import MenuIconButton from "./MenuIconButton";

import { ColorModeContext } from "@/app/providers";
import { mdiCog, mdiCookieCogOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { usePathname } from "next/navigation";
import { useContext, useState } from "react";
import LinkMui from "./LinkMui";
type AuthAState = {
    user?: { id: number; name: string } | null;
    user_id?: number | null;
    status: "authenticated" | "loading" | "unauthenticated";
};

const lang = {
    authenticated: "в системе!",
    loading: "Загрузка...",
    unauthenticated: "Не авторизован",
};
export const NavMenu = ({ user_id }: { user_id?: number | null }) => {
    const { data, status } = useSession();
    const { toggleColorMode } = useContext(ColorModeContext);
    // const [authState, setAuth] = useState<AuthAState>({
    //     user: null,
    //     user_id: null,
    //     status: "unauthenticated",
    // });
    // const pathname = usePathname();
    // const session = auth()

    const updateState = (state: "login" | "logout") => {
        switch (state) {
            case "login": {
                // setAuth((prev) => ({
                //     ...prev,
                //     status: "authenticated",
                //     user_id: data?.user_id,
                // }));
                break;
            }
            case "logout": {
                signOut({ redirect: true, callbackUrl: "/" });
                // setAuth((prev) => ({
                //     ...prev,
                //     status: "unauthenticated",
                //     user_id: null,
                // }));
                break;
            }
            default:
                // setAuth((prev) => ({ ...prev, status }));
                break;
        }

        // console.table(authState);
    };

    return (
        <MenuIconButton
            icon={<Icon path={mdiCog} size={1} />}
            title="Settings"
            avatar_bg={user_id ? "primary.dark" : "#890ac4"}
            asButton
        >
            <MenuItem divider disabled>
                {user_id ? data?.user.email : "Не авторизован!"}
            </MenuItem>
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
                <MenuItem divider onClick={() => updateState("login")}>
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
        </MenuIconButton>
    );
};
