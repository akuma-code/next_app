"use client";

import { aggregatePlayers } from "@/Services/events/db_event";
import { getPlayers } from "@/Services/playerService";
import { Alert, Box, Fade, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { useQuery } from "@tanstack/react-query";
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
    const fn = getPlayers.bind(null, { events: true });
    const q = useQuery({
        queryKey: ["players_aggregate"],
        queryFn: getData,
        select: (data) => data.filter((d) => d._count.events > 5),
        // select: (data) => data.filter((d) => d.events),
    });

    const dataset = useMemo(() => {
        const _ds = q?.data?.map((p) => ({
            events: p._count.events,
            name: p.name,
        }));

        return _ds;
    }, [q?.data]);
    // useEffect(() => {
    //     if (!lastId) setCurrent(undefined);
    //     start(async () => {
    //         const e = await getDBOneEventData(
    //             { id: lastId },
    //             {
    //                 id: true,
    //                 date_formated: true,
    //                 players: true,
    //                 pairs: true,
    //                 eventInfo: false,
    //             }
    //         );
    //         setCurrent(e as any);
    //     });
    // }, [lastId]);

    return (
        // <Fade in={q.isFetching}>
        <Box>
            <Typography>Last Id: {lastId} </Typography>
            {q.error && <Alert>{q.error.message}</Alert>}
            <BarChart
                dataset={dataset}
                series={[{ dataKey: "events" }]}
                yAxis={[
                    {
                        dataKey: "name",
                        scaleType: "band",
                        valueFormatter: (value) => value.split(" ")[1],
                    },
                ]}
                width={400}
                height={400}
                layout="horizontal"
            />
        </Box>
        // </Fade>
    );
};
