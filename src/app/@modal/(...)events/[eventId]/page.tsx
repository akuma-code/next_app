import { Modal } from "@/ClientComponents/UI/Modal";
import { EventView } from "@/Components/EventView/EventView";
import { getEventById } from "@/Services/eventService";
import { getMasters } from "@/Services/masterService";
import { Typography } from "@mui/material";
import Link from "next/link";

export default async function EventModalPage({
    params,
}: {
    params: { eventId: string };
}) {
    const eventId = params.eventId;
    const event = await getEventById(eventId);
    const masters = await getMasters();
    if (!event) return <div>Event not found</div>;

    return (
        <>
            <Modal>
                <Typography>Modal</Typography>
                <Link href="/">Close</Link>
                <EventView event={event} masters={masters} />
            </Modal>
        </>
    );
}
