import React from "react";

import { Box } from "@mui/material";

async function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <Box border={ "2px solid black" }>
            dashboard
            { children }

        </Box>
    );
}

export default DashboardLayout;
