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
    });

    if (q.error) return <Alert>{q.error.message}</Alert>;
    if (!q.isSuccess) return null;
    return (
        <BarChart
            height={700}
            width={400}
            dataset={q.data}
            series={[
                {
                    dataKey: "players_count",
                    label: "Общая",
                    stack: "ex",
                    id: "psIds",
                },
                {
                    dataKey: "pairs_count",
                    label: "Индивидуально",
                    stack: "ex",
                    stackOrder: "descending",
                    id: "paIds",
                },
                // {
                //     dataKey: "total",
                //     label: (location) =>
                //         location === "tooltip" ? "Всего человек" : "Всего",
                //     stack: "total",
                //     id: "totalId",
                // },
            ]}
            yAxis={[
                {
                    dataKey: "date",
                    scaleType: "band",
                    valueFormatter: (value, ctx) =>
                        _dbDateParser(value)._dayjs.format("DD MMMM"),
                },
            ]}
            title="Тренировки"
            loading={q.isLoading}
            layout="horizontal"
            margin={{ left: 100 }}
            barLabel={"value"}
        />
    );
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
        take: 10,
        orderBy: { date_formated: "desc" },
    })) as unknown as EventsGetType;
    if (!events) return null;
    const dataset = events?.map((e) => ({
        id: e.id,
        date: e.date_formated,
        pairs_count: e._count.pairs,
        players_count: e._count.players - e._count.pairs,
        total: e._count.players,
    })) satisfies EventDataType[];
    const dates = dataset.map((d) => {
        const _d = _dbDateParser(d.date)._dayjs;
        const [y, m, day] = [_d.year(), _d.day(), _d.date()];
        return { day, y, m };
    });

    return { dataset, dates };
}
