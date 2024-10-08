import React from "react";
import Box, { BoxProps } from "@mui/material/Box";
import { Circle } from "../mockup-shape";

export const SideNavUserInfoMockup = ({
    collapsed,
    ...props
}: { collapsed?: boolean } & BoxProps) => {
    return (
        <Box
            {...props}
            sx={{
                borderRadius: 1,
                bgcolor: "#8d2424",
                p: 1.5,
                display: "flex",
                alignItems: "center",
                ...props.sx,
            }}
        >
            <Circle
                sx={{ fontSize: collapsed ? 36 : 48, transition: "0.2s" }}
            />
            {!collapsed && <Box sx={{ ml: 1.5, minWidth: "0px" }}></Box>}
        </Box>
    );
};
