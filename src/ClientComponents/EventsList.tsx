"use client";

import { QuickEventCreate } from "@/app/(avangard)/_components/QuickEventCreate";

import { EventViewCard } from "@/Components/EventView/EventViewCard";
import { DayOfWeek } from "@/Helpers/dateFuncs";
import { Box, Grid, Grid2 } from "@mui/material";
import { Prisma } from "@prisma/client";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { useSession } from "next-auth/react";

export type IEvent_Front = Prisma.EventGetPayload<{
    select: {
        id: true;
        date_formated: true;
        players: { select: { id: true; name: true; ticket: true } };
        pairs: true;
        cost: true;
        title: true;
        _count: { select: { players: true } };
    };
}>;
export const avatarColor = (numb: number) => {
    const colors = {
        xs: "#dcf1e0",
        sm: "#c5eb66",
        md: "#588891",
        lg: "#ffa600",
        xl: "#ff0000",
    };
    if (numb >= 16) return colors.xl;
    if (numb >= 12) return colors.lg;
    if (numb >= 9) return colors.md;
    if (numb >= 6) return colors.sm;
    if (numb >= 0) return colors.xs;
    return colors.md;
};

export const EventsList: React.FC<{
    events: Prisma.EventGetPayload<{
        select: {
            id: true;
            date_formated: true;
            players: { select: { id: true; name: true; ticket: true } };
            pairs: true;
            cost: true;
            title: true;
            _count: { select: { players: true } };
        };
    }>[];
}> = ({ events }) => {
    const { data, status } = useSession();
    const canSee = status === "authenticated";
    const dm = (date: string) =>
        dayjs(date, "YYYY-MM-DD", "ru").format("DD MMMM");

    const dayWeek = (d: string) =>
        DayOfWeek[dayjs(d, "YYYY-MM-DD", "ru").weekday()];

    return (
        <Box
            maxWidth={{ sm: 450, md: "100vw" }}
            bgcolor={"background"}
            m={0}
            sx={{
                borderRadius: 6,

                border: "2px solid black",
                textAlign: "center",
            }}
            position={"relative"}
        >
            {canSee && <QuickEventCreate />}

            <Grid2
                container
                gap={1}
                // maxWidth={ { xs: 300, md: 450, lg: 600 } }
                maxHeight={{ sm: "60vh", md: "70vh" }}
                sx={{ pt: 1, pr: 1, overflowY: "scroll" }}
                offset={{ md: 1, xs: 1 }}
                size={"auto"}
                columns={12}
            >
                {events.map((e) => (
                    <Grid2 key={e.id} size={"auto"}>
                        <EventViewCard
                            event={e}
                            title={dm(e.date_formated)}
                            subtitle={dayjs().year().toString()}
                            description={dayWeek(e.date_formated)}
                        />
                    </Grid2>
                ))}
            </Grid2>
        </Box>
    );
};
