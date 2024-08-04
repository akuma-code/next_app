import { Box } from "@mui/material";
import React from "react";

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <Box m={3}>{children}</Box>;
}
