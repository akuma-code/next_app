import { MrtBoundary } from "@/ClientComponents/MRT/MrtBoundary";
import { OrderFilterControls } from "@/ClientComponents/UI/Filters/OrderFiltersControl";
import { AppBar, Box, CircularProgress, Toolbar } from "@mui/material";
import { Suspense } from "react";
import { ViewSwitch } from "./viewSwitch";
import { readFile } from "@/Services/fs/data_service";
import { DB_JSON_DATA } from "@/Types";

export type OrderType = "asc" | "desc";
async function EventsPage({
    searchParams,
}: {
    searchParams: { date: string; month: string; order: string; view: string };
}) {
    const month = searchParams.month;
    const view = searchParams.view as "card" | "table";
    let order = searchParams.order as OrderType;



    return (
        <MrtBoundary>
            <Box sx={ {} } p={ 1 }>
                <Suspense
                    fallback={ <CircularProgress variant="indeterminate" /> }
                >

                    <AppBar
                        position="relative"
                        enableColorOnDark
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
        </MrtBoundary>
    );
}

export default EventsPage;
