import { auth } from "@/auth/auth";
import MiniDrawer from "@/Components/Nav/MiniNavBar";
import { Container } from "@mui/material";

export async function NavbarProvider(props: { children: React.ReactNode }) {
    const session = await auth();

    return (
        <>
            <MiniDrawer />
            <Container maxWidth="md" sx={{ p: 1 }}>
                {props.children}
            </Container>
        </>
    );
}
