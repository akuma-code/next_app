'use client'

import { _formated_date } from "@/Helpers/dateFuncs"
import { _log } from "@/Helpers/helpersFns"
import { DateCalendar } from "@mui/x-date-pickers"
import dayjs from "dayjs"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { Suspense, useCallback, useEffect, useMemo, useState } from "react"

const today = dayjs()
interface EventCalendarProps {
    getCurrentDate?: (date: string) => void
}

const EventCalendar: React.FC<EventCalendarProps> = ({ getCurrentDate }) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const selectedDate = searchParams.has('date') ? dayjs(searchParams.get('date')) : dayjs()
    const path = usePathname()
    const [currentDate, setDate] = useState(() => dayjs(selectedDate))
    // Get a new searchParams string by merging the current
    // searchParams with a provided key/value pair
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const f = _formated_date(value)
            const params = new URLSearchParams(searchParams.toString())

            params.set(name, f)
            _log({ params: params.toString(), f })
            router.push(path + '?' + params.toString())
            // return params.toString()

        },
        [searchParams]
    )
    const DATE = useMemo(() => _formated_date(currentDate), [currentDate])
    // useEffect(() => {
    //     getCurrentDate && getCurrentDate(DATE)
    // }, [DATE])
    return (
        <>
            {/* <Suspense fallback={ <div>load</div> }> */ }

            <DateCalendar
                referenceDate={ currentDate }
                showDaysOutsideCurrentMonth={ true }
                onChange={ (v) => {
                    setDate(prev => v)
                    createQueryString('date', v)
                    _log({ DATE })
                    getCurrentDate && getCurrentDate(DATE)
                } }
                value={ currentDate }

            />

            {/* </Suspense> */ }


        </>
    )
}
EventCalendar.displayName = "___EventCalendar"
export default EventCalendar