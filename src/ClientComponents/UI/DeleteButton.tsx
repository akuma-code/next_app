"use client";
import { deletePlayer } from "@/Services/playerService";
import { Button, IconButton } from "@mui/material";
import React, { type ButtonHTMLAttributes } from "react";

import { useFormStatus } from "react-dom";

interface DeleteButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    deleteId: number;
    children?: React.ReactNode;
    buttonProps?: {
        variant?: "contained" | "outlined" | "text";
    };
    icon?: React.ReactNode
}

const DeleteButton: React.FunctionComponent<DeleteButtonProps> = (props) => {
    const { buttonProps = { variant: "outlined" }, deleteId, children } = props;
    const { pending } = useFormStatus();
    const deleteAction = deletePlayer.bind(null, { id: deleteId });

    return (
        <form action={ deleteAction }>
            <IconButton

                disabled={ pending }
                color="error"
                type={ "submit" }
                size="small"
                { ...buttonProps }

            // startIcon={ props.icon }
            >
                { children }
            </IconButton>
        </form>
    );
};

export default DeleteButton;
