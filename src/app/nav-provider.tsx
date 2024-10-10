import { auth } from "@/auth/auth";
import { verifyUser } from "@/auth/dal";
import MiniDrawer from "@/Components/Nav/MiniNavBar";
import { Container } from "@mui/material";

export async function NavbarProvider(props: { children: React.ReactNode }) {
    // if (!user) return null;
    return (
        <>
            <MiniDrawer />
            <Container maxWidth="md" sx={{ p: 1 }}>
                {props.children}
            </Container>
        </>
    );
}
