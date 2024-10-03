"use client";

import { _date } from "@/Helpers/dateFuncs";
import { getPlayers } from "@/Services/playerService";
import { Alert } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
interface BoardProps {
    lastId?: number;
}
async function getData() {
    return await getPlayers();
}
export const Board: React.FC<BoardProps> = ({ lastId }) => {
    const [config, setConfig] = useState({ rpp: 15, pageIndex: 0 });
    const q = useQuery({
        queryKey: ["players", config.rpp],
        queryFn: getData,
        select: (data) => data.slice(0, config.rpp),
        placeholderData: keepPreviousData,
    });

    const dataset = useMemo(() => {
        const _ds = q.data?.map((p) => ({
            events: p._count.events,
            name: p.name,
            pairs: p.pair.length,
        }));

        return _ds;
    }, [q.data]);
    return (
        // <Fade in={q.isFetching}>
        <>
            {/* <Typography>Last Id: {lastId} </Typography> */}
            {q.error && <Alert>{q.error.message}</Alert>}
            {dataset && (
                <BarChart
                    dataset={dataset}
                    width={360}
                    height={600}
                    series={[
                        { dataKey: "events", label: "Кол-во тренировок" },
                        { dataKey: "pairs", label: "С тренером" },
                    ]}
                    yAxis={[
                        {
                            tickPlacement: "end",
                            tickSize: 10,
                            dataKey: "name",
                            scaleType: "band",
                        },
                    ]}
                    layout="horizontal"
                    loading={q.isLoading}
                    margin={{ left: 150 }}
                    barLabel={"value"}
                />
            )}
        </>
        // </Fade>
    );
};
