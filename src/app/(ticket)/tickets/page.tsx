import { MRT_PlayersWithTicket } from "@/ClientComponents/MRT/Tickets/MRTTickets"
import TicketControls from "@/ClientComponents/MRT/Tickets/TicketControls"
import { getPlayersWithTickets } from "@/Services/tickets/ticketActions"

async function TicketsPage() {

    const players = await getPlayersWithTickets()


    return (
        <div className="flex flex-col ">
            {/* <TicketControls /> */ }
            <MRT_PlayersWithTicket preload={ players } />
        </div>
    )
}

export default TicketsPage