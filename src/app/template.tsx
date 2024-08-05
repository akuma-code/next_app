import { AppHeader } from "@/Components/Nav/AppHeaderNavbar";

export default async function Template({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <AppHeader />
            {children}
        </>
    );
}
