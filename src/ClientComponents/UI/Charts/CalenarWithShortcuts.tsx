"use client";

import { PickersShortcutsItem } from "@mui/x-date-pickers/PickersShortcuts";
import { useQuery } from "@tanstack/react-query";
import { getPlayerEvents } from "@/Services/playerService";
import {
    DateCalendar,
    PickersDay,
    PickersDayProps,
    StaticDatePicker,
} from "@mui/x-date-pickers";
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
        <StaticDatePicker
            slots={
                {
                    // day: EventDay,
                }
            }
            slotProps={{
                // day: dates as any,
                shortcuts: {
                    items: shortcutsItems,
                },
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

const getMonthWeekday = (
    monthIndex: number,
    weekdayIndex: number,
    dayRank: number
) => {
    // Helper to find the nth weekday in a given month.
    // For example, Find the 3rd Monday in January.
    const today = dayjs();
    const firstDayOfMonth = today.month(monthIndex).startOf("month");
    const weekDay = firstDayOfMonth.day(); // 0 (Sunday) to 6 (Saturday)

    const deltaToFirstValidWeekDayInMonth =
        (weekDay > weekdayIndex ? 7 : 0) + weekdayIndex - weekDay;
    return firstDayOfMonth.add(
        (dayRank - 1) * 7 + deltaToFirstValidWeekDayInMonth,
        "day"
    );
};

const shortcutsItems: PickersShortcutsItem<Dayjs | null>[] = [
    {
        label: "New Year's Day",
        getValue: () => {
            // (January 1)
            const today = dayjs();
            return today.month(0).date(1);
        },
    },
    {
        label: "Birthday of MLK Jr.",
        getValue: () => {
            // (third Monday in January)
            return getMonthWeekday(0, 1, 3);
        },
    },
    {
        label: "Independence Day",
        getValue: () => {
            // (July 4)
            const today = dayjs();
            return today.month(6).date(4);
        },
    },
    {
        label: "Labor Day",
        getValue: () => {
            // (first Monday in September)
            return getMonthWeekday(8, 1, 1);
        },
    },
    {
        label: "Veterans Day",
        getValue: () => {
            // (November 11)
            const today = dayjs();
            return today.month(10).date(11);
        },
    },
    {
        label: "Thanksgiving Day",
        getValue: () => {
            // (fourth Thursday in November)
            return getMonthWeekday(10, 4, 4);
        },
    },
    {
        label: "World AIDS Day",
        getValue: () => {
            // (December 1)
            const today = dayjs();
            return today.month(11).date(1);
        },
    },
    {
        label: "Christmas Day",
        getValue: () => {
            // (December 25)
            const today = dayjs();
            return today.month(11).date(25);
        },
    },
];
