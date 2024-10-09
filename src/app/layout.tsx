import { auth } from "@/auth/auth";
import { MrtBoundary } from "@/ClientComponents/MRT/MrtBoundary";
import { DashboardLayout } from "@toolpad/core";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import React from "react";
import "./globals.css";
import Providers from "./providers";
import { ProviderToolbar } from "./toolbar-provider";
import { NavbarProvider } from "./nav-provider";

const inter = Inter({ subsets: ["latin", "cyrillic"] });
export const metadata: Metadata = {
    title: "Авангард",
    description: "Спортивная школа Авангард, расписание тренировок",
    icons: { icon: "public/favicon.ico" },
};

const RootLayout: React.FC<{
    children: React.ReactNode;
    // modal: React.ReactNode;
    // modalEvent: React.ReactNode;
    // slot: React.ReactNode;
}> = async ({ children }) => {
    const session = await auth();

    // console.clear();

    return (
        <html lang="ru" data-toolpad-color-scheme="light">
            <body className={inter.className}>
                <SessionProvider session={session} refetchOnWindowFocus>
                    <MrtBoundary>
                        <Providers>
                            <NavbarProvider>
                                {children}

                                <SpeedInsights />
                            </NavbarProvider>
                        </Providers>
                    </MrtBoundary>
                </SessionProvider>
            </body>
        </html>
    );
};
RootLayout.displayName = "__RootLayout";
export default RootLayout;
