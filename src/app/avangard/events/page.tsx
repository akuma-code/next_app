import { getPlayers } from "@/Services/playerService"
import { PlayersList } from "../PlayersList"
import { PlayersEventTranfer } from "@/ClientComponents/PlayersEventTransfer"
import { getEventsUnique } from "@/Services/eventService"

const EventsPage = async () => {
    const dbplayers = await getPlayers('info')
    const { playersByDate } = await getEventsUnique()
    // const res = await playersByDate(formated)


    return (
        <>
            <PlayersEventTranfer dbPlayers={ dbplayers } />

        </>
    )
}


export default EventsPage