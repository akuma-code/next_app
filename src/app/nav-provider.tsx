import { auth } from "@/auth/auth";
import MiniDrawer from "@/Components/Nav/MiniNavBar";

export function NavbarProvider(props: { children: React.ReactNode }) {
    const session = auth();

    return (
        <>
            <MiniDrawer />
            {props.children}
        </>
    );
}
