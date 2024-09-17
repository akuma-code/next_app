"use client";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from "@mui/material";

export const PlayerInfoDialogue = ({
    open,
    onClose,
}: {
    open: boolean;
    onClose: (data?: any) => void;
}) => {
    return (
        <Dialog fullWidth open={open} onClose={() => onClose()}>
            <DialogTitle>Custom dialog</DialogTitle>
            <DialogContent>I am a custom dialog</DialogContent>
            <DialogActions>
                <Button onClick={() => onClose()}>Close me</Button>
            </DialogActions>
        </Dialog>
    );
};
