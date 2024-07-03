import { EventsList, IEvent_Front } from "@/ClientComponents/EventsList";
import { EventDto, MRTEvent } from "@/ClientComponents/MRT/Avangard/MRTEvents";
import { MonthTabs } from "@/ClientComponents/Tabs/MonthTabs";
import { getEventsByMonth } from "@/Services/eventService";
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

    const monthEvents = await getEventsByMonth(month, order as OrderType);
    const ViewBox = async ({ v }: { v?: "card" | "table" }) =>
        v ? await viewSwitch(v, monthEvents) : viewSwitch("card", monthEvents);
    return (
        <Box sx={{ border: "1px solid #074a70" }}>
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

async function viewSwitch(view: "card" | "table", events: EventDto[]) {
    switch (view) {
        case "card":
            return <CardView events={events} />;
        case "table":
            return <MRTEvent events={events} />;
        default:
            return <CardView events={events} />;
    }
}

export default EventsPage;
