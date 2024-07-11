import { EventsList, IEvent_Front } from "@/ClientComponents/EventsList";
import {
    EventDto,
    EventDto2,
    MRTEvent,
} from "@/ClientComponents/MRT/Avangard/MRTEvents";
import { MonthTabs } from "@/ClientComponents/Tabs/MonthTabs";
import { getEventsByMonth, getEventsByMonthDto } from "@/Services/eventService";
import { Box, Container } from "@mui/material";

type OrderType = "asc" | "desc";
async function EventsPage({
    searchParams,
}: {
    searchParams: { date: string; month: string; order: string; view: string };
}) {
    const month = searchParams.month;
    let order = searchParams.order;
    const view = searchParams.view as "card" | "table";

    // const monthEvents = await getEventsByMonth(month, order as OrderType);
    // const monthEventsDto = await getEventsByMonthDto(month, order as OrderType);

    const ViewBox = async ({ v }: { v?: "card" | "table" }) =>
        v
            ? await viewSwitch(v, { month, order: order as OrderType })
            : viewSwitch("card", { month, order: order as OrderType });
    return (
        <Box sx={{ border: "2px solid #074a70" }} p={1}>
            <ViewBox v={view} />
        </Box>
    );
}

const CardView = ({ events }: { events: EventDto[] }) => {
    return (
        <>
            <MonthTabs />
            <EventsList events={events} />
        </>
    );
};

async function viewSwitch(
    view: "card" | "table",
    options: { month: string; order: OrderType }
) {
    const { order, month } = options;
    const monthEvents = await getEventsByMonth(month, order as OrderType);
    const monthEventsDto = await getEventsByMonthDto(month, order as OrderType);
    switch (view) {
        case "card":
            return <CardView events={monthEvents} />;
        case "table":
            return <MRTEvent events={monthEventsDto as EventDto2[]} />;
        default:
            return <CardView events={monthEvents} />;
    }
}

export default EventsPage;
