import { getPlayers } from "@/Services/playerService"
import { PlayersList } from "../PlayersList"
import { PlayersEventTranfer } from "@/ClientComponents/PlayersEventTransfer"

const EventsPage = async () => {
    const dbplayers = await getPlayers('info')


    return (
        <>
            <PlayersEventTranfer dbPlayers={ dbplayers } />
        </>
    )
}


export default EventsPage