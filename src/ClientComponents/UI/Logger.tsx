'use client'

import { Button } from "@mui/material"

export const LoggerButton = ({ data }: { data: any }) => {





    return (
        <Button onClick={ () => console.log("🚀  ~ data:", data) }
            variant="contained"
            color={ 'warning' }
        >
            Log On
        </Button>)
}