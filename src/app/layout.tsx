import { Container } from "@mui/material";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppHeader } from '../Components/Nav/AppHeaderNavbar';
import "./globals.css";
import Providers from "./providers";
const inter = Inter({ subsets: ["latin", "cyrillic"] });


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="ru">
      <body className={ inter.className + " bg-red-50" } >
        <Providers>
          <AppHeader />
          <Container sx={ { border: '1px solid black', h: '100%' } } fixed>

            { children }
          </Container>
        </Providers>
      </body>
    </html>
  );
}
