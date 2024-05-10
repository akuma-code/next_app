'use client'

import { Divider } from "@mui/material"
import { DateCalendar } from "@mui/x-date-pickers"
import dayjs from "dayjs"
import { useParams } from "next/navigation"
import { Suspense } from "react"


const EventCalendar = () => {
    const { y, m, d } = useParams<{ y: string, m: string, d: string }>()
    return (
        <>
            <Suspense fallback={ <div>load</div> }>
                { y }/{ m }/{ d }
                <DateCalendar
                    referenceDate={ dayjs('2024-05-12') }
                />
            </Suspense>
            <Divider></Divider>
        </>
    )
}

export default EventCalendar