import DraftEventForm from "@/ClientComponents/DraftEvent/DraftEventForm";
import { getPlayers } from "@/Services/playerService";
import { Box } from "@mui/material";
interface Props {
    searchParams: { date: string }
}
export default async function DraftEventPage({ searchParams }: Props) {
    const players = await getPlayers()

    const ac_options = players.map(p => ({ id: p.id, label: p.name }))

    return (
        <Box>
            <DraftEventForm options={ ac_options } />
        </Box>
    )
}

