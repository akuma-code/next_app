"use client";

import { DialogsProvider } from "@toolpad/core";
import React, { Suspense } from "react";

export default function EventsProvider({
    children,
}: {
    children?: React.ReactNode;
}) {
    return (
        <DialogsProvider>
            <Suspense fallback={"..."}>{children}</Suspense>
        </DialogsProvider>
    );
}
