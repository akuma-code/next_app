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
import { ProviderToolbar } from "./toolbar-provider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { ruRU } from "@mui/x-date-pickers/locales";

const inter = Inter({ subsets: ["latin", "cyrillic"] });
export const metadata: Metadata = {
    title: "Авангард",
    description: "Avangard project",
    icons: ["favicon.ico"],
};

const RootLayout: React.FC<{
    children: React.ReactNode;
    // modal: React.ReactNode;
    // modalEvent: React.ReactNode;
    // slot: React.ReactNode;
}> = async ({ children }) => {
    const session = await auth();
    const cls = [inter.className].join(" ");
    // console.clear();
    return (
        <html lang="ru" data-toolpad-color-scheme="light">
            <body className={cls}>
                <SessionProvider
                    session={session}
                    refetchOnWindowFocus
                    refetchWhenOffline={false}
                >
                    <MrtBoundary>
                        <ProviderToolbar>
                            <Providers>
                                {children}

                                <SpeedInsights />
                            </Providers>
                        </ProviderToolbar>
                    </MrtBoundary>
                </SessionProvider>
            </body>
        </html>
    );
};
RootLayout.displayName = "__RootLayout";
export default RootLayout;
