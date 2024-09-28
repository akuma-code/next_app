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
import { Avatar, Badge, Box, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useMemo, useState } from "react";
import {
    _date,
    _dbDateParser,
    _formated_date,
    Month,
} from "@/Helpers/dateFuncs";
import Icon from "@mdi/react";
import { mdiBaseball, mdiMedalOutline } from "@mdi/js";
import { tollbarLayout } from "@/app/avangard/(main)/layout";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import useMediaDetect from "@/Hooks/useMediaDetect";
import { CalendarCustomHeader } from "./CalendarCustomHeader";

import { ruRU } from "@mui/x-date-pickers/locales";
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

const LOCALE = ruRU.components.MuiLocalizationProvider.defaultProps.localeText;
export const CalendarEventsShorts = (props: { playerId: number }) => {
    const { playerId } = props;
    const { isMobile } = useMediaDetect();
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
        <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="ru"
            localeText={LOCALE}
        >
            <StaticDatePicker
                disableHighlightToday
                shouldDisableDate={(d) => !dates.includes(d.date())}
                slots={{
                    day: EventDay,
                    toolbar: CustomToolbar,
                    calendarHeader: (p) => <CalendarCustomHeader {...p} />,
                }}
                slotProps={{
                    day: { event_days: dates } as any,
                    shortcuts: {
                        items: shorts,
                        sx: {
                            height: "100%",
                            // bgcolor: "#31a2e4",
                            minWidth: 100,
                            // border: "1px solid",
                        },
                    },
                    calendarHeader: {
                        currentMonth: day ? day : undefined,
                    },

                    toolbar: {
                        toolbarFormat: "YYYY",
                        // toolbarPlaceholder: "",
                        sx: {
                            fontSize: 10,

                            fontWeight: "thin",
                        },
                        counter: shorts.length,
                    } as any,
                    layout: {
                        // onSelectShortcut(newValue, changeImportance, shortcut) {
                        //     console.log(shortcut);
                        //     return newValue;
                        // },
                        sx: {
                            height: "fit-content",
                            maxWidth: { sm: 350, md: "fit-content" },
                            borderRadius: 5,
                            border: "2px solid black",
                            bgcolor: "#31a2e493",
                        },
                        slotProps: {
                            toolbar: { sx: { fontSize: 10, bgcolor: "red" } },
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
                onMonthChange={(v) => setDay(v)}
                views={["month", "day"]}
            />
        </LocalizationProvider>
    );
};
function CustomToolbar(
    props: DatePickerToolbarProps<Dayjs> & { counter?: number }
) {
    const { value } = props;
    const [day, setDay] = useState<Dayjs | null>(dayjs());
    const currentMonth = useMemo(
        () => (value ? Month[value.month()] : ""),
        [value]
    );
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
            {props.counter && day ? (
                <Box
                    px={1}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography
                        textTransform={"uppercase"}
                        fontWeight={"bold"}
                        fontFamily={"Fira Code"}
                        textAlign={"end"}
                    >
                        {currentMonth}
                    </Typography>

                    <Typography fontSize={20}>
                        тренировок: <b>{props.counter}</b>
                    </Typography>
                </Box>
            ) : null}
            <DatePickerToolbar
                // className={props.className}
                {...props}
                value={day}
                onChange={(v) => setDay(v)}
            />
        </Box>
    );
}
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
            overlap="rectangular"
            // badgeContent={isSelected ? <BookmarkAddedRoundedIcon /> : undefined}
            sx={{
                borderRadius: "40%",
                // border: isSelected ? "1px solid red" : "",
                bgcolor: isSelected ? "lightblue" : "inherit",
                [`& .Mui-selected`]: {
                    bgcolor: "inherit",
                    fontWeight: "bold",
                    color: "primary.contrastText",
                },
            }}
            // color={isSelected ? "red" : undefined}
        >
            <PickersDay
                {...other}
                outsideCurrentMonth={outsideCurrentMonth}
                day={day}
                disableRipple
                disableTouchRipple
            />
        </Badge>
    );
}

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
