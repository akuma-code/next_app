"use client";

import { Button, MenuItem } from "@mui/material";

import LinkMui from "./LinkMui";
import { signOut } from "next-auth/react";

export const ExitButton = () => {
    return (
        <Button
            color="error"
            onClick={async () =>
                await signOut({ redirect: true, callbackUrl: "/" })
            }
        >
            Выйти
        </Button>
    );
};
