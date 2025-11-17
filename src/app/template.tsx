import { auth } from "@/auth/auth";
import MiniDrawer from "@/Components/Nav/MiniNavBar";
import { Container } from "@mui/material";
import { SessionProvider } from "next-auth/react";

async function RootTemplate({
    children,
}: {
    children?: React.ReactNode;
}) {
    const session = await auth()
    return (
        <SessionProvider session={ session } refetchOnWindowFocus={ true }>

            <MiniDrawer />
            <Container maxWidth="lg" sx={ { p: 1 } }>
                { children }
            </Container>

        </SessionProvider>
    )

}

export default RootTemplate