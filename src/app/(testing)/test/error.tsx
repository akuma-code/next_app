'use client' // Error components must be Client Components

import { Alert, Button } from '@mui/material'
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
            <h2>Что то не так с тестовой страницей!</h2>
            <Button variant='contained'
                onClick={ reset }
            >
                Повторить
            </Button>
            <Alert>
                <p>{ error.message }</p>
            </Alert>
        </div>
    )
}