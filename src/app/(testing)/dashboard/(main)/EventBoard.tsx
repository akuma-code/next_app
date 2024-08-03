"use client";

import LoadSpinner from "@/app/avangard/loading";
import {
    EventIncludesReturn,
    getEventWithIncludes,
} from "@/Services/events/db_event";
import { Card, CardHeader, CardContent, Box, Button } from "@mui/material";
import { useState, useTransition } from "react";

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
    const [isPending, start] = useTransition();
    const [current, setCurrent] = useState<any | null>(null);
    const clickhandler = () => {
        start(async () => {
            const e = await getEventWithIncludes({
                where: { id: 89 },
                includes: {
                    _count: { select: { players: true, pairs: true } },
                },
            });
            setCurrent(e);
        });
    };

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
                {isPending ? (
                    <LoadSpinner size={1} />
                ) : (
                    <Button onClick={clickhandler}>BTN</Button>
                )}
                {current && (
                    <Box>
                        всего: {current._count.players} <br />
                        пар: {current._count.pairs}
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default EventBoard;
