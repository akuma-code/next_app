import { auth } from "@/auth/auth";
import { ToggleThemeColorButton } from "@/ClientComponents/ToggleThemeButton";
import { ExitButton } from "@/ClientComponents/UI/ExitButton";
import LinkMui from "@/ClientComponents/UI/LinkMui";
import { NavMenu } from "@/ClientComponents/UI/NavMenu";
import { _log } from "@/Helpers/helpersFns";
import { paths } from "@/paths";
import { getOneUserByEmail } from "@/Services/userService";
import {
    AppBar,
    Breadcrumbs,
    CircularProgress,
    Toolbar,
    Typography,
} from "@mui/material";
import Link from "next/link";
import React, { Suspense } from "react";

interface AppHeaderProps {}
const { apiUrl, pageUrl } = paths;

const routes = [
    {
        to: "/avangard/events",
        text: "Авангард",
    },
    {
        to: pageUrl.admin,
        text: "Админка",
    },
    {
        to: "/test",
        text: "TestingPage",
    },
];

export async function AppHeader() {
    const session = await auth();

    return (
        <AppBar
            position="static"
            color={"primary"}
            elevation={4}
            sx={{ mb: 1 }}
        >
            <Toolbar variant="dense" sx={{ display: "flex" }}>
                <Breadcrumbs
                    separator={"/"}
                    sx={{ color: "white", flexGrow: 1 }}
                >
                    {routes.map((r) => (
                        <Link href={r.to} key={r.to}>
                            <Typography
                                variant="body1"
                                color={"whitesmoke"}
                                key={r.to}
                            >
                                {r.text}
                            </Typography>
                        </Link>
                    ))}
                </Breadcrumbs>
                <Suspense fallback={<CircularProgress />}>
                    <Breadcrumbs
                        separator={"/"}
                        sx={{ color: "white", flexGrow: 0 }}
                    >
                        <NavMenu user_id={session?.user_id} />
                        <LinkMui href="/api/auth/register" color="#fff">
                            Регистрация
                        </LinkMui>
                        {session?.user ? (
                        

                            <ExitButton />
                        ) : (
                            <LinkMui href="/api/auth/login" color="#00ffaa">
                                Вход
                            </LinkMui>
                        )}
                    </Breadcrumbs>
                </Suspense>
            </Toolbar>
        </AppBar>
    );
}
