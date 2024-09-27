"use client";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { PickersShortcutsItem } from "@mui/x-date-pickers/PickersShortcuts";
import { useQuery } from "@tanstack/react-query";
import { getPlayerEvents } from "@/Services/playerService";
import {
    DateCalendar,
    DatePicker,
    DatePickerToolbar,
    DatePickerToolbarProps,
    LocalizationProvider,
    PickersDay,
    PickersDayProps,
    StaticDatePicker,
} from "@mui/x-date-pickers";
import { Badge, Box } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { _date, _dbDateParser, _formated_date } from "@/Helpers/dateFuncs";
import Icon from "@mdi/react";
import { mdiBaseball, mdiMedalOutline } from "@mdi/js";
import { tollbarLayout } from "@/app/avangard/(main)/layout";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export const CalendarEventsShorts = (props: { playerId: number }) => {
    const { playerId } = props;
    const [day, setDay] = useState<Dayjs | null>(dayjs());
    const [dates, setDates] = useState<number[]>([]);
    // const [string_dates, setStringDates] = useState<
    //     PickersShortcutsItem<dayjs.Dayjs | null>[]
    // >([]);

    const q = useQuery({
        queryKey: ["player_events", playerId],
        queryFn: () => getPlayerEvents(playerId),
    });
    const shorts = useMemo(() => {
        if (!q.isSuccess) return [];
        const shorts_event = get_event_shorts(q.data.events);
        const selected = shorts_event
            .filter((e) => e.djs.month() === day?.month())
            .reverse();

        if (!day) return shorts_event.reverse().slice(0, 6);
        return selected satisfies PickersShortcutsItem<Dayjs | null>[];
    }, [day, q.data, q.isSuccess]);

    useEffect(() => {
        const en = shorts.map((s) => s.djs.date());
        setDates(en);
    }, [shorts]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
            <StaticDatePicker
                slots={{
                    day: EventDay,
                    toolbar: CustomToolbar,
                    // actionBar: (props) => <Box {...props}>AAAAA</Box>,
                }}
                slotProps={{
                    day: { event_days: dates } as any,
                    shortcuts: {
                        items: shorts,
                        sx: { height: "fit-content" },
                    },
                    toolbar: {
                        toolbarFormat: "D MMMM",

                        sx: { textAlign: "right" },
                    },
                    layout: {
                        sx: {
                            height: "max-content",
                            width: { sm: 300, md: "fit-content" },
                        },
                    },
                    actionBar: {
                        actions: ["clear", "today"],
                    },
                }}
                loading={q.isLoading}
                renderLoading={() => (
                    <Icon path={mdiBaseball} size={4} spin={4} />
                )}
                value={day}
                onChange={(v) => setDay(v)}
                onMonthChange={(month: dayjs.Dayjs) => setDay(month)}
                views={["month", "day"]}
            />
        </LocalizationProvider>
    );
};

function EventDay(
    props: PickersDayProps<Dayjs> & {
        event_days?: number[];
    }
) {
    const {
        event_days,
        day,
        outsideCurrentMonth,

        ...other
    } = props;

    const isSelected =
        !props.outsideCurrentMonth &&
        event_days &&
        // event_days.some((d) => day.isSame(d, "day"));
        event_days.includes(day.date());
    //
    // console.log("day: ", props.day.date());
    return (
        <Badge
            key={props.day.toString()}
            overlap="circular"
            // badgeContent={isSelected ? <BookmarkAddedRoundedIcon /> : undefined}
            sx={{
                borderRadius: "50%",
                border: isSelected ? "1px solid red" : "",
            }}
            // color={isSelected ? "red" : undefined}
        >
            <PickersDay
                outsideCurrentMonth={outsideCurrentMonth}
                day={day}
                {...other}
            />
        </Badge>
    );
}

const get_event_shorts = (
    events: Awaited<ReturnType<typeof getPlayerEvents>>["events"]
) => {
    // const { events } = p;

    const shorts = events.map((e) => ({
        label: _dbDateParser(e.date_formated).dd_mmmm,
        getValue: () => _dbDateParser(e.date_formated)._dayjs,
        djs: _dbDateParser(e.date_formated)._dayjs,
    })) satisfies PickersShortcutsItem<Dayjs | null>[];

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

function CustomToolbar(props: DatePickerToolbarProps<Dayjs>) {
    return (
        <Box
            // Pass the className to the root element to get correct layout
            className={props.className}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            <DatePickerToolbar {...props} />
            <RocketLaunchIcon fontSize="large" sx={{ m: 5 }} />
        </Box>
    );
}

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
