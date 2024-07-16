import { Box, CircularProgress } from "@mui/material";
import { Suspense } from "react";
import { ViewSwitch } from "./viewSwitch";

export type OrderType = "asc" | "desc";
async function EventsPage({
    searchParams,
}: {
    searchParams: { date: string; month: string; order: string; view: string };
}) {
    const month = searchParams.month;
    const view = searchParams.view as "card" | "table";
    let order = searchParams.order as OrderType;

    // const monthEvents = await getEventsByMonth(month, order as OrderType);
    // const monthEventsDto = await getEventsByMonthDto(month, order as OrderType);

    // const ViewBox = viewReducer(month, order);
    return (
        <Box sx={ { border: "2px dashed #074a70" } } p={ 1 }>
            <Suspense
                fallback={
                    <div>
                        <CircularProgress variant="indeterminate" /> Loading...
                    </div>
                }
            >
                <ViewSwitch view={ { type: view } } options={ { month, order } } />
            </Suspense>
        </Box>
    );
}

export default EventsPage;
