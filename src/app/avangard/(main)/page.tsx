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
import { ItemsList } from "./_components/EventList";
import { Board } from "./_components/Board";
import StackedBarChart from "@/Components/Charts/StackedBarChart";

const validateNumber = (n: number, x?: number) => (!isNaN(n) ? n : x ? x : 0);
async function MainPage({
    searchParams,
}: {
    searchParams: { page?: string; rpp?: string; eventId?: string };
}) {
    const page = validateNumber(Number(searchParams.page), 0);
    const rpp = validateNumber(Number(searchParams.rpp), 10);
    let skip = Math.abs(page * rpp);
    const eventId = Number(searchParams.eventId);
    const { data, total } = await getDBManyEventsData(
        { isDraft: false },
        {
            date_formated: true,
            pairs: true,
            players: true,
            _count: { select: { players: true, pairs: true } },
        },
        {
            skip: skip,
            take: rpp,
            orderBy: { id: "desc" },
        }
    );
    const [last, ...rest] = data;
    return (
        <Grid
            container
            columns={12}
            columnGap={4}
            sx={{
                [`& .MuiGrid-item`]: {
                    border: "1px solid grey",
                    p: 1,
                    // w: "fit-content",
                },
            }}
        >
            <Grid item md={4}>
                <Board lastId={eventId || last?.id || undefined} />
            </Grid>

            <Grid item md={3}>
                <ItemsList items={data} />
            </Grid>

            <Grid item md={4}>
                <Box bgcolor={"#8d8d8d"}>Всего тренировок: {total}</Box>
                <Box maxWidth={400}>
                    <StackedBarChart />
                </Box>
            </Grid>
        </Grid>
    );
}

export default MainPage;
