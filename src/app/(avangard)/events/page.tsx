import { OrderFilterControls } from "@/ClientComponents/UI/Filters/OrderFiltersControl";
import {
    AppBar,
    Box,
    CircularProgress,
    Container,
    Toolbar,
} from "@mui/material";
import { Suspense } from "react";
import { ViewSwitch } from "./viewSwitch";
import { DialogsProvider } from "@toolpad/core";
import EventsProvider from "./providers";
import { EventsList } from "@/ClientComponents/EventsList";
import { getEventsByMonth } from "@/Services/eventService";

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
        // <MrtBoundary>
        // <Container maxWidth={"md"}>
        //     <Suspense
        //         fallback={
        //             <CircularProgress variant="indeterminate" color="error" />
        //         }
        //     >
        //     </Suspense>
        // </Container>
        <EventsProvider>
            <EventsList events={events} />
        </EventsProvider>
        // </MrtBoundary>
    );
}

export default EventsPage;
