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
        // <MrtBoundary>
        <Container maxWidth={"md"}>
            <Suspense
                fallback={
                    <CircularProgress variant="indeterminate" color="error" />
                }
            >
                <AppBar
                    position="relative"
                    enableColorOnDark
                    sx={{
                        borderTopLeftRadius: "1rem",
                        borderTopRightRadius: "1rem",
                    }}
                >
                    <Toolbar
                        variant="dense"
                        sx={{ display: "flex", justifyContent: "center" }}
                    >
                        <OrderFilterControls />
                    </Toolbar>
                </AppBar>
                <ViewSwitch view={{ type: view }} options={{ month, order }} />
            </Suspense>
        </Container>
        // </MrtBoundary>
    );
}

export default EventsPage;
