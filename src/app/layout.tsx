import { Box, Container, Paper } from "@mui/material";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import { AppHeader } from '../Components/Nav/AppHeaderNavbar';
import "./globals.css";
import Providers from "./providers";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth/auth";
import Link from "next/link";

const inter = Inter({ subsets: ["latin", "cyrillic"] });


export const metadata: Metadata = {
  title: "Авангард",
  description: "Avangard project",

};

const RootLayout: React.FC<{ children: React.ReactNode, modal: React.ReactNode }> = async ({
  children, modal
}: Readonly<{
  children: React.ReactNode,
  modal: React.ReactNode

}>) => {
  const session = await auth()
  const cls = [inter.className, 'bg-[#7ad5f3c9]'].join(" ")
  return (
    <html lang="ru">
      <body className={ cls } >
        <SessionProvider session={ session } refetchOnWindowFocus >


          <Providers>


            <Paper maxWidth={ 'lg' } component={ Container } elevation={ 2 } color="primary.main">


              <AppHeader />
              { children }

            </Paper>
            <SpeedInsights />

          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
RootLayout.displayName = '__RootLayout'
export default RootLayout
