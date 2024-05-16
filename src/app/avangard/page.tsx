import EventCalendar from "@/ClientComponents/DateCalendar/EventCalendar";
import { getPlayers, getPlayersByDateString, getPlayersByEventId, getPlayersWithEvents } from "@/Services/playerService";
import { Stack, Typography } from "@mui/material";
import { PlayersList } from "./PlayersList";
import dayjs from "dayjs";
import { _log } from "@/Helpers/helpersFns";
import { _date } from "@/Helpers/dateFuncs";
import { getEventsUnique } from "@/Services/eventService";
type PageProps = {
    searchParams?: {
        date?: string
    }
}

export default async function AvangardPage(search?: PageProps) {
    const searchDate = search?.searchParams?.date || dayjs().format()
    const evDate = dayjs(searchDate).format()
    const formated = dayjs(searchDate).format('DD-MM-YY')
    // _log("\n search: \n", evDate)
    const players = await getPlayers('info')
    // const mapped = players.map(p => ({ id: p.id, name: p.name }))
    // const evPlayers = await getPlayersWithEvents(searchDate).then(pl => pl.map(p => ({ id: p.id, name: p.name })))
    // // evPlayers.map(p => ({ id: p.id, name: p.name }))
    // const eps = await getPlayersByDateString(searchDate)
    // const rrr = await getPlayersByEventId({ date: formated })
    const { playersByDate } = await getEventsUnique()
    const res = await playersByDate(formated)
    // _log("players: ", await getPlayersByDateString(searchDate))
    return (
        <Stack direction={ 'row' }>
            <EventCalendar />
            {/* <PlayersList players={ mapped }
                title={
                    <Typography variant="body2" textAlign={ 'center' }>
                        Общий список
                    </Typography>
                }
            /> */}
            {
                res &&
                <PlayersList
                    title={
                        <Typography textAlign={ 'center' }>
                            Список на дату: <br />
                            { _date(evDate).local }
                        </Typography>
                    }
                    players={ res }
                /> }
        </Stack>
    )
}


