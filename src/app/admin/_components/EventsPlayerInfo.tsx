"use client";

import { _dbDateParser } from "@/Helpers/dateFuncs";
import {
    Box,
    List,
    ListItem,
    ListItemText,
    Stack,
    Typography,
} from "@mui/material";
import React from "react";

interface EventsInfoPlayerProps {
    events: {
        id: number;
        date_formated: string;
        title?: string | null;
        _count?: { [x: string]: number };
    }[];
}

const EventsInfoPlayer: React.FC<EventsInfoPlayerProps> = ({ events }) => {
    // console.log({ events });
    return (
        <Stack
            maxWidth={200}
            flexWrap={"wrap"}
            maxHeight={500}
            overflow={"auto"}
            direction={"row"}
            gap={2}
            // spacing={1}
        >
            <Box width={200}>Total: {events.length}</Box>
            {events.map((e) => (
                <ListItemText
                    key={e.id}
                    primary={_dbDateParser(e.date_formated).dd_mmmm}
                    secondary={`players: ${e?._count?.players.toString()}`}
                />

                // <Typography key={e.id}>
                //     {_dbDateParser(e.date_formated).dd_mmmm}
                // </Typography>
            ))}
        </Stack>
    );
};

export default EventsInfoPlayer;
