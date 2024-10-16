"use client";

import { stringifyMonth } from "@/Helpers/dateFuncs";
import { useQuerySearch } from "@/Hooks/useQuerySearch";
import { mdiCalendar, mdiCloseBox } from "@mdi/js";
import Icon from "@mdi/react";
import { MobileDatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import React from "react";

function MonthPicker() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const qcreate = useQuerySearch();
    function handleChangeDate(
        value: Dayjs | null
        //  context: PickerChangeHandlerContext<DateValidationError>
    ) {
        // props.changeHandler(value);
        const search = qcreate("month", stringifyMonth(dayjs(value).month()));

        router.push(`${pathname}?${search}`);
    }
    return (
        <MobileDatePicker
            views={["month"]}
            selectedSections={"month"}
            onMonthChange={handleChangeDate}
            name="month"
            openTo="month"
            closeOnSelect
            label="Выбрать месяц" // open={ open }
            // onClose={ () => setOpen(false) }
            // onOpen={ () => setOpen(true) }
            slots={
                {
                    // day: highlightDate,
                }
            }
            slotProps={{
                layout: {
                    sx: {
                        color: "#ffffff",
                        borderRadius: "4px",
                        borderWidth: "3px",
                        borderColor: "#93af15",
                        border: "3px solid",
                        backgroundColor: "#0d72ca",
                        textAlign: "center",
                    },
                },
                textField: {
                    variant: "outlined",
                    size: "small",
                },
                monthButton: {
                    sx: {
                        borderRadius: ".7rem",
                    },
                },
                field: {
                    sx: {
                        backgroundColor: "error",
                        cursor: "pointer",
                    },
                    clearable: true,
                    InputProps: {
                        endAdornment: <Icon path={mdiCalendar} size={1} />,
                    },
                },
            }}
        />
    );
}

export default MonthPicker;
