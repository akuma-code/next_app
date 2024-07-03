import { OrderFilterControls } from "@/ClientComponents/UI/Filters/OrderFiltersControl";
import { AppBar, Stack, Toolbar } from "@mui/material";

const EventsLayout = async ({
    children,
    params,
}: {
    children: React.ReactNode;
    params?: { eventId: string };
}) => {
    return (
        <Stack direction={"column"} gap={1}>
            <AppBar
                position="relative"
                color="primary"
                sx={{
                    borderTopLeftRadius: "1rem",
                    borderTopRightRadius: "1rem",
                }}
            >
                <Toolbar
                    variant="dense"
                    sx={{ display: "flex", justifyContent: "center", py: 0.3 }}
                >
                    <OrderFilterControls />
                </Toolbar>
                {/* <Toolbar /> */}
            </AppBar>

            {children}
        </Stack>
    );
};

export default EventsLayout;
