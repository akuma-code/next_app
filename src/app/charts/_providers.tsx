"use client";
import { getDesignTokens } from "@/theme";
import { EventAvailable } from "@mui/icons-material";
import BarChartIcon from "@mui/icons-material/BarChart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Button, createTheme, PaletteMode, useMediaQuery } from "@mui/material";
import { ruRU } from "@mui/material/locale";
import {
    Account,
    AuthenticationContext,
    Navigation,
    PageContainer,
    PageContainerToolbar,
    SessionContext,
    Router,
} from "@toolpad/core";
import { AppProvider } from "@toolpad/core/nextjs";
import { Session } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
const NAVIGATION: Navigation = [
    {
        kind: "header",
        title: "Main items",
    },
    {
        segment: "charts",
        title: "Графики",
        icon: <BarChartIcon />,
        children: [
            {
                kind: "page",
                segment: "events",
                title: "Events",
                icon: <DashboardIcon />,
            },
            {
                segment: "players",
                title: "Players",
                icon: <EventAvailable />,
            },
        ],
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
    const s = useSession();
    // const [session, setSession] = useState<Session | null>(s.data);
    // const authentication = useMemo(() => {
    //     return {
    //         signIn: () => {
    //             setSession(s.data);
    //         },
    //         signOut: () => {
    //             setSession(null);
    //         },
    //     };
    // }, [s.data]);
    const app_auth = useMemo(() => ({ signIn, signOut }), []);

    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: light)");
    const savedmode: PaletteMode = prefersDarkMode ? "dark" : "light";
    const r = useRouter();
    const pathname = usePathname();
    const [mode, setMode] = useState<PaletteMode>(savedmode);
    const THEME = useMemo(
        () => createTheme({ ...getDesignTokens(mode) }, ruRU),
        [mode]
    );

    const router = useMemo<Router>(() => {
        return {
            pathname,
            searchParams: new URLSearchParams(),
            navigate: (path) => r.push(path.toString()),
        };
    }, [pathname, r]);

    return (
        <SessionContext.Provider value={s.data}>
            <AuthenticationContext.Provider value={app_auth}>
                {/* <AppProvider
                    router={router}
                    // theme={THEME}
                    navigation={NAVIGATION}
                    branding={{ title: "Сводка данных", logo: <LayersIcon /> }}
                    authentication={{ signIn, signOut }}
                    session={s.data}
                > */}
                {children}
                {/* </AppProvider> */}
            </AuthenticationContext.Provider>
        </SessionContext.Provider>
    );
}
