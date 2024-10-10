"use client";
import { CssBaseline, PaletteMode, useMediaQuery } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

import { akuTheme } from "@/Models/Theme/akuma.theme";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ruRU } from "@mui/x-date-pickers/locales";
import { QueryFunction } from "@tanstack/react-query";
import { NavigationItem, NavigationPageItem } from "@toolpad/core";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import weekday from "dayjs/plugin/weekday";
import { SessionProvider, useSession } from "next-auth/react";
import React, { useMemo, useState } from "react";
import { getDesignTokens } from "../theme";
dayjs.extend(weekday);

//*!________________________

type ExtendedNavigatePage = { visible?: boolean } & NavigationPageItem;
export type ExtendedNavigate = (NavigationItem | ExtendedNavigatePage)[];
const ROUTES: ExtendedNavigate = [
    // { kind: "header", title: "Stats" },
    {
        title: "Тренировки",
        kind: "header",
    },
    { title: "Расписание", segment: "events", kind: "page" },
    { title: "Игроки", segment: "players", kind: "page" },
    { kind: "divider" },
    { segment: "charts", title: "Статистика", kind: "page" },
    { kind: "divider" },

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
// const T = createTheme({ ...getDesignTokens("light") }, ruRU);

const locale = ruRU.components.MuiLocalizationProvider.defaultProps.localeText;
export default function Providers({ children }: { children: React.ReactNode }) {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: light)");
    // const { device, isMobile, isDesktop } = useMediaDetect();
    const savedmode: PaletteMode = prefersDarkMode ? "dark" : "light";

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

    const THEME = useMemo(
        () =>
            createTheme(
                {
                    ...getDesignTokens(mode),
                    cssVariables: {
                        colorSchemeSelector: "data-toolpad-color-scheme",
                    },
                },

                ruRU
            ),
        [mode]
    );
    return (
        // <SessionProvider session={session.data} refetchOnWindowFocus>
        <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="ru"
            localeText={locale}
        >
            <AppRouterCacheProvider>
                <ColorModeContext.Provider value={colorMode}>
                    <ThemeProvider theme={akuTheme}>
                        {/* <ProviderToolbar> */}
                        <CssBaseline enableColorScheme />
                        {children}
                        {/* </ProviderToolbar> */}
                    </ThemeProvider>
                </ColorModeContext.Provider>
            </AppRouterCacheProvider>
        </LocalizationProvider>
        // </SessionProvider>
    );
}
