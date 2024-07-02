"use client";
import MenuIcon from "@mui/icons-material/Menu";

import { AppBar, Toolbar, IconButton, Breadcrumbs } from "@mui/material";
import Link from "next/link";
import BlurLinearIcon from "@mui/icons-material/BlurLinear";
import { useSearchParams } from "next/navigation";

export const EventHeader = () => {
    const search = useSearchParams();
    const view = search.get("view");

    return (
        <AppBar position="relative" sx={{ mb: 2 }}>
            <Toolbar variant="dense">
                <Breadcrumbs separator={<b>/</b>}>
                    <Link href={{ query: { view: "list" } }}>
                        <IconButton
                            edge="start"
                            color="warning"
                            sx={{
                                bgcolor: view === "list" ? "beige" : "inherit",
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Link>
                    <Link href={{ query: { view: "table" } }}>
                        <IconButton
                            edge="start"
                            sx={{
                                bgcolor: view === "table" ? "beige" : "inherit",
                            }}
                        >
                            <BlurLinearIcon color="warning" />
                        </IconButton>
                    </Link>
                </Breadcrumbs>
            </Toolbar>
        </AppBar>
    );
};
