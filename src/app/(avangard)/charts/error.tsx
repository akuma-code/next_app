"use client"; // Error components must be Client Components

import { Button } from "@mui/material";
import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div>
            <h2>Что-то пошло не так!</h2>
            <Button
                variant="contained"
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Попробовать снова
            </Button>
            <p>
                Error: <br />
                {error.message}
            </p>
        </div>
    );
}
