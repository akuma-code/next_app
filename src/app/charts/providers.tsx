"use client";
import { getDesignTokens } from "@/theme";
import { Button, createTheme, PaletteMode, useMediaQuery } from "@mui/material";
import { ruRU } from "@mui/material/locale";
import {
    AppProvider,
    AuthenticationContext,
    Navigation,
    Router,
    Session,
    SessionContext,
} from "@toolpad/core/AppProvider";
import { useMemo, useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import { EventAvailable } from "@mui/icons-material";
import { PageContainer, PageContainerToolbar, Account } from "@toolpad/core";
import { signIn, signOut, useSession } from "next-auth/react";
const NAVIGATION: Navigation = [
    {
        kind: "header",
        title: "Main items",
    },
    {
        segment: "charts",
        title: "Графики",
        icon: <BarChartIcon />,
    },
    {
        segment: "charts/events",
        title: "Events",
        icon: <DashboardIcon />,
    },
    {
        segment: "charts/players",
        title: "Players",
        icon: <EventAvailable />,
    },
    // {
    //     kind: "divider",
    // },
    // {
    //     kind: "header",
    //     title: "Analytics",
    // },
    // {
    //     segment: "reports",
    //     title: "Reports",
    //     icon: <BarChartIcon />,
    //     children: [
    //         {
    //             segment: "sales",
    //             title: "Sales",
    //             icon: <DescriptionIcon />,
    //         },
    //         {
    //             segment: "traffic",
    //             title: "Traffic",
    //             icon: <DescriptionIcon />,
    //         },
    //     ],
    // },
    // {
    //     segment: "integrations",
    //     title: "Integrations",
    //     icon: <LayersIcon />,
    // },
];
export default function Providers({ children }: { children: React.ReactNode }) {
    const { data } = useSession();
    const [session, setSession] = useState<Session | null>(data);
    const authentication = useMemo(() => {
        return {
            signIn: () => {
                setSession(data);
            },
            signOut: () => {
                setSession(null);
            },
        };
    }, [data]);
    const app_auth = useMemo(() => ({ signIn, signOut }), []);
    const [pathname, setPathname] = useState("/");
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const savedmode: PaletteMode = prefersDarkMode ? "dark" : "light";

    const [mode, setMode] = useState<PaletteMode>(savedmode);
    const THEME = useMemo(
        () => createTheme({ ...getDesignTokens(mode) }, ruRU),
        [mode]
    );
    const router = useMemo<Router>(() => {
        return {
            pathname,
            searchParams: new URLSearchParams(),
            navigate: (path) => setPathname(String(path)),
        };
    }, [pathname]);

    return (
        <AppProvider
            router={router}
            theme={THEME}
            navigation={NAVIGATION}
            branding={{ title: "Сводка данных" }}
            authentication={app_auth}
            session={data}
        >
            <AuthenticationContext.Provider value={app_auth}>
                <SessionContext.Provider value={data}>
                    <PageContainer
                        slots={{
                            toolbar: () => (
                                <PageContainerToolbar>
                                    <Account slots={{ menuItems: "div" }} />
                                </PageContainerToolbar>
                            ),
                        }}
                    >
                        {children}
                    </PageContainer>
                </SessionContext.Provider>
            </AuthenticationContext.Provider>
        </AppProvider>
    );
}
