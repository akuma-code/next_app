import { EventView } from "@/Components/EventView/EventView";
import { reducePairs } from "@/Helpers/reduceToObject";
import { getEventPairs } from "@/Services/events/eventActions";
import { getEventById } from "@/Services/eventService";
import { getMasters } from "@/Services/masterService";
import { Box } from "@mui/material";
// const masters = [
//     { id: 1, name: "Алан Заикин" },
//     { id: 2, name: "Антон Козлов" },

// ]
const EventIdPage: React.FC<{ params: { eventId: string } }> = async ({
    params,
}) => {
    const { eventId } = params;
    const event = await getEventById(eventId);
    const masters = await getMasters();
    const pairs = await getEventPairs(Number(eventId));
    const obj = reducePairs(event?.pairs ?? [])
    console.log(obj)

    if (!event) return <Box>Event error!</Box>;

    return <EventView event={ event } masters={ masters } />;
};

export default EventIdPage;
