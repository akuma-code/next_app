import { MrtBoundary } from "@/ClientComponents/MRT/MrtBoundary";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin", "cyrillic"] });
export const metadata: Metadata = {
    title: "Авангард",
    description: "Спортивная школа Авангард, расписание тренировок",
};

const RootLayout: React.FC<{
    children: React.ReactNode;
    // modal: React.ReactNode;
    // modalEvent: React.ReactNode;
    // slot: React.ReactNode;
}> = async ({ children }) => {
    return (
        <html lang="ru" data-toolpad-color-scheme="light">
            <body className={ inter.className }>

                <MrtBoundary>
                    <Providers>
                        { children }

                        <SpeedInsights />
                    </Providers>
                </MrtBoundary>
            </body>
        </html>
    );
};
RootLayout.displayName = "__RootLayout";
export default RootLayout;
