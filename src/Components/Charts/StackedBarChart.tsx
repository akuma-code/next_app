"use client";
import { BarSeriesType } from "@mui/x-charts";
import React, { useEffect, useMemo, useState, useTransition } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { getEvents, ThenArg } from "@/Services/events/eventActions";
import { _dbDateParser } from "@/Helpers/dateFuncs";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Alert } from "@mui/material";

const uData = [4000, 4000];
const pData = [2400, 1398];
const xLabels = ["Page A", "Page B"];
type EventsGetType = {
    id: number;
    date_formated: string;
    _count: { players: number; pairs: number };
}[];

export default function StackedBarChart() {
    // const [loading, start] = useTransition();
    // const [eventsData, setEventsData] = useState<EventsGetType>([]);
    const q = useQuery({
        queryKey: ["events"],
        queryFn: getDataset,
        select(data) {
            return data?.dataset || [];
        },
        // select(data) {
        //     if (!data) return [];
        //     const items = data.map((e) => ({
        //         id: e.id,
        //         label: e.date_formated,
        //     }));
        //     return items;
        // },
    });
    // const chart_data = useMemo(() => {
    //     if (!q.isSuccess) return;
    //     const data = q.data.map((d) => ({
    //         date: d.date_formated as string,
    //         players: d._count.players as number,
    //         duos: d._count.pairs as number,
    //     }));

    //     return data;
    // }, [q.data, q.isSuccess]);
    if (q.error) return <Alert>{q.error.message}</Alert>;
    if (!q.isSuccess) return null;
    return (
        <BarChart
            height={500}
            width={400}
            dataset={q.data}
            series={[
                { dataKey: "players_count", label: "players", stack: "total" },
                { dataKey: "pairs_count", label: "pairs", stack: "total" },
            ]}
            yAxis={[
                {
                    dataKey: "date",
                    scaleType: "band",
                    valueFormatter: (value) =>
                        _dbDateParser(value)._dayjs.format("DD MMMM"),
                },
            ]}
            title="Тренировки"
            loading={q.isLoading}
            layout="horizontal"
        />
    );
}
const makeData = ({
    data,
    id,
    label,
}: {
    data: number[];
    label: string;
    id: number;
    stack: BarSeriesType["stack"];
}): Partial<BarSeriesType> => {
    return { data, label, id };
};
async function getData() {
    const data = await getEvents({
        select: {
            id: true,
            date_formated: true,
            _count: { select: { pairs: true, players: true } },
        },
        orderBy: { date_formated: "asc" },
    });

    return data;
}
type EventDataType = {
    id: number;
    date: string;
    players_count: number;
    pairs_count: number;
};
async function getDataset() {
    const events = (await getEvents({
        select: {
            id: true,
            date_formated: true,
            _count: { select: { pairs: true, players: true } },
        },
        orderBy: { date_formated: "asc" },
    })) as unknown as EventsGetType;
    if (!events) return null;
    const dataset = events?.map((e) => ({
        id: e.id,
        date: e.date_formated,
        pairs_count: e._count.pairs,
        players_count: e._count.players,
    })) satisfies EventDataType[];
    const dates = dataset.map((d) => {
        const _d = _dbDateParser(d.date)._dayjs;
        const [y, m, day] = [_d.year(), _d.day(), _d.date()];
        return { day, y, m };
    });

    return { dataset, dates };
}
