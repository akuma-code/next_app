"use client";

import { useToggle } from "@/Hooks/useToggle";
import { mdiStickerEmoji } from "@mdi/js";
import Icon from "@mdi/react";
import { SettingsTwoTone } from "@mui/icons-material";
import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import * as React from "react";

type ActionProps = {
    children?: React.ReactNode;
};
export function EventButtons({ children }: ActionProps) {
    const [drop, c] = useToggle(false);
    return (
        <Box
            sx={{
                transform: "translateZ(-10px)",
                flexGrow: 0,
                zIndex: 30,
                width: 50,
                height: 50,
                position: "relative",
            }}
        >
            <SpeedDial
                direction="down"
                ariaLabel="Fast actions"
                sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bgcolor: (t) =>
                        drop ? alpha(t.palette.primary.main, 0.7) : "inherit",
                    transition: "all 0.3s ease-in",
                    borderRadius: "1.6rem",
                }}
                onOpen={c.on}
                onClose={c.off}
                open={drop}
                icon={
                    <SpeedDialIcon
                        openIcon={<Icon path={mdiStickerEmoji} size={1} />}
                        icon={<SettingsTwoTone />}
                    />
                }
            >
                {children}
            </SpeedDial>
        </Box>
    );
}
