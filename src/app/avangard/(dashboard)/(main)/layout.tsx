import React from "react";

import { Box } from "@mui/material";
import { NavLink } from "@/ClientComponents/UI/NavLink";

async function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <Box border={"2px solid black"}>
            <NavLink href={"/avangard/board"} props={{ sx: { maxWidth: 400 } }}>
                Board
            </NavLink>
            {children}
        </Box>
    );
}

export default MainLayout;
