"use client";

import MonthPicker from "@/ClientComponents/UI/Filters/MonthPicker";
import { OrderFilterControls } from "@/ClientComponents/UI/Filters/OrderFiltersControl";
import useMediaDetect from "@/Hooks/useMediaDetect";
import { Box, Button, Grid2, Paper, Stack } from "@mui/material";
import { PageContainerToolbar } from "@toolpad/core";
import dayjs from "dayjs";
export function EventsPagePageToolbar() {
    const { isMobile } = useMediaDetect();
    return (
        <PageContainerToolbar>
            <Stack alignItems={"center"} component={Paper}>
                <Grid2 container spacing={2} alignContent={"center"} p={1}>
                    <Grid2 size={"grow"}>
                        <OrderFilterControls />
                    </Grid2>
                    {!isMobile && (
                        <Grid2 size={"auto"}>
                            <MonthPicker />
                        </Grid2>
                    )}
                </Grid2>
            </Stack>
        </PageContainerToolbar>
    );
}
