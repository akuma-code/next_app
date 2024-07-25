import React from "react";

import { Box } from "@mui/material";

async function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <Box>

            { children }

        </Box>
    );
}

export default DashboardLayout;
