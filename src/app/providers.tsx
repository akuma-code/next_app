"use client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CssBaseline, PaletteMode, useMediaQuery } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
    QueryClientProvider,
    QueryFunction,
} from "@tanstack/react-query";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import weekday from "dayjs/plugin/weekday";
import React, { useMemo } from "react";
import { getDesignTokens } from "../theme";
import { ruRU } from "@mui/material/locale";
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

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                queryFn: queryFetch,
                // With SSR, we usually want to set some default staleTime
                // above 0 to avoid refetching immediately on the client
                staleTime: 60 * 1000,
            },
        },
    });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
    if (typeof window === "undefined") {
        // Server: always make a new query client
        return makeQueryClient();
    } else {
        // Browser: make a new query client if we don't already have one
        // This is very important so we don't re-make a new client if React
        // suspends during the initial render. This may not be needed if we
        // have a suspense boundary BELOW the creation of the query client
        if (!browserQueryClient) browserQueryClient = makeQueryClient();
        return browserQueryClient;
    }
}
export const ColorModeContext = React.createContext({
    toggleColorMode: () => {},
});

export default function Providers({ children }: { children: React.ReactNode }) {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: light)");
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

    // NOTE: Avoid useState when initializing the query client if you don't
    //       have a suspense boundary between this and the code that may
    //       suspend because React will throw away the client on the initial
    //       render if it suspends and there is no boundary
    const queryClient = getQueryClient();
    const THEME = useMemo(
        () => createTheme({ ...getDesignTokens(mode) }, ruRU),
        [mode]
    );
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={THEME}>
                <CssBaseline enableColorScheme />
                <AppRouterCacheProvider>
                    <QueryClientProvider client={queryClient}>
                        <HydrationBoundary state={dehydrate(queryClient)}>
                            <LocalizationProvider
                                dateAdapter={AdapterDayjs}
                                adapterLocale="ru"
                            >
                                {children}
                                <ReactQueryDevtools
                                    client={queryClient}
                                    initialIsOpen={false}
                                />
                            </LocalizationProvider>
                        </HydrationBoundary>
                    </QueryClientProvider>
                </AppRouterCacheProvider>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}
