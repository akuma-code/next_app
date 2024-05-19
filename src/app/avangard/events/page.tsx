import { getPlayers, getPlayersByEventDate } from "@/Services/playerService"
import { PlayersList } from "../PlayersList"
import { PlayersEventTranfer } from "@/ClientComponents/PlayersEventTransfer"
import { getEventsByMonth, getEventsUnique, getEventsWithPlayers } from "@/Services/eventService"
import { Badge, Box, Stack } from "@mui/material"
import Link from "next/link"
import { EventsList } from "@/ClientComponents/EventsList"
import dayjs from "dayjs"
import { MonthTabs } from "@/ClientComponents/Tabs/MonthTabs"

const EventsPage = async ({ searchParams }: { searchParams: { date: string, month?: string } }) => {
    const month = searchParams.month
    const monthEvets = await getEventsByMonth(month)
    return (
        <>
            <MonthTabs />
            <EventsList events={ monthEvets } />

        </>
    )
}


export default EventsPage