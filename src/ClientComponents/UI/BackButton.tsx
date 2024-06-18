'use client'
import React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@mui/material'
export const BackButton = () => {
    const router = useRouter()
    const pathname = usePathname()

    return <Button onClick={ router.back }
        variant='contained'
    >Назад</Button>
}

export default BackButton