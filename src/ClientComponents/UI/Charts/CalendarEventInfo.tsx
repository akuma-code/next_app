"use client";

import { _dbDateParser } from "@/Helpers/dateFuncs";
import { getEvent } from "@/Services/events/db_event";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    ListSubheader,
    List,
    ListItemText,
    CircularProgress,
} from "@mui/material";
import { Prisma } from "@prisma/client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { DialogProps } from "@toolpad/core";

export function CalendarEventInfo(
    props: DialogProps<number, void>
    //  {
    //     payload: number;
    //     open: boolean;
    //     onClose: (res: unknown) => Promise<void>;
    // }
) {
    const { payload: eventId } = props;

    const q = useQuery({
        queryKey: ["event", eventId],
        queryFn: () => getEventInfo(eventId),
        placeholderData: keepPreviousData,
        select: (data) => ({
            ...data,
            players: data.players.sort((a, b) => a.name.localeCompare(b.name)),
        }),
    });
    if (q.isLoading) return <CircularProgress color="success" />;
    if (!q.isSuccess) return null;
    const date = _dbDateParser(q.data?.date_formated).dd_mmmm;
    return (
        <Dialog
            open={props.open}
            onClose={() => props.onClose()}
            scroll="paper"
        >
            <DialogTitle>{date}</DialogTitle>
            <DialogContent>
                <ListSubheader sx={{ fontSize: 18, fontWeight: "bold" }}>
                    Всего: {q.data?.players.length}
                </ListSubheader>
                <List>
                    {q.data?.players.map((p) => (
                        <ListItemText key={p.id} primary={p.name} />
                    ))}
                </List>
            </DialogContent>
        </Dialog>
    );
}

async function getEventInfo(eventId: number) {
    const e = (await getEvent({
        where: { id: eventId },
        select: {
            date_formated: true,
            players: { select: { name: true, id: true } },
            title: true,
        },
    })) as unknown as Prisma.EventGetPayload<{
        select: {
            date_formated: true;
            players: { select: { id: true; name: true } };
            title: true;
        };
    }>;
    return e;
}
