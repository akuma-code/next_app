import EventControl from "@/Components/EventControl";
import { _log } from "@/Helpers/helpersFns";
import { createBlankEvent, getOneEventByDate } from "@/Services/eventService";
import { getPlayersByEventDate } from "@/Services/playerService";
import allP from "@/utils/playersList";
import { Box, Button, Stack } from "@mui/material";
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
            { activeEvent ?
                <EventControl allPlayers={ all } event={ activeEvent } />
                :
                <form id="new_event" action={ async (fd) => {
                    'use server'
                    const formdata = fd as unknown as { date_formated: string, title: string }
                    const es = Object.fromEntries(fd.entries())
                    _log(es)
                    await createBlankEvent(es.date_formated as string, es.title as string)
                } }>
                    <input type="hidden" name="date_formated" value={ date } />
                    <input type="hidden" name="title" value={ "Тренировка" } />

                    <Button type="submit">Start new event</Button>
                </form>
            }



        </Box>
    )
}


