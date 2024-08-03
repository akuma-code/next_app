import LoadSpinner from "@/app/avangard/loading";
import { Box } from "@mui/material";
import React from "react";

async function Boundary({ children }: { children: React.ReactNode }) {
    return (
        <Box border="3px dashed green" bgcolor={"secondary.light"}>
            {children}
        </Box>
    );
}

export default Boundary;
