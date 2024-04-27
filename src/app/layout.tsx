import { Container } from "@mui/material";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppHeader } from '../Components/Nav/AppHeaderNavbar';
import "./globals.css";
import Providers from "./providers";
import React, { PropsWithChildren } from "react";
const inter = Inter({ subsets: ["latin", "cyrillic"] });


export const metadata: Metadata = {
  title: "NextApp Stp",
  description: "Stp server",
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {


  return (
    <html lang="ru">
      <body className={ inter.className + " bg-red-50" } >
        <Providers>
          <AppHeader />
          <Container sx={ { border: '1px solid black', h: '100%' } } fixed key={ '___RootContainer' }>

            { children }
          </Container>
        </Providers>
      </body>
    </html>
  );
}
RootLayout.displayName = '__RootLayout'
export default RootLayout
