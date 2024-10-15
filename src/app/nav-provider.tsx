import { auth } from "@/auth/auth";
import { verifyUser } from "@/auth/dal";
import MiniDrawer from "@/Components/Nav/MiniNavBar";
import { Container } from "@mui/material";
import { SessionProvider } from "next-auth/react";

export async function NavbarProvider(props: { children: React.ReactNode }) {
    // if (!user) return null;
    const session = await auth();
    return (
        <SessionProvider session={session}>
            <MiniDrawer />
            <Container maxWidth="md" sx={{ p: 1 }}>
                {props.children}
            </Container>
        </SessionProvider>
    );
}
