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
import { AppProvider, Router } from "@toolpad/core/AppProvider";
import {
    Account,
    AuthenticationContext,
    SessionContext,
    Session,
} from "@toolpad/core";
import { signIn, signOut, useSession } from "next-auth/react";
dayjs.extend(weekday);
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
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    // const { device, isMobile, isDesktop } = useMediaDetect();
    const savedmode: PaletteMode = prefersDarkMode ? "dark" : "light";
    const { data } = useSession();
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
    const authentication = React.useMemo(() => {
        return {
            signIn: () => {
                return data;
            },
            signOut: () => {
                return null;
            },
        };
    }, [data]);
    const [pathname, setPathname] = React.useState("/");

    const router = React.useMemo<Router>(() => {
        return {
            pathname,
            searchParams: new URLSearchParams(),
            navigate: (path) => setPathname(String(path)),
        };
    }, [pathname]);
    // (isMobile || isDesktop) && console.log({ device })
    const THEME = useMemo(
        () => createTheme({ ...getDesignTokens(mode) }, ruRU),
        [mode]
    );
    return (
        <ColorModeContext.Provider value={colorMode}>
            <AppRouterCacheProvider>
                <ThemeProvider theme={THEME}>
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
                        {children}
                    </LocalizationProvider>
                </ThemeProvider>
            </AppRouterCacheProvider>
        </ColorModeContext.Provider>
    );
}
