"use client";
import useMediaDetect from "@/Hooks/useMediaDetect";
import { CssBaseline, PaletteMode, useMediaQuery } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ruRU } from "@mui/material/locale";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { QueryFunction } from "@tanstack/react-query";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import weekday from "dayjs/plugin/weekday";
import React, { useMemo, useState } from "react";
import { getDesignTokens } from "../theme";
import { AppProvider } from "@toolpad/core/nextjs";
import {
    Account,
    AuthenticationContext,
    SessionContext,
    Session,
    Router,
    Navigation,
    NavigationItem,
    NavigationPageItem,
} from "@toolpad/core";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Icon from "@mdi/react";
import { mdiSetAll } from "@mdi/js";
dayjs.extend(weekday);

//*!________________________

type ExtendedNavigatePage = { visible?: boolean } & NavigationPageItem;
type ExtendedNavigate = (NavigationItem | ExtendedNavigatePage)[];
const ROUTES: ExtendedNavigate = [
    { kind: "header", title: "Stats" },
    {
        segment: "avangard",
        title: "Авангард",
        kind: "page",
        visible: true,
        children: [
            { title: "Тренировки", segment: "events", kind: "page" },
            { title: "Игроки", segment: "players", kind: "page" },
        ],
    },
    {
        segment: "admin",
        title: "Админка",
        kind: "page",
        children: [
            {
                segment: "players",
                kind: "page",
                title: "Игроки",
            },
            {
                segment: "backup",
                kind: "page",
                title: "Бэкап",
            },
            {
                segment: "users",
                kind: "page",
                title: "Пользователи",
            },
            {
                segment: "compare",
                kind: "page",
                title: "БД на сервере",
            },
        ],
    },
];
export const queryFetch: QueryFunction = async ({ queryKey }) => {
    const fetch_url = queryKey[0];
    if (typeof fetch_url !== "string")
        return console.log("Fetch url error: ", fetch_url);
    const data = await fetch(fetch_url, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return data.json();
};

export const ColorModeContext = React.createContext({
    toggleColorMode: () => {},
});

export default function Providers({ children }: { children: React.ReactNode }) {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: light)");
    // const { device, isMobile, isDesktop } = useMediaDetect();
    const savedmode: PaletteMode = prefersDarkMode ? "dark" : "light";
    const session = useSession();
    const [mode, setMode] = useState<PaletteMode>(savedmode);
    const colorMode = React.useMemo(
        () => ({
            // The dark mode switch would invoke this method
            toggleColorMode: () => {
                setMode((prevMode: PaletteMode) => {
                    const new_color = prevMode === "light" ? "dark" : "light";
                    return new_color;
                });
            },
        }),
        []
    );
    const r = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    // const authentication = React.useMemo(() => {
    //     return {
    //         signIn: () => {
    //             return data;
    //         },
    //         signOut: () => {
    //             return null;
    //         },
    //     };
    // }, [data]);
    // const [pathname, setPathname] = React.useState("/");

    const router = useMemo<Router>(() => {
        // const sp = new URLSearchParams();
        return {
            pathname,
            searchParams,
            navigate: (path) => {
                return r.push(path.toString());
            },
        };
    }, [pathname, r, searchParams]);
    // (isMobile || isDesktop) && console.log({ device })
    const THEME = useMemo(
        () => createTheme({ ...getDesignTokens(mode) }, ruRU),
        [mode]
    );
    return (
        <ColorModeContext.Provider value={colorMode}>
            <AppRouterCacheProvider>
                <CssBaseline enableColorScheme />
                <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale="ru"
                >
                    {/* <AppProvider router={router} theme={THEME}>
                            <SessionContext.Provider value={data}>
                                <Account />
                            </SessionContext.Provider>
                        </AppProvider> */}
                    <AppProvider
                        session={session.data}
                        router={router}
                        theme={THEME}
                        authentication={{ signIn, signOut }}
                        navigation={ROUTES}
                        branding={{
                            title: "Авангард",
                            logo: (
                                <Icon
                                    path={mdiSetAll}
                                    size={1.4}
                                    color={"red"}
                                />
                            ),
                        }}
                    >
                        {/* <ThemeProvider theme={THEME}>
                            </ThemeProvider> */}
                        {children}
                    </AppProvider>
                </LocalizationProvider>
            </AppRouterCacheProvider>
        </ColorModeContext.Provider>
    );
}
