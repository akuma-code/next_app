import { _formated_date } from "@/Helpers/dateFuncs";
import { _log } from "@/Helpers/helpersFns";
import { getEventsUnique } from "@/Services/eventService";
import { getPlayers } from "@/Services/playerService";
import { Box } from "@mui/material";
import { CalendarAndPlayers } from "./CalendarAndPlayers";
import dayjs from "dayjs";
type PageProps = {
    searchParams?: {
        date?: string
    }
}

export default async function AvangardPage({ searchParams }: PageProps) {
    const date = searchParams?.date ?? _formated_date(dayjs())




    const playersByDate = await getEventsUnique(date)

    // _log("players: ", await getPlayersByDateString(searchDate))
    return (
        <Box>

            <CalendarAndPlayers players={ playersByDate } searchDate={ date } />
        </Box>
    )
}



