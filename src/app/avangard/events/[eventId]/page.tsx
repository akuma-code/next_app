import { EventView } from "@/Components/EventView/EventView"
import { event_UpsertInfo, getMasters } from "@/Services/eventActions"
import { getEventById } from "@/Services/eventService"
import { Box } from "@mui/material"

const EventIdPage: React.FC<{ params: { eventId: string } }> = async ({ params }) => {
    // event_UpsertInfo({ eventId: 3, playerId: 11, masterId: 1 })
    const { eventId } = params
    const event = await getEventById(eventId)
    const masters = await getMasters()
    if (!event) return <Box>Event error!</Box>
    return (
        <EventView event={ event } masters={ masters } />
    )
}


export default EventIdPage