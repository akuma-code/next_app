import { DashboardLayout } from "@toolpad/core/DashboardLayout";

function Layout({ children }: { children: React.ReactNode }) {
    return (
        // <DashboardLayout
        // slotProps={{
        //     toolbarAccount: {
        //         localeText: { signInLabel: "In", signOutLabel: "Out" },
        //     },
        // }}
        // >
        // <Providers>
        <DashboardLayout>{children}</DashboardLayout>
        // </Providers>
    );
}
export default Layout;
