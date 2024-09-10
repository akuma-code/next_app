import { EventView } from "@/Components/EventView/EventView";
import { reduceArrayToObject } from "@/Helpers/reduceToObject";
import { getDBOneEventData } from "@/Services/events/db_event";
import { getEvents } from "@/Services/events/eventActions";
import { getEventById } from "@/Services/eventService";
import { getMasters } from "@/Services/masterService";
import { createTicketForPlayer } from "@/Services/tickets/ticketActions";
import { Alert, Box } from "@mui/material";
import { Suspense } from "react";

const EventIdPage: React.FC<{ params: { eventId: string } }> = async ({
    params,
}) => {
    const { eventId } = params;
    if (!eventId) return null;
    const event = await getDBOneEventData(
        { id: +eventId },
        {
            id: true,
            date_formated: true,
            cost: true,
            pairs: true,
            title: true,
            players: true,
        }
    );

    const masters = await getMasters();

    // if (!event) return <Box>Event error!</Box>;
    // const master_record = reduceArrayToObject(masters);

    // console.log(
    //     await createTicketForPlayer({
    //         playerId: 11,
    //         new_ticket: { amount: 10, limit: 10, eAt: "never" },
    //     })
    // );
    return (
        <Suspense fallback={<Alert color="success">Wait...</Alert>}>
            <Box display={"flex"} flexDirection={"row"} gap={2}>
                {event && (
                    <EventView
                        event={{ ...(event as any) }}
                        masters={masters}
                    />
                )}
                {/* <EventView_v2 eventId={ Number(eventId) } masters={ masters } /> */}
            </Box>
        </Suspense>
    );
};

export default EventIdPage;

export async function generateStaticParams() {
    const events = (await getEvents({ select: { id: true } }))!;
    return events.map((e) => ({ eventId: e.id.toString() }));
}
