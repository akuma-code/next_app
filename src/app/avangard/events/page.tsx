import { AppBar, Box, CircularProgress, Toolbar } from "@mui/material";
import { Suspense } from "react";
import { ViewSwitch } from "./viewSwitch";
import { OrderFilterControls } from "@/ClientComponents/UI/Filters/OrderFiltersControl";

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
        <Box sx={ {} } p={ 1 }>
            <Suspense
                fallback={ <CircularProgress variant="indeterminate" /> }
            >
                <AppBar
                    position="relative"
                    color={ "default" }
                    sx={ {
                        borderTopLeftRadius: "1rem",
                        borderTopRightRadius: "1rem",
                    } }
                >
                    <Toolbar
                        variant="dense"
                        sx={ { display: "flex", justifyContent: "center", } }
                    >


                        <OrderFilterControls />
                    </Toolbar>
                </AppBar>
                <ViewSwitch view={ { type: view } } options={ { month, order } } />
            </Suspense>
        </Box>
    );
}

export default EventsPage;
