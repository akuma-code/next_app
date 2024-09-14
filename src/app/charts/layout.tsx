import { Box } from "@mui/material";
import Providers from "./providers";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Providers>
            <DashboardLayout
                slotProps={{
                    toolbarAccount: {
                        localeText: { signInLabel: "In", signOutLabel: "Out" },
                    },
                }}
            >
                {children}
            </DashboardLayout>
        </Providers>
    );
}
export default Layout;
