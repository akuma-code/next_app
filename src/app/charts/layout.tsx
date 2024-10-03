import { PageContainer } from "@toolpad/core";

function Layout({ children }: { children: React.ReactNode }) {
    return <PageContainer suppressHydrationWarning>{children}</PageContainer>;
}
export default Layout;
