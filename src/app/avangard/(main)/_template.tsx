import LoadSpinner from "@/app/avangard/loading";
import { Box } from "@mui/material";
import React from "react";

async function Boundary({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { category: string; id: string };
}) {
    return (
        <Box border="3px dashed green">
            {params?.category}
            {children}
        </Box>
    );
}

export default Boundary;
