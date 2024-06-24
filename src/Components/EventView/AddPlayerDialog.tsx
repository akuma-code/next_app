'use client'

import { _log } from "@/Helpers/helpersFns"
import { useToggle } from "@/Hooks/useToggle"
import { connectOnePlayer } from "@/Services/eventService"
import { getPlayers } from "@/Services/playerService"
import { Add } from "@mui/icons-material"
import { Box, Button, Dialog, DialogContent, DialogTitle, LinearProgress, Stack } from "@mui/material"
import { keepPreviousData, useQuery } from "@tanstack/react-query"


interface AddPlayerProps {
    event_players: { id: number, name: string }[]
    event_id: number
}
async function fetchPlayers() {
    const players = await getPlayers()
    return players
}
export const AddPlayerDialog: React.FC<AddPlayerProps> = ({ event_players, event_id }) => {
    const [open, { on, off }] = useToggle()
    const eventIds = event_players.map(p => p.id)

    const q = useQuery({
        queryKey: ['event', 'players', 'all'],
        queryFn: fetchPlayers,
        placeholderData: keepPreviousData,
        select: (data) => data.filter(d => !eventIds.includes(d.id))
    })
    if (q.error) {
        _log(q.error)
        return <Box>Fetch players error</Box>
    }

    async function handleConnectPlayer(eventId: number, playerId: number) {
        const connect = connectOnePlayer.bind(null, eventId, playerId)
        await connect()
        off()
    }
    if (!q.isSuccess) return <LinearProgress variant="indeterminate" color="secondary" />
    return (
        <>
            <Button
                size="small"
                color="secondary"
                variant='outlined'
                fullWidth
                onClick={ on }
                startIcon={ <Add /> }
            >
                Добавить игрока
            </Button>
            <Dialog
                open={ open }
                onClose={ off }
            >
                <DialogTitle >Добавить на тренировку</DialogTitle>
                <DialogContent>
                    <Stack direction={ "column" } spacing={ 1 } justifyContent={ "left" }>

                        { q.data.map(p =>
                            <Button
                                sx={ { textAlign: 'left' } }
                                variant="outlined"
                                size="small"
                                key={ p.id }
                                onClick={ () => handleConnectPlayer(event_id, p.id) }
                            >{ p.name }</Button>
                        ) }
                    </Stack>
                </DialogContent>
            </Dialog>
        </>
    )
}