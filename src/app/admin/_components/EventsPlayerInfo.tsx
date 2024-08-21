"use client";

import { _dbDateParser } from "@/Helpers/dateFuncs";
import { List, ListItem } from "@mui/material";
import React from "react";

interface EventsInfoPlayerProps {
    events: {
        id: number;
        date_formated: string;
        title?: string | null;
    }[];
}

const EventsInfoPlayer: React.FC<EventsInfoPlayerProps> = ({ events }) => {
    return (
        <List>
            {events.map((e) => (
                <ListItem key={e.id} divider>
                    {_dbDateParser(e.date_formated).dd_mmmm}
                </ListItem>
            ))}
        </List>
    );
};

export default EventsInfoPlayer;
