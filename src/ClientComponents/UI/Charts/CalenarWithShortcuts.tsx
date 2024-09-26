"use client";

import { PickersShortcutsItem } from "@mui/x-date-pickers/PickersShortcuts";
import { useQuery } from "@tanstack/react-query";
import { getPlayerEvents } from "@/Services/playerService";
import {
    PickersDay,
    PickersDayProps,
    StaticDatePicker,
} from "@mui/x-date-pickers";
import { Badge } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { _date, _dbDateParser, _formated_date } from "@/Helpers/dateFuncs";

export const CalendarEventsShorts = (props: { playerId: number }) => {
    const { playerId } = props;
    const [dates, setDates] = useState<number[]>([]);
    const [string_dates, setStringDates] = useState<
        PickersShortcutsItem<dayjs.Dayjs | null>[]
    >([]);
    const q = useQuery({
        queryKey: ["player_events", playerId],
        queryFn: () => getPlayerEvents(playerId),
    });

    useEffect(() => {
        if (q.isSuccess) {
            const dates = get_event_days(q.data);
            setStringDates(dates);
            // setStringDates(q.data.events.map((e) => e.date_formated));
        }
    }, [q.data, q.isSuccess]);

    return (
        <StaticDatePicker
            slots={{
                day: EventDay,
            }}
            slotProps={{
                // day: { event_days: dates } as any,
                shortcuts: {
                    items: string_dates,
                },
            }}
        />
    );
};

function EventDay(props: PickersDayProps<Dayjs> & { event_days?: number[] }) {
    const {
        event_days,
        day,
        outsideCurrentMonth,
        isFirstVisibleCell,
        isLastVisibleCell,
        onDaySelect,
        ...other
    } = props;

    const isSelected =
        !props.outsideCurrentMonth &&
        event_days &&
        // event_days.some((d) => day.isSame(d, "day"));
        event_days.includes(props.day.date());
    //
    // console.log("day: ", props.day.date());
    return (
        <Badge
            key={props.day.toString()}
            overlap="circular"
            // badgeContent={isSelected ? "🌚" : ""}
            color={isSelected ? "primary" : undefined}
        >
            <PickersDay
                // selected={isSelected}
                {...props}
                isFirstVisibleCell={isFirstVisibleCell}
                outsideCurrentMonth={outsideCurrentMonth}
                isLastVisibleCell={isLastVisibleCell}
                onDaySelect={onDaySelect}
                day={day}
            />
        </Badge>
    );
}

const get_event_days = (p: Awaited<ReturnType<typeof getPlayerEvents>>) => {
    const { events, name, ticket, _count, id } = p;
    const M = dayjs().month();
    const today = (e: { date_formated: string }) =>
        dayjs(e.date_formated, "YYYY-MM-DD");

    const shorts: PickersShortcutsItem<Dayjs | null>[] = events.map((e) => ({
        label: _dbDateParser(e.date_formated).dd_mm_yyyy,
        getValue: () => today(e),
    }));
    const ed = events;
    // .filter((e) => dayjs(e.date_formated, "YYYY-MM-DD", "ru").month() === M)
    // .map((e) =>
    //     // (e) => dayjs(e.date_formated, "YYYY-MM-DD", "ru").date()
    //     today.isSame(e.date_formated)
    //         ? {
    //               ...e,
    //               eventDays: dayjs(
    //                   e.date_formated,
    //                   "YYYY-MM-DD",
    //                   "ru"
    //               ).date(),
    //           }
    //         : e
    // );
    return shorts;
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
