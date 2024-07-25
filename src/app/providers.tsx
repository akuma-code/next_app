"use client";
import { CssBaseline, PaletteMode, useMediaQuery } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ruRU } from "@mui/material/locale";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
    QueryClient,
    QueryFunction
} from "@tanstack/react-query";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import weekday from "dayjs/plugin/weekday";
import React, { useMemo } from "react";
import { getDesignTokens } from "../theme";
import useMediaDetect from "@/Hooks/useMediaDetect";



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
    toggleColorMode: () => { },
});

export default function Providers({ children }: { children: React.ReactNode }) {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: light)");
    const { device, isMobile, isDesktop } = useMediaDetect()
    // console.log('prefersDarkMode: ', prefersDarkMode)
    const savedmode: PaletteMode = prefersDarkMode ? "dark" : "light";

    const [mode, setMode] = React.useState<PaletteMode>(savedmode);
    const colorMode = React.useMemo(
        () => ({
            // The dark mode switch would invoke this method
            toggleColorMode: () => {
                setMode((prevMode: PaletteMode) => {
                    const new_color = prevMode === "light" ? "dark" : "light";
                    // localStorage.setItem('colormode', new_color)
                    return new_color;
                });
            },
        }),
        []
    );

    // (isMobile || isDesktop) && console.log({ device })
    const THEME = useMemo(
        () => createTheme({ ...getDesignTokens(mode) }, ruRU),
        [mode]
    );
    return (
        <ColorModeContext.Provider value={ colorMode }>
            <AppRouterCacheProvider>

                <ThemeProvider theme={ THEME }>
                    <CssBaseline enableColorScheme />
                    <LocalizationProvider
                        dateAdapter={ AdapterDayjs }
                        adapterLocale="ru"
                    >
                        { children }

                    </LocalizationProvider>
                </ThemeProvider>

            </AppRouterCacheProvider>
        </ColorModeContext.Provider>
    );
}




// function makeQueryClient() {
//     return new QueryClient({
//         defaultOptions: {
//             queries: {
//                 queryFn: queryFetch,
//                 // With SSR, we usually want to set some default staleTime
//                 // above 0 to avoid refetching immediately on the client
//                 staleTime: 60 * 1000,
//             },
//         },
//     });
// }

// let browserQueryClient: QueryClient | undefined = undefined;

// export function getQueryClient() {
//     if (typeof window === "undefined") {
//         // Server: always make a new query client
//         return makeQueryClient();
//     } else {
//         // Browser: make a new query client if we don't already have one
//         // This is very important so we don't re-make a new client if React
//         // suspends during the initial render. This may not be needed if we
//         // have a suspense boundary BELOW the creation of the query client
//         if (!browserQueryClient) browserQueryClient = makeQueryClient();
//         return browserQueryClient;
//     }
// }