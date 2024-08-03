import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Grid,
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
    return (
        <Grid container columns={12}>
            <Grid item md={3}>
                <EventBoard event={last as any} />
            </Grid>
            <Grid item md={1} rowGap={1} p={1} container>
                {rest.map((e, idx) => (
                    <Button size="small" variant="outlined" key={e.id}>
                        <Link
                            href={{
                                query: {
                                    page: +rpp * +page ?? 0,
                                    rpp: lastTen.length,
                                },
                            }}
                        >
                            {_dbDateParser(e.date_formated).dd_mm_yyyy}
                        </Link>
                    </Button>
                ))}
            </Grid>
        </Grid>
    );
}

export default MainPage;

const one_event = {
    id: 86,
    date_formated: "2024-07-10",
    title: "Тренировка",
    isDraft: false,
    players: [
        {
            id: 3,
            name: "Володя Юдаев",
        },
        {
            id: 6,
            name: "Инна Гулина",
        },
        {
            id: 7,
            name: "Лариса Басманова",
        },
        {
            id: 12,
            name: "Рома Русаков",
        },
        {
            id: 15,
            name: "Сергей Коробов",
        },
        {
            id: 20,
            name: "Надежда Отпетова",
        },
        {
            id: 28,
            name: "Володя Иванов",
        },
        {
            id: 35,
            name: "Сергей Олейников",
        },
        {
            id: 41,
            name: "Жижирий Сергей",
        },
        {
            id: 43,
            name: "Андрей Руденко",
        },
        {
            id: 46,
            name: "Надя",
        },
        {
            id: 11,
            name: "Павел Роднянский",
        },
        {
            id: 202,
            name: "Эдуард Емельянов",
        },
    ],
    pairs: [
        {
            id: 51,
            firstPlayerId: 1,
            secondPlayerId: 35,
            masterId: null,
            playerId: null,
            eventId: 86,
        },
        {
            id: 52,
            firstPlayerId: 2,
            secondPlayerId: 12,
            masterId: null,
            playerId: null,
            eventId: 86,
        },
        {
            id: 53,
            firstPlayerId: 2,
            secondPlayerId: 46,
            masterId: null,
            playerId: null,
            eventId: 86,
        },
    ],
};
