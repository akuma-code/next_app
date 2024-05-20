'use client';
import { _formated_date } from "@/Helpers/dateFuncs";
import { DatePicker, DateValidationError, PickerChangeHandlerContext } from "@mui/x-date-pickers";
import dayjs, { type Dayjs } from "dayjs";
import { SetStateAction, useState } from "react";
type DateChangeHandler = (v: Dayjs) => void;

interface EventDatePickerProps {
    event_date?: string
    changeHandler?: (date: string) => void | undefined
}
export function EventDatePicker({ event_date, changeHandler }: EventDatePickerProps) {
    const [eventDate, setEventDate] = useState<Dayjs | null>(dayjs(event_date))
    const changeDate = (value: dayjs.Dayjs | null, context?: PickerChangeHandlerContext<DateValidationError>) => {
        setEventDate(value)
        changeHandler && changeHandler(_formated_date(value))
    }
    return <DatePicker
        name="date"
        value={ eventDate }
        onChange={ changeDate }
        slotProps={ {
            textField: { size: 'small', },
        } } />;
}
