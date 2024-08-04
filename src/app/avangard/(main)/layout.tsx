import { Box } from "@mui/material";

async function Layout({
    children,
    slot,
}: {
    children: React.ReactNode;
    slot: React.ReactNode;
}) {
    return (
        <Box display={"flex"} flexDirection={"row"}>
            {children}
            <br />
            {slot}
        </Box>
    );
}

export default Layout;
