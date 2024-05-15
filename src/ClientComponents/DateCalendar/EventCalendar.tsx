'use client'

import { _log } from "@/Helpers/helpersFns"
import { createEvent } from "@/Services/eventService"
import { Button, Divider, List, ListItem, ListItemButton } from "@mui/material"
import { DateCalendar, DateView } from "@mui/x-date-pickers"
import { PickerSelectionState } from "@mui/x-date-pickers/internals"
import dayjs, { Dayjs } from "dayjs"
import Link from "next/link"
import { useRouter, redirect, useParams, usePathname, useSearchParams } from "next/navigation"

import { Suspense, useCallback, useState } from "react"

const today = dayjs()

const EventCalendar: React.FC = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const selectedDate = searchParams.has('date') ? dayjs(searchParams.get('date')) : today
    const path = usePathname()
    const [value, setValue] = useState(dayjs(selectedDate))
    // Get a new searchParams string by merging the current
    // searchParams with a provided key/value pair
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, dayjs(value).format())
            router.push(path + '?' + params.toString())
            // return params.toString()
        },
        [searchParams]
    )

    return (
        <>
            <Suspense fallback={ <div>load</div> }>

                <DateCalendar
                    referenceDate={ selectedDate }
                    showDaysOutsideCurrentMonth={ true }
                    onChange={ (v) => {
                        setValue(prev => v)
                        createQueryString('date', v)
                    } }
                    value={ value }

                />

            </Suspense>


        </>
    )
}
EventCalendar.displayName = "___EventCalendar"
export default EventCalendar