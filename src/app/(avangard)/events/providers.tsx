"use client";

import { DialogsProvider } from "@toolpad/core";
import React from "react";

export default function EventsProvider({
    children,
}: {
    children?: React.ReactNode;
}) {
    return <DialogsProvider>{children}</DialogsProvider>;
}
