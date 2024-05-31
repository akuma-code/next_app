'use client'

import { _promptVar } from "@/Helpers/helpersFns"
import { useToggle } from "@/Hooks/useToggle"
import { seedEvents } from "@/Services/eventService"
import { seedPlayers } from "@/Services/playerService"
import { mock_events } from "@/dataStore/backup_db"
import { ButtonGroup, Button } from "@mui/material"


export const RestoreButtons: React.FC = () => {
    const [load, { on, off }] = useToggle(false)
    const restorePlayers = async () => {
        on()
        _promptVar("Восстановить игроков из базы?") && await seedPlayers().finally(off)
    }
    const restoreEvents = async () => {
        on()
        _promptVar("Восстановить тренировки из базы?") && await seedEvents(mock_events.db_events_mock).finally(off)
    }
    return (
        <ButtonGroup>
            <Button onClick={ restorePlayers } disabled={ load }>
                Restore players
            </Button>
            <Button onClick={ restoreEvents } disabled={ load }>
                Restore events
            </Button>
        </ButtonGroup>
    )
}

