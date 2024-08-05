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

async function MainPage({
    searchParams: { page, rpp },
}: {
    searchParams: { page: string; rpp: string };
}) {
    const lastTen =
        (await getEventsWithPagination(Number(rpp ?? 8), Number(page ?? 0), {
            pairs: true,
            players: true,
        })) ?? [];
    const [last, ...rest] = lastTen;

    const { players, pairs } = last as any;
    return (
        <Grid container columns={12}>
            <Grid item md={2} rowGap={1} p={1} container>
                {rest.map((e, idx) => (
                    <Button size="small" variant="outlined" key={e.id}>
                        <Link href={`/avangard/event/${e.id}`}>
                            {_dbDateParser(e.date_formated).dd_mm_yyyy}
                        </Link>
                    </Button>
                ))}
            </Grid>
            <Grid item md={4} height={500}>
                {/* <EventBoard
                    // event={last as any}
                    {...last}
                    eventId={last.id}
                    players={players}
                    pairs={pairs}
                /> */}
            </Grid>
            <Grid item md={3} p={1}>
                <Box bgcolor={"#8d8d8d"}>Selected Info</Box>
            </Grid>
        </Grid>
    );
}

export default MainPage;
