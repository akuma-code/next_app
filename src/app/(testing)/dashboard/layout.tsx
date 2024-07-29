import React from "react";

import { Box } from "@mui/material";
import Link from "next/link";
import { NavLink } from "@/ClientComponents/UI/NavLink";

async function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <Box border={"2px solid black"}>
            <Box maxWidth={300}>
                <NavLink href="/dashboard">home</NavLink>
                <br />
                <NavLink href={"/dashboard/board"}>Board</NavLink>
            </Box>
            {children}
        </Box>
    );
}

export default DashboardLayout;
