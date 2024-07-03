"use client";

import { _log } from "@/Helpers/helpersFns";
import { stringToColor } from "@/Helpers/stringToColor";
import { OpenInFullTwoTone } from "@mui/icons-material";
import { Box, Button, Fab, Grid, Zoom } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { DayOfWeek } from "@/Helpers/dateFuncs";
import { EventViewCard } from "@/Components/EventView/EventViewCard";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
export interface IEvent_Front {
    id: number;
    date_formated: string;
    title?: string | null;
    players: {
        id: number;
        name: string;
    }[];
    _count?: { players: number };
}

export const avatarColor = (numb: number) => {
    const colors = {
        xs: "#01ff38",
        sm: "#d3ff6e",
        md: "#6ba732",
        lg: "#ffa600",
        xl: "#ff0000",
    };
    if (numb >= 16) return colors.xl;
    if (numb >= 12) return colors.lg;
    if (numb >= 9) return colors.md;
    if (numb > 6) return colors.sm;
    if (numb >= 0) return colors.xs;
    return colors.md;
};

export const EventsList: React.FC<{ events: IEvent_Front[] }> = ({
    events,
}) => {
    const d = (date: string) => date.replaceAll("_", ".");
    const dm = (date: string) =>
        dayjs(date, "DD_MM_YYYY", "ru").format("DD MMMM");

    const dayWeek = (d: string) =>
        DayOfWeek[dayjs(d, "DD.MM.YYYY", "ru").weekday()];

    return (
        <Box
            maxWidth={{ sm: 450, md: 600 }}
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
            <Zoom
                in={!!events}
                timeout={300}
                // unmountOnExit
            >
                <Fab
                    aria-label={"add event"}
                    color={"success"}
                    href="/avangard/events/create"
                    LinkComponent={Link}
                    variant="extended"
                    sx={{ placeSelf: "center" }}
                >
                    <AddIcon />
                    Начать новую тренировку
                </Fab>
            </Zoom>
            <Grid
                container
                spacing={2}
                // maxWidth={ { xs: 300, md: 450, lg: 600 } }
                maxHeight={{ sm: "60vh", md: "70vh" }}
                sx={{ pt: 1, pr: 2, overflowY: "scroll" }}
            >
                {events.map((e) => (
                    <Grid
                        key={e.id}
                        item
                        sm={6}
                        md={4}
                        xl={3}
                        maxWidth={{ sm: 300 }}
                    >
                        <EventViewCard
                            event={e}
                            title={dm(e.date_formated)}
                            subtitle={dayjs().year().toString()}
                            description={dayWeek(e.date_formated)}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
