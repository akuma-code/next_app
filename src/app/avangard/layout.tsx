import { Box } from "@mui/material";

async function Layout({
    children,
    slot,
}: {
    children: React.ReactNode;
    slot: React.ReactNode;
}) {
    return (
        <Box>
            {slot}
            <br />
            {children}
        </Box>
    );
}

export default Layout;
