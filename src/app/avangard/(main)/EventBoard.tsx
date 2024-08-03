"use client";

import LoadSpinner from "@/app/avangard/loading";
import {
    EventIncludesReturn,
    getEventWithIncludes,
} from "@/Services/events/db_event";
import { getEventsWithPagination } from "@/Services/events/eventActions";
import {
    Card,
    CardHeader,
    CardContent,
    Box,
    Button,
    Stack,
    Typography,
} from "@mui/material";
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
    const [current, setCurrent] = useState<any[]>([]);
    const clickhandler = () => {
        start(async () => {
            const e = (await getEventsWithPagination(7, 0)) as any[];
            if (!e) return;
            setCurrent(
                e.map((ee) => ({
                    ...ee,
                    players: ee.players.map((p: { name: string }) => p.name),
                }))
            );
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
                overflowY: "auto",
            }}
        >
            <CardHeader title={`Event ${event.id}`} />
            <CardContent>
                <Stack direction={"row"}>
                    <Box>
                        <Box>date: {event.date_formated}</Box>
                        <Box>players: {event?.players?.length}</Box>
                        <Box>pairs: {event?.pairs?.length}</Box>
                        <Box>Queue: 2</Box>
                        <Box>Reserved: 2</Box>
                    </Box>
                    <Box>
                        {event.players.map((p) => (
                            <Typography key={p.name} variant="subtitle2">
                                {p.name}
                            </Typography>
                        ))}
                    </Box>
                </Stack>
                {isPending ? (
                    <LoadSpinner size={1} />
                ) : (
                    <Button onClick={clickhandler}>BTN</Button>
                )}
                {
                    // current && (
                    //     <Box>
                    //         всего: {current[0]._count.players} <br />
                    //         пар: {current[0]._count.pairs}
                    //     </Box>
                    // )
                }
            </CardContent>
        </Card>
    );
};

export default EventBoard;
