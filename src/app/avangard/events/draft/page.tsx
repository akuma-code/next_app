import DraftEventForm from "@/ClientComponents/DraftEvent/DraftEventForm";
import { getPlayers } from "@/Services/playerService";
import { Box, Stack } from "@mui/material";
import { DraftMembersList } from "./DraftMembersList";
import { getDrafts } from "@/Services/draftEventService";
import { _log } from "@/Helpers/helpersFns";
interface Props {
    searchParams: { date: string }
}
export default async function DraftEventPage({ searchParams }: Props) {
    const players = await getPlayers()

    const ac_options = players.map(p => ({ id: p.id, name: p.name }))
    const { instances, drafts } = await getDrafts()
    _log(instances)
    return (
        <Stack direction={ { md: 'row', sm: 'column' } } gap={ 2 }>
            <DraftEventForm options={ ac_options } />
            <DraftMembersList draft_event={ null } />
        </Stack>
    )
}

