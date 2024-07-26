import React from "react";

import { Box } from "@mui/material";

async function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <Box border={ "2px solid black" }>
            main
            { children }

        </Box>
    );
}

export default MainLayout;
