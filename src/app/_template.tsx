import { AppHeader } from "@/Components/Nav/AppHeaderNavbar";
import { NavigationBar } from "@/Components/Nav/NavigationBar";
import { PageContainer } from "@toolpad/core";

export default async function Template({
    children,
}: {
    children: React.ReactNode;
}) {
    return { children };
}
