"use client";

import { Box, List, ListItem, Typography } from "@mui/material";

interface PlayerInfoCardProps {
    player: {
        name: string;
        id: number;
        profileId?: number | null;
        ticketId?: string | null;
        createdAt?: Date;
        updatedAt?: Date;
    };
}
export const PlayerInfoCard: React.FC<PlayerInfoCardProps> = ({ player }) => {
    if (!player) return null;
    const { id, name } = player;

    return (
        <List>
            <ListItem
                divider
                sx={{
                    display: "flex",
                    gap: 1,
                    justifyContent: "center",
                }}
            >
                <Typography>ID: </Typography>
                <Typography>{id}</Typography>
            </ListItem>
            <ListItem
                divider
                sx={{
                    display: "flex",
                    gap: 1,
                    justifyContent: "space-between",
                }}
            >
                <Typography>Имя: </Typography>
                <Typography>{name}</Typography>
            </ListItem>
        </List>
    );
};
