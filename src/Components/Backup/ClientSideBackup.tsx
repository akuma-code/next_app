"use client";

import { alpha, Box, Button, Typography } from "@mui/material";
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
                ...e,
                date_formated: e.date_formated,
                id: e.id,
                title: e.title,
                players: e.players.map((p) => ({ id: p.id, name: p.name })),
            }));
            pairs.map((p) => ({
                masterId: p.firstPlayerId,
                playerId: p.secondPlayerId,
            }));
            return { events, pairs };
        },
    });

    const exportData = () => {
        const data = q.data;
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(data)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "data.json";

        link.click();
    };
    // q.isSuccess && console.log(q.data);
    return (
        <Box>
            <Button
                onClick={exportData}
                variant="contained"
                color={"info"}
                sx={{
                    bgcolor: (theme) => alpha(theme.palette.primary.dark, 0.7),
                }}
            >
                Сохранить json на диск
            </Button>
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
