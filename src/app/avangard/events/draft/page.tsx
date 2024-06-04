import DraftEventForm from "@/ClientComponents/DraftEvent/DraftEventForm";
import { getPlayers } from "@/Services/playerService";
import { Stack } from "@mui/material";
interface Props {
    searchParams: { date: string }
}
export default async function DraftEventPage({ searchParams }: Props) {
    const players = await getPlayers()

    const ac_options = players.map(p => ({ id: p.id, name: p.name }))


    return (
        <Stack direction={ { md: 'row', sm: 'column' } } gap={ 2 }>
            <DraftEventForm options={ ac_options } />

        </Stack>
    )
}

