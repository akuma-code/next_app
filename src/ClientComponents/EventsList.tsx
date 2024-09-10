"use client";

import { QuickEventCreate } from "@/app/avangard/(main)/_components/QuickEventCreate";
import { EventViewCard } from "@/Components/EventView/EventViewCard";
import { DayOfWeek } from "@/Helpers/dateFuncs";
import { Box, Grid, Grid2 } from "@mui/material";
import { Prisma } from "@prisma/client";
import dayjs from "dayjs";
import "dayjs/locale/ru";

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
        xs: "#00771a",
        sm: "#d3ff6e",
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
    const d = (date: string) => date.replaceAll("_", ".");
    const dm = (date: string) =>
        dayjs(date, "YYYY-MM-DD", "ru").format("DD MMMM");

    const dayWeek = (d: string) =>
        DayOfWeek[dayjs(d, "DD.MM.YYYY", "ru").weekday()];

    return (
        <Box
            maxWidth={{ sm: 450, md: "100vw" }}
            bgcolor={"background.paper"}
            p={2}
            m={0}
            sx={{
                borderBottomLeftRadius: 6,
                borderBottomRightRadius: 6,
                border: "2px solid black",
                borderTop: 0,
                textAlign: "center",
            }}
        >
            {/* <Fab
                    aria-label={"add event"}
                    color={"success"}
                    href="/avangard/events/create"
                    LinkComponent={Link}
                    variant="extended"
                    sx={{ placeSelf: "center" }}
                >
                    <AddIcon />
                    Начать новую тренировку
                </Fab> */}
            <Grid2
                container
                spacing={2}
                // maxWidth={ { xs: 300, md: 450, lg: 600 } }
                maxHeight={{ sm: "60vh", md: "70vh" }}
                sx={{ pt: 1, pr: 2, overflowY: "scroll" }}
            >
                <Grid2 sx={{ position: "relative" }}>
                    <QuickEventCreate />
                </Grid2>
                {events.map((e) => (
                    <Grid2 key={e.id} maxWidth={{ sm: 300 }}>
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
