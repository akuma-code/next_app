"use client";

import { Button, MenuItem, Typography } from "@mui/material";

import LinkMui from "./LinkMui";
import { signOut } from "next-auth/react";

export const ExitButton = () => {
    return (
        <Button
            size={"small"}
            color="warning"
            variant="outlined"
            onClick={async () => await signOut()}
        >
            <Typography fontSize={16}>Выход</Typography>
        </Button>
    );
};
