"use client";

import { CircularProgress } from "@mui/material";
import { DialogsProvider } from "@toolpad/core";
import React, { Suspense } from "react";

export default function EventsProvider({
    children,
}: {
    children?: React.ReactNode;
}) {
    return (
        <DialogsProvider>
            <Suspense fallback={<CircularProgress color="info" />}>
                {children}
            </Suspense>
        </DialogsProvider>
    );
}
