"use client";

import { Month } from "@/Helpers/dateFuncs";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { PickersCalendarHeaderProps } from "@mui/x-date-pickers/PickersCalendarHeader";
import { Dayjs } from "dayjs";

const CustomCalendarHeaderRoot = styled("div")({
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 16px",
    alignItems: "center",
});

export function CalendarCustomHeader(props: PickersCalendarHeaderProps<Dayjs>) {
    const { currentMonth, onMonthChange, ...rest } = props;

    const selectNextMonth = () =>
        onMonthChange(currentMonth.add(1, "month"), "left");
    const selectPreviousMonth = () =>
        onMonthChange(currentMonth.subtract(1, "month"), "right");
    // const selectNextYear = () =>
    //     onMonthChange(currentMonth.add(1, "year"), "left");
    // const selectPreviousYear = () =>
    //     onMonthChange(currentMonth.subtract(1, "year"), "right");
    const localeMonth = Month[currentMonth.month()];
    return (
        <Box bgcolor={"inherit"}>
            <CustomCalendarHeaderRoot>
                <Stack spacing={1} direction="row">
                    <IconButton
                        onClick={selectPreviousMonth}
                        title="Предыдущий месяц"
                        edge="start"
                        sx={{ border: "2px solid" }}
                    >
                        <KeyboardDoubleArrowLeftIcon />
                    </IconButton>
                </Stack>
                <Typography variant="body1" fontWeight={"bold"}>
                    {localeMonth}
                </Typography>
                <Stack spacing={1} direction="row">
                    <IconButton
                        onClick={selectNextMonth}
                        title="Следующий месяц"
                        sx={{ border: "2px solid" }}
                        edge="start"
                    >
                        <KeyboardDoubleArrowRightIcon />
                    </IconButton>
                </Stack>
            </CustomCalendarHeaderRoot>
        </Box>
    );
}
