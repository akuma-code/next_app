import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Grid,
    Typography,
} from "@mui/material";
import EventBoard from "./EventBoard";
import { getEventsWithPagination } from "@/Services/events/eventActions";
import { _log } from "@/Helpers/helpersFns";
import React from "react";
import { _dbDateParser } from "@/Helpers/dateFuncs";
import Link from "next/link";
import { getDBManyEventsData } from "@/Services/events/db_event";

async function MainPage({
    searchParams: { page, rpp },
}: {
    searchParams: { page: string; rpp: string };
}) {
    const last_events = getDBManyEventsData(
        { isDraft: false },
        { date_formated: true, pairs: true, players: true },
        { take: 10, skip: 0 }
    );

    return (
        <Grid container columns={12}>
            <Grid item md={2} rowGap={1} p={1} container></Grid>
            <Grid item md={4}>
                <Box>Board</Box>
                {/* <EventBoard
                    // event={last as any}
                    {...last}
                    eventId={last.id}
                    players={players}
                    pairs={pairs}
                /> */}
            </Grid>
            <Grid item md={"auto"} p={1}>
                <Box bgcolor={"#8d8d8d"}>Selected Info</Box>
            </Grid>
        </Grid>
    );
}

export default MainPage;
