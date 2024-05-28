import { EventView } from "@/Components/EventView/EventView"
import { getEventById } from "@/Services/eventService"
import { Box } from "@mui/material"

const EventIdPage: React.FC<{ params: { eventId: string } }> = async ({ params }) => {

    const { eventId } = params
    const event = await getEventById(eventId)
    if (!event) return <Box>Event error!</Box>
    return (
        <EventView event={ event } />
    )
}

export default EventIdPage