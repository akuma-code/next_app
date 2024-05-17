import { getPlayers, getPlayersByEventDate } from "@/Services/playerService"
import { PlayersList } from "../PlayersList"
import { PlayersEventTranfer } from "@/ClientComponents/PlayersEventTransfer"
import { getEventsUnique, getEventsWithPlayers } from "@/Services/eventService"
import { Badge, Box, Stack } from "@mui/material"
import Link from "next/link"

const EventsPage = async ({ searchParams }: { searchParams: { date: string } }) => {
    const dbplayers = await getPlayers()
    const date = searchParams.date ?? ''
    const playersByDate = await getEventsUnique(date)
    // const res = await playersByDate(formated)
    const ewp = await getPlayersByEventDate({ event_date: date })
    const events_with_players = await getEventsWithPlayers()
    console.log('we: ', ewp.players)
    console.log('woe: ', ewp.nonPlayers)
    return (
        <>
            <PlayersEventTranfer dbPlayers={ ewp.nonPlayers } evPlayers={ ewp.players } />
            <Box component={ Stack } direction={ 'column' }>

                {

                    events_with_players.map(event =>
                        <Link key={ event.id }
                            href={ {
                                pathname: '/avangard/events',
                                query: { date: event.date_formated }

                            } }
                        >{ event.date_formated }

                        </Link>
                    )

                }
            </Box>
        </>
    )
}


export default EventsPage