"use client";
import { akuTheme } from "@/Models/Theme/akuma.theme";
import {
    mdiAccountGroupOutline,
    mdiChartBarStacked,
    mdiSecurity,
    mdiTrophyVariantOutline,
} from "@mdi/js";
import Icon from "@mdi/react";
import { AppProvider, Router } from "@toolpad/core";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import { ExtendedNavigate } from "./providers";

const SegmentIcon = {
    events: <Icon size={1} path={mdiTrophyVariantOutline} />,
    players: <Icon size={1} path={mdiAccountGroupOutline} />,
    stats: <Icon size={1} path={mdiChartBarStacked} />,
    admin: <Icon size={1} path={mdiSecurity} />,
};

const ROUTES: ExtendedNavigate = [
    // { kind: "header", title: "Stats" },

    {
        title: "Расписание",
        segment: "events",
        kind: "page",
        icon: SegmentIcon.events,
    },
    {
        title: "Игроки",
        segment: "players",
        kind: "page",
        icon: SegmentIcon.players,
    },
    { kind: "divider" },
    {
        segment: "charts",
        title: "Статистика",
        kind: "page",
        icon: SegmentIcon.stats,
    },
    { kind: "divider" },

    {
        segment: "admin",
        title: "Админка",
        kind: "page",
        icon: SegmentIcon.admin,
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
export function ProviderToolbar({ children }: { children: React.ReactNode }) {
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
                logo: SegmentIcon.events,
            }}
        >
            {children}
        </AppProvider>
    );
}
