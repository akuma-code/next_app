'use client'
import { EventDatePicker } from "@/ClientComponents/EventDatePicker";
import { PlayerSelector } from "@/ClientComponents/PlayerSelector";
import { useEventControl } from "@/Hooks/useEvents";
import { Box, Stack } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

interface IPlayer {
    id: number;
    name: string;
}

interface EventControlProps {
    event?: {
        id: number;
        date_formated: string;
        title?: string | null | undefined;
        players: IPlayer[];
        _count: { players: number }
    } | null
    allPlayers: IPlayer[]
}

const EventControl: React.FunctionComponent<EventControlProps> = ({ allPlayers, event }) => {
    const router = useRouter()
    const pathname = usePathname()
    const { options } = useEventControl({ initPlayersList: allPlayers, activeEvent: event })
    const activePlayers = event?.players ?? []
    const handleChange = (date?: string | null) => {
        router.push(pathname + '?date=' + date)
    }
    return (
        <Stack direction={ { sm: 'column' } }>
            <EventDatePicker event_date={ event?.date_formated } changeHandler={ handleChange } />
            <PlayerSelector options={ options.names } event_p_names={ activePlayers.map(p => p.name) } />
        </Stack>);
}
EventControl.displayName = "_______EventsController"
export default EventControl;