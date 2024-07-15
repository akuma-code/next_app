"use client";

import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import db_data from "@/dataStore/allData/all_data.json";
// console.table(db_data);
async function getData() {
    return db_data;
}

export const ClientBackup = () => {
    const q = useQuery({
        queryKey: ["/api/backup"],
        queryFn: getData,
        select: (data) => {
            let { events, pairs, players } = data;
            events.map((e) => ({
                date_formated: e.date_formated,
                id: e.id,
                title: e.title,
                players: e.players.map((p) => ({ id: p.id, name: p.name })),
                pairs: e.pairs.map((pp) => ({
                    id: pp.id,
                    eventId: pp.eventId,
                    masterId: pp.masterId,
                    playerId: pp.playerId,
                })),
            }));
            pairs.map((p) => ({ masterId: p.masterId, playerId: p.playerId }));
            return { events, pairs };
        },
    });
    // q.isSuccess && console.log(q.data);
    return (
        <Box>
            {q.error && <Box>{q.error.message}</Box>}
            {q.isSuccess && (
                <Box color={"success"}>
                    {q.data.events.map((e) => (
                        <Typography key={e.id}>{e.date_formated}</Typography>
                    ))}
                </Box>
            )}
        </Box>
    );
};
