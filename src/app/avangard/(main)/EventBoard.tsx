"use client";

import LoadSpinner from "@/app/avangard/loading";
import { _dbDateParser } from "@/Helpers/dateFuncs";
import { getEventsWithPagination } from "@/Services/events/eventActions";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Stack,
    Typography,
} from "@mui/material";
import { useState, useTransition } from "react";

const EventBoard = ({
    date_formated,
    eventId,
    players = [],
    pairs,
}: {
    players: { id: number; name: string }[];
    pairs?: {
        id: number;
        playerId: number | null;
        masterId?: number | null;
        [x: string]: number | undefined | null;
    }[];
    eventId?: number;
    date_formated?: string;
}) => {
    const [isPending, start] = useTransition();
    const [current, setCurrent] = useState<any[]>([]);
    const clickhandler = () => {
        start(async () => {});
    };
    const tables = players.length / 2 > 7 ? 7 : Math.round(players!.length / 2);
    return (
        <Card
            elevation={2}
            sx={{
                m: 1,
                maxWidth: 500,
                maxHeight: 400,
                border: "1px solid",
                overflowY: "auto",
            }}
        >
            <CardHeader
                title={`Тренировка [id: ${eventId}]`}
                subheader={_dbDateParser(date_formated ?? "").dd_mm_yyyy}
            />
            <CardContent>
                <Stack direction={"row"} gap={2}>
                    <Box>
                        <Typography>Столов занято {tables}/7</Typography>
                        <Typography>Резерв: {pairs?.length} </Typography>
                        <Typography>Очередь: 2</Typography>
                    </Box>
                    <Box>
                        Список игроков
                        {players &&
                            players.map((p) => (
                                <Typography key={p.name}>{p.name}</Typography>
                            ))}
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default EventBoard;
