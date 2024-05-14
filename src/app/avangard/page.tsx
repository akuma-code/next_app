import EventCalendar from "@/ClientComponents/DateCalendar/EventCalendar";
import { getPlayers, getPlayersWithEvents } from "@/Services/playerService";
import { Stack } from "@mui/material";
import { PlayersList } from "./PlayersList";
import dayjs from "dayjs";
import { _log } from "@/Helpers/helpersFns";
type PageProps = {

}

export default async function AvangardPage(search?: {
    searchParams?: {
        date?: string
    }
}) {
    const searchDate = search?.searchParams?.date
    const evDate = dayjs(searchDate).format()
    _log("\n search: \n", evDate)
    const players = await getPlayers('info')
    const mapped = players.map(p => ({ id: p.id, name: p.name }))
    const evPlayers = await getPlayersWithEvents(evDate)
    return (
        <Stack direction={ 'row' }>
            <EventCalendar />
            <PlayersList players={ mapped } />
            { evPlayers.length > 0 && <PlayersList players={ evPlayers.map(p => ({ id: p.id, name: p.name })) } /> }
        </Stack>
    )
}


