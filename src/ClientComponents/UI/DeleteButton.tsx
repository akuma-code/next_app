"use client";
import { _log } from "@/Helpers/helpersFns";
import { deletePlayer } from "@/Services/playerService";
import { Button } from "@mui/material";
import { useSearchParams } from "next/navigation";
import React, { type ButtonHTMLAttributes } from "react";

import { useFormStatus } from "react-dom";

interface DeleteButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    deleteId: number;
    children?: React.ReactNode;
    buttonProps?: {
        variant?: "contained" | "outlined" | "text";
    };
}

const DeleteButton: React.FunctionComponent<DeleteButtonProps> = (props) => {
    const { buttonProps = { variant: "outlined" }, deleteId, children } = props;
    const { pending } = useFormStatus();
    const deleteAction = deletePlayer.bind(null, { id: deleteId });

    return (
        <form action={deleteAction}>
            <Button
                {...buttonProps}
                disabled={pending}
                color="error"
                type={"submit"}
            >
                {children}
            </Button>
        </form>
    );
};

export default DeleteButton;
