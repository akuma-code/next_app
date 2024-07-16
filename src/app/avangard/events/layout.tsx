import React from "react";

import { OrderFilterControls } from "@/ClientComponents/UI/Filters/OrderFiltersControl";
import { AppBar, Stack, Toolbar } from "@mui/material";
import Link from "next/link";

async function EventsLayout({ children }: { children: React.ReactNode }) {
    return (
        <Stack direction={ "column" } gap={ 1 }>

            { children }
            {/* {modalEvent} */ }
        </Stack>
    );
}

export default EventsLayout;
