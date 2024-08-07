"use client";

import { aggregatePlayers } from "@/Services/events/db_event";
import { getPlayers } from "@/Services/playerService";
import { Alert, Box, Fade, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
interface BoardProps {
    lastId?: number;
}
async function getData() {
    return await getPlayers().then(
        (res) => res.filter((p) => p._count.events > 0) || []
    );
}
export const Board: React.FC<BoardProps> = ({ lastId }) => {
    const q = useQuery({
        queryKey: ["players_aggregate"],
        queryFn: getData,
        select: (data) => data.filter((d) => d._count.events >= 3),
        placeholderData: keepPreviousData,
    });

    const dataset = useMemo(() => {
        if (!q.isSuccess) {
            return [];
        }
        const _ds = q.data.map((p) => ({
            events: p._count.events,
            name: p.name,
        }));

        return _ds;
    }, [q.data, q.isSuccess]);

    return (
        // <Fade in={q.isFetching}>
        <Box>
            {/* <Typography>Last Id: {lastId} </Typography> */}
            {q.error && <Alert>{q.error.message}</Alert>}
            {dataset && (
                <BarChart
                    dataset={dataset}
                    width={400}
                    height={700}
                    series={[{ dataKey: "events", label: "Кол-во тренировок" }]}
                    yAxis={[
                        {
                            tickPlacement: "end",
                            tickSize: 10,
                            dataKey: "name",
                            scaleType: "band",
                        },
                    ]}
                    layout="horizontal"
                    loading={!q.data}
                    margin={{ left: 150 }}
                    barLabel={"value"}
                />
            )}
        </Box>
        // </Fade>
    );
};
