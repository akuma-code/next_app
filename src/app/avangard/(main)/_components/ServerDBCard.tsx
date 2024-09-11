"use client";

import { getLocal_db, PrismaEventResponse } from "@/app/admin/compare/actions";
import { _dbDateParser } from "@/Helpers/dateFuncs";
import { LocalDiningTwoTone } from "@mui/icons-material";
import {
    Alert,
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export function Server_DB_Card({
    take,
    skip,
    order,
}: {
    take?: number;
    skip?: number;
    order?: "asc" | "desc";
}) {
    const q = useQuery({
        queryKey: ["events", { take, skip, order }],
        queryFn: () => getData(take, skip),
    });
    const events_data = useMemo(() => {
        return (
            q.data?.map((e) => ({
                id: e.id,
                date: _dbDateParser(e.date_formated).dd_mmmm,
            })) || []
        );
    }, [q.data]);
    if (q.isError) {
        return <Alert>{q.error.message}</Alert>;
    }

    return (
        <Card elevation={3} sx={{ maxHeight: "50vh", overflow: "auto" }}>
            <CardHeader title={"Server"} />
            <Divider></Divider>
            <CardContent>
                {q.isLoading && (
                    <Alert color="warning" icon={<LocalDiningTwoTone />}>
                        Loading...
                    </Alert>
                )}
                {events_data.map((e, idx) => (
                    <Box key={e.id}>{e.date}</Box>
                ))}
            </CardContent>
        </Card>
    );
}

async function getData(take?: number, skip?: number, order?: "asc" | "desc") {
    const t = `${take ? "?take=" + take : ""}`;
    const s = `${skip ? "&skip=" + skip : ""}`;
    const o = `&order=${order}`;
    const search = t + o + s;
    const db = await fetch(
        "https://akumadev-git-auth-akuma-codes-projects.vercel.app/api/db/event" +
            search
    );
    console.log(t + s);
    return db.json() as unknown as PrismaEventResponse[];
}
