import React from "react";

import { Box } from "@mui/material";

async function BoardLayout({ children }: { children: React.ReactNode }) {
    return (
        <Box border={ "2px solid black" }>
            board
            { children }

        </Box>
    );
}

export default BoardLayout;
