"use client";

import { DayOfWeek, Month, _dbDateParser } from "@/Helpers/dateFuncs";
import { _log } from "@/Helpers/helpersFns";
import {
    Box,
    Divider,
    Grid,
    Grow,
    List,
    ListItem,
    ListItemText,
    Paper,
    Typography,
} from "@mui/material";
import { Prisma } from "@prisma/client";
import dayjs from "dayjs";

type EventListProps = {
    event_info: {
        id: number;
        name: string;
        events: {
            id: number;
            date_formated: string;
        }[];
        _count: {
            events: number;
        };
        ticket: Prisma.TicketGetPayload<true> | null;
    } | null;
};
export const PlayersEventList = ({ event_info }: EventListProps) => {
    if (!event_info) {
        return (
            <Typography
                variant="body1"
                component={"div"}
                textAlign={"center"}
                fontSize={15}
            >
                У выбранного игрока тренировок не было
            </Typography>
        );
    }
    const { events, id, name, _count, ticket } = event_info;

    const date = (_date: string) => {
        const dat = dayjs(_date, "YYYY-MM-DD", "ru")
            .format("DD.MMMM")
            .split(".")
            .join(" ");
        const splited = dat.split(".");
        const [d, m, y] = splited;

        const month = Month[dayjs(+m).month()];
        const day = DayOfWeek[dayjs(+d).day()];
        return { dat, month, day, year: y };
    };
    const text = (d: string, c?: string) =>
        `${date(d).dat}     ${c ? " \nтренер: " + c : ""}`;
    return (
        <Box
            component={Paper}
            elevation={3}
            borderRadius={4}
            p={2}
            width={350}
            maxHeight={"70vh"}
        >
            <Grow in={events.length > 0}>
                <Grid container gridRow={"auto"} columns={12}>
                    <Grid item sm={12} md={12}>
                        <Typography
                            variant="h5"
                            component={"div"}
                            textAlign={"center"}
                            fontSize={20}
                        >
                            {name}
                        </Typography>
                        <Divider flexItem>тренировок: {_count.events}</Divider>
                    </Grid>

                    <Grid item sm={12} md={6} display={"flex"}>
                        <List
                            dense
                            disablePadding
                            sx={{ overflow: "auto", maxHeight: "70vh" }}
                        >
                            {events
                                .sort((a, b) =>
                                    b.date_formated.localeCompare(
                                        a.date_formated,
                                        "ru"
                                    )
                                )
                                .map((e, idx) => {
                                    const { d, m } = splitDate(e.date_formated);
                                    return (
                                        // <ListItem >
                                        <ListItemText
                                            key={e.id}
                                            primary={text(e.date_formated)}
                                            primaryTypographyProps={{
                                                textAlign: "left",
                                                fontSize: 18,
                                                marginInlineStart: 2,
                                                color: "primary",
                                            }}
                                            secondaryTypographyProps={{
                                                textAlign: "left",
                                                marginInlineStart: 2,
                                            }}
                                        />
                                        // </ListItem>
                                    );
                                })}
                        </List>
                    </Grid>
                </Grid>
            </Grow>
        </Box>
    );
};

const splitDate = (date: string) => {
    const [d, m, y] = dayjs(date, "YYYY-MM-DD", "ru")
        .format("DD.MM.YYYY")
        .split(".")
        .map(Number);
    return { d, m, y } as const;
};
