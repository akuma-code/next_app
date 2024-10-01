import { EventView, TEvent } from "@/Components/EventView/EventView";
import { reduceArrayToObject } from "@/Helpers/reduceToObject";
import { getDBOneEventData, getEvent } from "@/Services/events/db_event";
import { getEvents } from "@/Services/events/eventActions";
import { getEventById } from "@/Services/eventService";
import { getMasters } from "@/Services/masterService";
import { createTicketForPlayer } from "@/Services/tickets/ticketActions";
import { Alert, Box } from "@mui/material";
import { Prisma } from "@prisma/client";
import { Suspense } from "react";
// type TEvent = Prisma.EventGetPayload<{
//     select: {
//         id: true;
//         date_formated: true;
//         players: { select: { id: true; name: true; ticket: true } };
//         pairs: true;
//         cost: true;
//         title: true;
//         _count: { select: { players: true } };
//     };
// }>;
const EventIdPage: React.FC<{ params: { eventId: string } }> = async ({
    params,
}) => {
    const { eventId } = params;
    if (!eventId || isNaN(Number(eventId))) return null;
    const event = (await getEvent({
        where: { id: Number(eventId) },
        select: {
            id: true,
            date_formated: true,
            cost: true,
            pairs: true,
            title: true,
            players: {
                select: {
                    id: true,
                    name: true,
                    ticket: true,
                    pair: true,
                    events: true,
                    // profile: true,
                },
            },
            _count: { select: { players: true } },
        },
    })) as unknown as TEvent;

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
            {eventId && <EventView event={event} masters={masters} />}
        </Suspense>
    );
};

export default EventIdPage;
