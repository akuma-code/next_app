import { _formated_date } from "@/Helpers/dateFuncs";
import { _log } from "@/Helpers/helpersFns";
import { getEventById, getEventsByMonth, getEventsUnique, getOneEventByDate } from "@/Services/eventService";
import { getPlayers, getPlayersByEventDate } from "@/Services/playerService";
import { Box, Stack } from "@mui/material";
import { CalendarAndPlayers } from "./CalendarAndPlayers";
import dayjs from "dayjs";
import { EventsList } from "@/ClientComponents/EventsList";
import { PlayersEventTranfer } from "@/ClientComponents/PlayersEventTransfer";
import { EventView } from "@/Components/EventView/EventView";
import EventControl from "@/Components/EventControl";
type PageProps = {
    searchParams?: {
        date?: string
    }
}

export default async function AvangardPage({ searchParams }: { searchParams: { date: string } }) {

    const date = searchParams.date ?? ''
    const ewp = await getPlayersByEventDate({ event_date: "" })



    const activeEvent = await getOneEventByDate(date)
    // const playersByDate = await getEventsUnique()
    // _log("players: ", await getPlayersByDateString(searchDate))
    return (
        <Box component={ Stack } direction={ { md: 'row', sm: 'column' } } alignItems={ 'start' }>
            <EventControl allPlayers={ ewp.players } event={ activeEvent } />
            {/* <PlayersEventTranfer dbPlayers={ playersByDate || [] } evPlayers={ ewp.players } /> */ }
            {
                activeEvent && <EventView event={ activeEvent } boxProps={ { mt: 2, } } readonly={ false } />
            }
            {/* <CalendarAndPlayers players={ playersByDate } searchDate={ date } /> */ }

            {/* <EventsList /> */ }
        </Box>
    )
}



