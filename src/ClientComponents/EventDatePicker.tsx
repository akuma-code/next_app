'use client';
import { _formated_date } from "@/Helpers/dateFuncs";
import { _log } from "@/Helpers/helpersFns";
import { useEventContext } from "@/Hooks/useEventContext";
import { DatePicker, DateValidationError, PickerChangeHandlerContext } from "@mui/x-date-pickers";
import dayjs, { type Dayjs } from "dayjs";
import { usePathname, useRouter } from "next/navigation";
import { SetStateAction, useState } from "react";


interface EventDatePickerProps {
    event_date?: string
    // changeHandler?: (date: string) => void | undefined
}
export const EventDatePicker: React.FC<EventDatePickerProps> = ({ event_date }) => {
    const [eventDate, setEventDate] = useState<Dayjs | null>(() => dayjs(event_date))
    const { setDate } = useEventContext();
    const r = useRouter()
    const p = usePathname()
    const changeDate = (value: dayjs.Dayjs | null, context?: PickerChangeHandlerContext<DateValidationError>) => {
        setEventDate(value)
        r.push(p + '?date=' + _formated_date(value))
        setDate && setDate(_formated_date(value))
        context?.validationError && console.error(context.validationError)
    }
    return <DatePicker
        name="date"
        value={ eventDate }
        onChange={ changeDate }
        slotProps={ {
            textField: { size: 'small', },

        } }
        onError={ (e, value) => _log(e, { value }) } />;
}


EventDatePicker.displayName = "____EventDatePickerField"