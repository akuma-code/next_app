import { _formated_date } from "@/Helpers/dateFuncs";
import { _log } from "@/Helpers/helpersFns";
import { createBlankEvent, getEventById, getEventsByMonth, getEventsUnique, getOneEventByDate } from "@/Services/eventService";
import { getPlayers, getPlayersByEventDate } from "@/Services/playerService";
import { Box, Stack } from "@mui/material";
import { CalendarAndPlayers } from "./CalendarAndPlayers";
import dayjs from "dayjs";
import { EventsList } from "@/ClientComponents/EventsList";
import { PlayersEventTranfer } from "@/ClientComponents/PlayersEventTransfer";
import { EventView } from "@/Components/EventView/EventView";
import EventControl from "@/Components/EventControl";
import allP from "@/utils/playersList";
type PageProps = {
    searchParams?: {
        date?: string
    }
}

export default async function AvangardPage({ searchParams }: { searchParams: { date: string } }) {

    const date = searchParams.date ?? ''
    const ewp = await getPlayersByEventDate({ event_date: "" })
    const all = await allP()


    const activeEvent = await getOneEventByDate(date)

    // const playersByDate = await getEventsUnique()
    // _log("players: ", await getPlayersByDateString(searchDate))
    return (
        <Box component={ Stack } direction={ { md: 'row', sm: 'column' } } alignItems={ 'start' } gap={ 2 }>
            <EventControl allPlayers={ all } event={ activeEvent } />

            {
                activeEvent && <EventView event={ activeEvent } boxProps={ { mt: 0, } } readonly={ false } />
            }

        </Box>
    )
}



async function EventBlank(date: string) {
    const isEventDay = [2, 4].includes(dayjs(date).day())
    const blankEvent = await createBlankEvent(_formated_date(dayjs()), "Blank Event")
    let event: ReturnType<typeof createBlankEvent> | null = null


}