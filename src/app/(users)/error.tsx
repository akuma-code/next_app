'use client' // Error components must be Client Components

import { Button, Stack } from '@mui/material'
import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div>
            <h2>Что то пошло не так, попробуйте повторить</h2>
            <br />
            <Stack>

                <Button variant='contained' color="error"
                    onClick={
                        // Attempt to recover by trying to re-render the segment
                        () => reset()
                    }
                >
                    Попробовать снова
                </Button>
            </Stack>
        </div>
    )
}