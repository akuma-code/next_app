import { auth } from "@/auth/auth";
import { MrtBoundary } from "@/ClientComponents/MRT/MrtBoundary";
import { Container, Paper } from "@mui/material";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import React from "react";
import "./globals.css";
import Providers from "./providers";
import { AppProvider } from "@toolpad/core/nextjs";
import { DashboardLayout } from "@toolpad/core";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
    title: "Авангард",
    description: "Avangard project",
};

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
                <SessionProvider session={session} refetchOnWindowFocus>
                    <MrtBoundary>
                        <Providers>
                            {/* <Paper
                                // maxWidth={"lg"}
                                // component={Container}
                                elevation={2}
                                color="primary.main"
                            > */}
                            <DashboardLayout>{children}</DashboardLayout>
                            {/* </Paper> */}
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
