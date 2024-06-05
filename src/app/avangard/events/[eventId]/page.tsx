import { EventView } from "@/Components/EventView/EventView"
import { getEventById } from "@/Services/eventService"
import { Box } from "@mui/material"
const masters = [
    { id: 1, name: "Алан Заикин" },
    { id: 2, name: "Антон Козлов" },

]
const EventIdPage: React.FC<{ params: { eventId: string } }> = async ({ params }) => {
    const { eventId } = params
    const event = await getEventById(eventId)
    if (!event) return <Box>Event error!</Box>




    return (
        <EventView event={ event } masters={ masters } />
    )
}

export default EventIdPage