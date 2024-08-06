"use client";
import { BarSeriesType } from "@mui/x-charts";
import React, { useEffect, useMemo, useState, useTransition } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { getEvents, ThenArg } from "@/Services/events/eventActions";
import { _dbDateParser } from "@/Helpers/dateFuncs";

const uData = [4000, 4000];
const pData = [2400, 1398];
const xLabels = ["Page A", "Page B"];
type EventsGetType = ThenArg<ReturnType<typeof getEvents>>;

export default function StackedBarChart() {
    const [loading, start] = useTransition();
    const [eventsData, setEventsData] = useState<EventsGetType>([]);

    const chart_data = useMemo(() => {
        // if (!eventsData) return [];
        const data = eventsData?.map((d: any) => ({
            date: d.date_formated as string,
            players: d._count.players as number,
            duos: d._count.pairs as number,
        }));

        return data ?? [];
    }, []);

    useEffect(() => {
        start(async () => {
            await getData().then((result) => setEventsData(result));
        });
    }, []);
    console.log(eventsData && eventsData[0]);
    return (
        <BarChart
            width={400}
            height={300}
            series={[
                {
                    data: chart_data.map((c) => c.players),
                    label: "Players",
                    id: "pid",
                    stack: "total",
                },
                {
                    data: chart_data.map((c) => c.duos),
                    label: "Pairs",
                    id: "mid",
                    stack: "total",
                },
            ]}
            xAxis={[
                {
                    data: chart_data.map((c) => _dbDateParser(c.date).dd_mmmm),
                    scaleType: "band",
                },
            ]}
            title="Events"
            loading={loading}
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
    const data: EventsGetType = await getEvents({
        select: {
            date_formated: true,
            players: true,
            pairs: true,
            _count: { select: { pairs: true, players: true } },
        },
        orderBy: { date_formated: "asc" },
    });

    return data;
}
