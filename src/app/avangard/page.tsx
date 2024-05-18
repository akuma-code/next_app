import { _formated_date } from "@/Helpers/dateFuncs";
import { _log } from "@/Helpers/helpersFns";
import { getEventsUnique } from "@/Services/eventService";
import { getPlayers, getPlayersByEventDate } from "@/Services/playerService";
import { Box, Stack } from "@mui/material";
import { CalendarAndPlayers } from "./CalendarAndPlayers";
import dayjs from "dayjs";
import { EventsList } from "@/ClientComponents/EventsList";
import { PlayersEventTranfer } from "@/ClientComponents/PlayersEventTransfer";
type PageProps = {
    searchParams?: {
        date?: string
    }
}

export default async function AvangardPage({ searchParams }: { searchParams: { date: string } }) {

    const date = searchParams.date ?? ''
    const ewp = await getPlayersByEventDate({ event_date: date })



    const playersByDate = await getEventsUnique(date)

    // _log("players: ", await getPlayersByDateString(searchDate))
    return (
        <Box component={ Stack } direction={ 'row' }>
            <PlayersEventTranfer dbPlayers={ ewp.nonPlayers } evPlayers={ ewp.players } />
            {/* <CalendarAndPlayers players={ playersByDate } searchDate={ date } /> */ }

            {/* <EventsList /> */ }
        </Box>
    )
}



