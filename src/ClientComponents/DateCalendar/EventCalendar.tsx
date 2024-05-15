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
    const [value, setValue] = useState<Dayjs>(dayjs())
    const searchParams = useSearchParams()
    const path = usePathname()
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
    const createEv = createEvent.bind(null, value.format())
    return (
        <>
            <Suspense fallback={ <div>load</div> }>

                <DateCalendar
                    showDaysOutsideCurrentMonth={ true }
                    onChange={ (v) => {


                        const _d = dayjs(v)
                        setValue(prev => v)
                        const s = createQueryString('date', dayjs(v).format())
                        router.push(path + '?' + s)

                    } }
                    value={ value }

                />
                {/* <List>
                    <ListItem>

                        <ListItemButton>

                        </ListItemButton>
                    </ListItem>
                </List>

                */}
            </Suspense>
            <Button variant="contained" onClick={ async () => await createEv() }>
                Create Event
            </Button>

        </>
    )
}
EventCalendar.displayName = "___EventCalendar"
export default EventCalendar