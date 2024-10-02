"use client";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import { AppProvider, AppTheme, Router } from "@toolpad/core";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { ExtendedNavigate } from "./providers";
import { akuTheme } from "@/Models/Theme/akuma.theme";

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
export function ProviderToolbar({
    children,
    theme,
}: {
    children: React.ReactNode;
    theme?: AppTheme | undefined;
}) {
    const session = useSession();
    const r = useRouter();
    const pathname = usePathname();

    const router = useMemo<Router>(() => {
        // const sp = new URLSearchParams();
        return {
            pathname,
            searchParams: new URLSearchParams(),
            navigate: (path) => {
                return r.push(path.toString());
            },
        };
    }, [pathname, r]);
    return (
        <AppProvider
            session={session.data}
            router={router}
            theme={akuTheme}
            authentication={{ signIn, signOut }}
            navigation={ROUTES}
            branding={{
                title: "Авангард",
                logo: <SportsKabaddiIcon />,
            }}
        >
            {children}
        </AppProvider>
    );
}
