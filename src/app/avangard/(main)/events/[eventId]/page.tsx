import { EventView } from "@/Components/EventView/EventView";
import { reduceArrayToObject } from "@/Helpers/reduceToObject";
import { getEvents } from "@/Services/events/eventActions";
import { getEventById } from "@/Services/eventService";
import { getMasters } from "@/Services/masterService";
import { createTicketForPlayer } from "@/Services/tickets/ticketActions";
import { Box } from "@mui/material";

const EventIdPage: React.FC<{ params: { eventId: string } }> = async ({
    params,
}) => {
    const { eventId } = params;
    const event = await getEventById(eventId);

    const masters = await getMasters();

    if (!event) return <Box>Event error!</Box>;
    const master_record = reduceArrayToObject(masters);

    // console.log(
    //     await createTicketForPlayer({
    //         playerId: 11,
    //         new_ticket: { amount: 10, limit: 10, eAt: "never" },
    //     })
    // );
    return (
        <Box display={"flex"} flexDirection={"row"} gap={2}>
            <EventView event={{ ...event }} masters={masters} />
            {/* <EventView_v2 eventId={ Number(eventId) } masters={ masters } /> */}
        </Box>
    );
};

export default EventIdPage;

export async function generateStaticParams() {
    const events = (await getEvents({ where: {} })) || [];
    return events.map((e) => ({ eventId: e.id.toString() }));
}
