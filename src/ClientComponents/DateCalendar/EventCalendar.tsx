'use client'

import { _log } from "@/Helpers/helpersFns"
import { Divider } from "@mui/material"
import { DateCalendar, DateView } from "@mui/x-date-pickers"
import { PickerSelectionState } from "@mui/x-date-pickers/internals"
import dayjs from "dayjs"
import Link from "next/link"
import { useParams, useSearchParams } from "next/navigation"
import { Suspense, useCallback, useState } from "react"


const EventCalendar = () => {
    const [value, setValue] = useState<any | undefined>()
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

    const today = dayjs(value)
    return (
        <>
            <Suspense fallback={ <div>load</div> }>

                <DateCalendar
                    showDaysOutsideCurrentMonth={ true }
                    onChange={ (v) => {
                        _log(dayjs(v))
                        const date = [+v.$y, +v.$M + 1, +v.$D]
                        setValue(date.join('-'))
                        const s = createQueryString('date', value)

                        return s
                    } }


                />
            </Suspense>

        </>
    )
}

export default EventCalendar