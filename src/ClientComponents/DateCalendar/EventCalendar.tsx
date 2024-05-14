'use client'

import { _log } from "@/Helpers/helpersFns"
import { createEvent } from "@/Services/eventService"
import { Button, Divider } from "@mui/material"
import { DateCalendar, DateView } from "@mui/x-date-pickers"
import { PickerSelectionState } from "@mui/x-date-pickers/internals"
import dayjs, { Dayjs } from "dayjs"
import Link from "next/link"
import { redirect, useParams, useSearchParams } from "next/navigation"
import { Suspense, useCallback, useState } from "react"

const today = dayjs()

const EventCalendar: React.FC = () => {
    const [value, setValue] = useState<Dayjs>(dayjs())
    const searchParams = useSearchParams()

    // Get a new searchParams string by merging the current
    // searchParams with a provided key/value pair
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )
    const _date = dayjs(value).format()
    const createEv = createEvent.bind(null, _date)
    return (
        <>
            <Suspense fallback={ <div>load</div> }>

                <DateCalendar
                    showDaysOutsideCurrentMonth={ true }
                    onChange={ (v) => {

                        const date = [+v.$y, +v.$M, +v.$D]
                        const _d = dayjs(v)
                        setValue(_d)
                        const s = createQueryString('date', value.format('DD-MM-YYYY'))
                        _log(s)
                        return s
                    } }
                    value={ value }

                />

                <Button variant="contained" onClick={ async () => await createEv() }>
                    Create Event
                </Button>
            </Suspense>

        </>
    )
}
EventCalendar.displayName = "___EventCalendar"
export default EventCalendar