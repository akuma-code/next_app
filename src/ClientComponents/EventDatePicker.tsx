'use client';
import { _formated_date } from "@/Helpers/dateFuncs";
import { _log } from "@/Helpers/helpersFns";
import { useEventContext } from "@/Hooks/useEventContext";
import { DatePicker, DateValidationError, PickerChangeHandlerContext } from "@mui/x-date-pickers";
import dayjs, { type Dayjs } from "dayjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SetStateAction, useState } from "react";


interface EventDatePickerProps {
    event_date?: string
    // changeHandler?: (date: string) => void | undefined
}
export const EventDatePicker: React.FC<EventDatePickerProps> = ({ event_date }) => {
    const search = useSearchParams()
    const { setDate } = useEventContext();

    const selectedDate = search.get('date')
    const init = search.has('date')
        ? dayjs(selectedDate, "DD_MM_YYYY")
        : !!event_date
            ? dayjs(event_date, "DD_MM_YYYY")
            : dayjs()
    const [eventDate, setEventDate] = useState<Dayjs | null>(() => init)
    // const { setDate } = useEventContext();
    const r = useRouter()
    const p = usePathname()
    const changeDate = (value: Dayjs | null, context?: PickerChangeHandlerContext<DateValidationError>) => {
        context?.validationError && console.error(context.validationError)
        setEventDate(value)
        r.push(p + '?date=' + _formated_date(value))
        setDate && setDate(_formated_date(value))
    }
    return <DatePicker
        name="date"
        value={ eventDate }
        onChange={ changeDate }
        slotProps={ {
            textField: { size: 'small', },
            // shortcuts: {
            //     items: [
            //         {
            //             label: 'Среда',
            //             getValue: (props) => {
            //                 const today = dayjs()
            //                  return today.month().day(3)

            //             }
            //         },
            //         {
            //             label: 'Пятница',
            //             getValue: (props) => {

            //                 return dayjs().day(4)
            //             }
            //         },
            //     ]
            // },
        } }

    />;
}


EventDatePicker.displayName = "____EventDatePickerField"