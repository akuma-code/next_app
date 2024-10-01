"use client";

import { _dbDateParser } from "@/Helpers/dateFuncs";
import { getDBOneEventData } from "@/Services/events/db_event";
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Stack,
    Typography,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";

const EventBoard = ({
    date_formated,
    eventId,
    players = [],
    pairs = [],
}: {
    players: { id: number; name: string }[];
    pairs: {
        id: number;
        playerId: number | null;
        masterId?: number | null;
        [x: string]: number | undefined | null;
    }[];
    eventId?: number;
    date_formated: string;
}) => {
    const [isPending, start] = useTransition();
    const [current, setCurrent] = useState<any | undefined>();

    const { free, occupied, reserved, busy, total } = computeEvent(
        players,
        pairs
    );

    return (
        <Card
            elevation={2}
            sx={{
                m: 1,
                maxWidth: 500,
                maxHeight: 800,
                border: "1px solid",
                overflowY: "auto",
            }}
        >
            <CardHeader
                title={`Тренировка [id: ${eventId}]`}
                subheader={_dbDateParser(date_formated!).dd_mmmm}
            />
            <CardContent>
                <Stack direction={"row"} gap={2}>
                    <Box>
                        <Typography>Столов: {busy}/7</Typography>
                        <Typography>Игроков: {players.length}</Typography>
                        <Typography>С тренером: {reserved} </Typography>
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Box>
                        {players.map((p) => (
                            <Link
                                key={p.name}
                                href={`/avangard/player/${p.id}`}
                            >
                                <Typography variant="body1">
                                    {p.name}
                                </Typography>
                            </Link>
                        ))}
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default EventBoard;

const computeEvent = (players: any[], pairs: any[], total = 7) => {
    const pl = players.length;
    const parl = pairs.length;
    const occupied = Math.round(pl / 2);
    const reserved = Math.round(parl / 2);
    const busy = occupied + reserved > total ? total : occupied + reserved;

    const free = total - busy;

    return { occupied, reserved, free, busy, total };
};
