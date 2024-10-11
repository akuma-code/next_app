import { EventsList } from "@/ClientComponents/EventsList";
import { getEventsByMonth } from "@/Services/eventService";
import EventsProvider from "./providers";
import { Pagination } from "@mui/material";
import { EventsToolbar } from "../_components/EventsToolbar";

export type OrderType = "asc" | "desc";
async function EventsPage({
    searchParams,
}: {
    searchParams: { date: string; month: string; order: string; view: string };
}) {
    const month = searchParams.month;
    // const view = searchParams.view as "card" | "table";
    let order = (searchParams.order as OrderType) || "desc";
    const events = await getEventsByMonth(month, order);
    return (
        <EventsProvider>
            <EventsToolbar total={events.length} />
            <EventsList events={events} />
        </EventsProvider>
    );
}

export default EventsPage;
