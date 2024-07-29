import React from "react";

import { Box } from "@mui/material";
import Link from "next/link";

async function BoardLayout({ children }: { children: React.ReactNode }) {
    return (
        <Box border={"2px solid black"}>
            <Link href="/avangard">avangard</Link>
            {children}
        </Box>
    );
}

export default BoardLayout;
