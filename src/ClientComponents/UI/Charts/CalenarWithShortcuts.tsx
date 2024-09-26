"use client";

import { PickersShortcutsItem } from "@mui/x-date-pickers/PickersShortcuts";
import { useQuery } from "@tanstack/react-query";
import { getPlayerEvents } from "@/Services/playerService";
import { DateCalendar, PickersDay, PickersDayProps } from "@mui/x-date-pickers";
import { Badge } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { _date, _formated_date } from "@/Helpers/dateFuncs";

export const CalendarEventsShorts = (props: { playerId: number }) => {
    const { playerId } = props;
    const [dates, setDates] = useState<number[]>([]);
    const [string_dates, setStringDates] = useState<string[]>([]);
    const q = useQuery({
        queryKey: ["player_events", playerId],
        queryFn: () => getPlayerEvents(playerId),
    });

    useEffect(() => {
        if (q.isSuccess) {
            const dates = get_event_days(q.data).eventDays;
            setDates(dates);
            // setStringDates(q.data.events.map((e) => e.date_formated));
        }
    }, [q.data, q.isSuccess]);

    return (
        <DateCalendar
            slots={{
                day: EventDay,
            }}
            slotProps={{
                day: dates as any,
            }}
        />
    );
};

function EventDay(props: PickersDayProps<Dayjs> & { event_days?: number[] }) {
    const { event_days = [], day, outsideCurrentMonth, ...other } = props;

    const isSelected = event_days.includes(props.day.date());
    //  !props.outsideCurrentMonth &&
    // console.log("day: ", props.day.date());
    return (
        <Badge
            key={props.day.toString()}
            overlap="circular"
            badgeContent={isSelected ? "🌚" : undefined}
        >
            <PickersDay {...other} outsideCurrentMonth={false} day={day} />
        </Badge>
    );
}

const get_event_days = (p: Awaited<ReturnType<typeof getPlayerEvents>>) => {
    const { events, name, ticket, _count, id } = p;
    const M = dayjs().month() + 1;

    const ed = events.map((e) =>
        M === _date(e.date_formated).encoded.m
            ? dayjs(e.date_formated, "YYYY-MM-DD", "ru").date()
            : 0
    );
    return { eventDays: ed };
};
