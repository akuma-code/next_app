import { Box, Container } from "@mui/material";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import { AppHeader } from '../Components/Nav/AppHeaderNavbar';
import "./globals.css";
import Providers from "./providers";
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin", "cyrillic"] });


export const metadata: Metadata = {
  title: "Авангард",
  description: "Avangard project",

};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  const cls = [inter.className, 'bg-[#b1d9fa]'].join(" ")
  return (
    <html lang="ru">
      <body className={ cls } >
        <Providers>
          <AppHeader />
          <Container >

            { children }
          </Container>
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
RootLayout.displayName = '__RootLayout'
export default RootLayout
