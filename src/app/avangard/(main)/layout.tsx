import { Box } from "@mui/material";

async function Layout({ children }: { children: React.ReactNode }) {
    return <Box>{children}</Box>;
}

export default Layout;
