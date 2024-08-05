import { Box } from "@mui/material";

async function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Box display={"flex"} flexDirection={"row"}>
            {children}
            <br />
        </Box>
    );
}

export default Layout;
