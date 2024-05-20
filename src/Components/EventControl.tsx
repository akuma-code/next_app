'use client'
import { PlayerSelector } from "@/ClientComponents/PlayerSelector";
import { useEventControl } from "@/Hooks/useEvents";
import { Box } from "@mui/material";

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

    const { options } = useEventControl({ initPlayersList: allPlayers, activeEvent: event })


    return (
        <Box>
            <PlayerSelector names={ options.names } options={ options.restNames } />
        </Box>);
}

export default EventControl;