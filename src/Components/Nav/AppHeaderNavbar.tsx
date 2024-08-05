import LoadSpinner from "@/app/avangard/loading";
import { auth } from "@/auth/auth";
import { ExitButton } from "@/ClientComponents/UI/ExitButton";
import LinkMui from "@/ClientComponents/UI/LinkMui";
import { NavMenu } from "@/ClientComponents/UI/NavMenu";
import { paths } from "@/paths";
import {
    AppBar,
    Box,
    Breadcrumbs,
    CircularProgress,
    Toolbar,
    Typography,
} from "@mui/material";
import Link from "next/link";
import React, { Suspense } from "react";

interface AppHeaderProps {}
const { apiUrl, pageUrl } = paths;
const isProduction = process.env.NODE_ENV === "production";
const routes = [
    {
        to: "/avangard",
        text: "Авангард",
    },
    {
        to: "/avangard/events",
        text: "Тренировки",
    },
    {
        to: pageUrl.admin,
        text: "Админка",
    },
];

export const AppHeader: React.FC = async () => {
    const session = await auth();

    return (
        <AppBar
            position="static"
            color={"primary"}
            elevation={4}
            sx={{ mb: 1 }}
        >
            <Toolbar variant="regular" sx={{ display: "flex" }}>
                <Breadcrumbs
                    separator={"/"}
                    sx={{ color: "white", flexGrow: 2 }}
                >
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
                    {isProduction ? null : (
                        <Link href="/test">
                            <Typography variant="body2" color={"whitesmoke"}>
                                Testing
                            </Typography>
                        </Link>
                    )}
                </Breadcrumbs>
                <Suspense
                    fallback={
                        <LoadSpinner text="" iconColor="#be5b09" size={1} />
                    }
                >
                    <Box
                        gap={1}
                        display={"flex"}
                        flexGrow={1}
                        justifyContent={"end"}
                    >
                        <NavMenu />
                        {session ? (
                            <ExitButton />
                        ) : (
                            <LinkMui href="/api/auth/login" color="#00ffaa">
                                Войти
                            </LinkMui>
                        )}
                    </Box>
                </Suspense>
            </Toolbar>
        </AppBar>
    );
};

AppHeader.displayName = "_________HEADER";
