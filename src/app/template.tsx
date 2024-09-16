import { AppHeader } from "@/Components/Nav/AppHeaderNavbar";
import { NavigationBar } from "@/Components/Nav/NavigationBar";

export default async function Template({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {/* <AppHeader /> */}
            {/* <NavigationBar /> */}
            {children}
        </>
    );
}
