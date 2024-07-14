"use client";
import { useToggle } from "@/Hooks/useToggle";
import { removePair } from "@/Services/events/eventActions";
import { mdiEmoticonCool, mdiMaterialUi } from "@mdi/js";
import Icon from "@mdi/react";
import { alpha, Box, Chip, ChipOwnProps, Theme } from "@mui/material";
import React, { useMemo } from "react";
export interface DoubleChipProps {
    player: { name: string; id?: number };
    master?: { name: string; id?: number };
    pairId?: number;
}
const DoubleChip: React.FC<DoubleChipProps> = ({ player, master, pairId }) => {
    const [isExpand, { on: open, off: close }] = useToggle();
    const hasMaster = Boolean(master);
    const chipProps = useMemo(() => {
        let player: ChipOwnProps["sx"] = {
            zIndex: 20,
            position: "relative",
        };
        let master: ChipOwnProps["sx"] = {
            zIndex: 10,
            right: -9,
            top: -15,
            // mb: 1,
            // mt: -1,
            position: "absolute",
            // mr: 0,
            bgcolor: (theme) => alpha(theme.palette.error.main, 0.7),
            color: "primary.contrastText",
        };
        if (isExpand && hasMaster) {
            player = {
                ...player,
                // top: 10,
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.9),
            };
            master = { ...master, bgcolor: "error.main", zIndex: 30 };
        }
        return { master, player };
    }, [hasMaster, isExpand]);

    return (
        <Box
            // px={2}
            // py={6}
            // p={1}
            // border={isExpand && hasMaster ? "1px solid" : ""}
            // border={"1px solid"}
            borderRadius={2}
            position={"relative"}
            maxWidth={"fit-content"}
            onMouseEnter={open}
            onMouseLeave={close}
        >
            {/* <div> */}
            <Chip
                variant={hasMaster ? "filled" : "outlined"}
                icon={
                    hasMaster ? (
                        <Icon path={mdiEmoticonCool} size={0.8} />
                    ) : undefined
                }
                label={player.name}
                color="primary"
                clickable
                size={"small"}
                sx={{ ...chipProps.player }}
                onDelete={async () => pairId && (await removePair(pairId))}
            />
            {master && (
                <Chip
                    variant="filled"
                    label={master.name}
                    color="error"
                    size="small"
                    icon={<Icon path={mdiMaterialUi} size={0.8} />}
                    sx={{ ...chipProps.master }}
                    clickable
                    onDelete={async () => pairId && (await removePair(pairId))}
                />
            )}
            {/* </div> */}
        </Box>
    );
};

export default DoubleChip;
