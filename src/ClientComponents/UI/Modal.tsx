"use client";

import { type ElementRef, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { Box, Button, Stack } from "@mui/material";
import Icon from "@mdi/react";
import { mdiClose } from "@mdi/js";

export function Modal({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const dialogRef = useRef<ElementRef<"dialog">>(null);

    useEffect(() => {
        if (!dialogRef.current?.open) {
            dialogRef.current?.showModal();
        }
    }, []);

    function onDismiss() {
        router.back();
    }

    return createPortal(
        <div className="modal-backdrop">
            <dialog ref={dialogRef} className="modal" onClose={onDismiss}>
                <Stack direction={"column"}>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={onDismiss}
                        endIcon={<Icon path={mdiClose} size={1} />}
                    >
                        Закрыть
                    </Button>

                    {children}
                </Stack>
            </dialog>
        </div>,
        document.getElementById("modal-root")!
    );
}
