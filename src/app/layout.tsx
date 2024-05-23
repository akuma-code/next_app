import { Box } from "@mui/material";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import { AppHeader } from '../Components/Nav/AppHeaderNavbar';
import "./globals.css";
import Providers from "./providers";

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
        {/* <SessionProvider> */ }
        <Providers>
          <AppHeader />
          <Box p={ 3 } bgcolor={ '#f5d7c6' }>

            { children }
          </Box>

        </Providers>
        {/* </SessionProvider> */ }
      </body>
    </html>
  );
}
RootLayout.displayName = '__RootLayout'
export default RootLayout
