import { auth } from "@/auth/auth";
import { MrtBoundary } from "@/ClientComponents/MRT/MrtBoundary";
import { DashboardLayout } from "@toolpad/core";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import React from "react";
import "./globals.css";
import Providers, { ExtendedNavigate } from "./providers";

const inter = Inter({ subsets: ["latin", "cyrillic"] });
export const metadata: Metadata = {
    title: "Авангард",
    description: "Avangard project",
    icons: "favicon.ico",
};

const ROUTES: ExtendedNavigate = [
    // { kind: "header", title: "Stats" },
    {
        segment: "avangard",
        title: "Тренировки",
        kind: "page",
        visible: true,
        children: [
            { title: "Расписание", segment: "events", kind: "page" },
            { title: "Игроки", segment: "players", kind: "page" },
        ],
    },
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

const RootLayout: React.FC<{
    children: React.ReactNode;
    // modal: React.ReactNode;
    // modalEvent: React.ReactNode;
    // slot: React.ReactNode;
}> = async ({ children }) => {
    const session = await auth();
    const cls = [inter.className, "bg-[#7ad5f3c9]"].join(" ");
    // console.clear();
    return (
        <html lang="ru">
            <body className={cls}>
                <SessionProvider
                    session={session}
                    refetchOnWindowFocus
                    refetchWhenOffline={false}
                >
                    <MrtBoundary>
                        <Providers>
                            <DashboardLayout>{children}</DashboardLayout>
                        </Providers>
                        <SpeedInsights />
                    </MrtBoundary>
                </SessionProvider>
            </body>
        </html>
    );
};
RootLayout.displayName = "__RootLayout";
export default RootLayout;
