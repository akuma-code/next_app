import React from "react";

import { OrderFilterControls } from "@/ClientComponents/UI/Filters/OrderFiltersControl";
import { AppBar, Stack, Toolbar } from "@mui/material";
import Link from "next/link";

const EventsLayout = async ({
    children,
    params,
    modalEvent,
}: {
    children: React.ReactNode;
    params: { eventId: string };
    modalEvent: React.ReactNode;
}) => {
    const eventId = params?.eventId;
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
                    {/* <Link href={"/avangard/events/" + eventId}>Open modal</Link> */}
                </Toolbar>
                {/* <Toolbar /> */}
            </AppBar>
            {children}
            {modalEvent}
        </Stack>
    );
};

export default EventsLayout;
