'use client'
// import { _formated_date } from "@/Helpers/dateFuncs";
// import useGetEventPlayers from "@/Hooks/useGetEventPlayers";
import { Stack } from "@mui/material";
import dayjs from "dayjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from 'react';

type FoundPlayers = {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}[] | null;
export const CalendarAndPlayers: React.FC<{ players: FoundPlayers; searchDate: string; }> = (props) => {
    // const [day, setDay] = useState(dayjs())

    // const router = useRouter()
    // const pathname = usePathname()
    // const searchParams = useSearchParams()
    // const eventDate = useMemo(() => _formated_date(day), [day])
    // const [eventPlayers] = useGetEventPlayers(eventDate)

    // // if (isPending) return <CircularProgress variant="indeterminate" color="warning" size={ 50 } />
    // useEffect(() => {
    //     router.push(pathname + '?date=' + eventDate)
    // }, [eventDate])
    return (
        <Stack direction={ { md: 'row', sm: 'column' } }>


            {/* <EventCalendar /> */ }
            {/* <DateCalendar
                value={ day }
                onChange={ setDay }
            />



            <PlayersList
                title={
                    <Typography textAlign={ 'center' }>
                        Список на дату: <br />
                        { _formated_date(day).replaceAll("_", "/") }
                    </Typography> }
                players={ eventPlayers } /> */}


        </Stack>
    )
};


CalendarAndPlayers.displayName = "____Calendar & Players"