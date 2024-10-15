"use client";

import { _date, _dbDateParser } from "@/Helpers/dateFuncs";
import { Box, darken, lighten, Stack, styled, Typography } from "@mui/material";
import { Prisma } from "@prisma/client";
import dayjs from "dayjs";
dayjs.locale("ru");
export type PrismaEventRowCard = Prisma.EventGetPayload<{
    select: {
        id: true;
        date_formated: true;
        players: { select: { id: true; name: true } };
        pairs: true;
        cost: true;
        title: true;
    };
}>;
interface EventRowCardProps {
    event: PrismaEventRowCard;
}
const RowCard = styled(Box)((t) => ({
    display: "flex",
    flexDirection: "row",
    backgroundColor: t.theme.palette.background.paper,
    border: "2px solid black",
    borderRadius: 5,
    minHeight: "2rem",
    justifyContent: "space-between",
}));

export const EventRowCard = (props: EventRowCardProps) => {
    const {
        event: { id, date_formated, players, title, pairs },
    } = props;
    const date = _dbDateParser(date_formated);
    const d = date.dd_mmmm + " " + date._dayjs.year();
    // console.log(_date(date_formated));
    return (
        <RowCard
            sx={{
                p: 1,
                bgcolor:
                    players.length > 12
                        ? lighten("rgb(230, 46, 46)", 0.2)
                        : "background.paper",
            }}
        >
            <Typography>{d}</Typography>
            <Typography>{title}</Typography>
            <Typography>
                {players.length} {pairs.length > 0 && "/ " + pairs.length}
            </Typography>
        </RowCard>
    );
};
