import React from "react";

import { Box } from "@mui/material";
import Link from "next/link";
import { NavLink } from "@/ClientComponents/UI/NavLink";

async function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <Box border={"2px solid black"}>
            <NavLink href="/avangard">dashboard</NavLink>
            <br />
            <NavLink href={"/avangard/board"}>Board</NavLink>
            {children}
        </Box>
    );
}

export default DashboardLayout;
