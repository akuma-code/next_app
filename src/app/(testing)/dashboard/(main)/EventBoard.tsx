"use client";
import { Card, CardHeader, CardContent, Box } from "@mui/material";

const EventBoard = ({
    event,
}: {
    event: {
        id: number;
        date_formated: string;
        players: { id: number; name: string }[];
        pairs: {
            id: number;
            playerId: number | null;
            masterId?: number | null;
            [x: string]: number | undefined | null;
        }[];
    };
}) => {
    return (
        <Card
            elevation={2}
            sx={{
                m: 1,
                maxWidth: 300,
                maxHeight: 400,
                border: "1px solid",
            }}
        >
            <CardHeader title={`Event ${event.id}`} />
            <CardContent>
                <Box>
                    <Box>date: {event.date_formated}</Box>
                    <Box>players: {event.players.length}</Box>
                    <Box>pairs: {event.pairs.length}</Box>
                    <Box>Queue: 2</Box>
                    <Box>Reserved: 2</Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default EventBoard;
