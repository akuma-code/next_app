"use client";

import { useToggle } from "@/Hooks/useToggle";
import { connectOnePlayer } from "@/Services/eventService";
import { createPlayer } from "@/Services/playerService";
import {
    mdiAccountMultiplePlus,
    mdiAccountPlusOutline,
    mdiStickerEmoji,
} from "@mdi/js";
import Icon from "@mdi/react";
import { SettingsTwoTone } from "@mui/icons-material";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import PrintIcon from "@mui/icons-material/Print";
import SaveIcon from "@mui/icons-material/Save";
import ShareIcon from "@mui/icons-material/Share";
import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import * as React from "react";

const actions = [
    { icon: <FileCopyIcon />, name: "Copy" },
    { icon: <SaveIcon />, name: "Save" },
    { icon: <PrintIcon />, name: "Print" },
    { icon: <ShareIcon />, name: "Share" },
];

const eventActions = [
    {
        icon: <Icon path={mdiAccountPlusOutline} size={0.8} />,
        name: "create",
        action: createPlayer.bind(null),
    },
    {
        icon: <Icon path={mdiAccountMultiplePlus} size={0.8} />,
        name: "add",
        action: connectOnePlayer.bind(null),
    },
];

type ActionProps = {
    children?: React.ReactNode;
    backdrop?: boolean;
};
export function EventButtons({ children, backdrop }: ActionProps) {
    const [drop, c] = useToggle(false);
    return (
        <Box
            sx={{
                transform: "translateZ(10px)",
                flexGrow: 0,
                zIndex: 30,
                width: 50,
            }}
        >
            <SpeedDial
                direction="down"
                ariaLabel="Fast actions"
                sx={{
                    position: "absolute",
                    top: -30,
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
