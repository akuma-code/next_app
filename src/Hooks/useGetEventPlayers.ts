'use client'

import { getEventsUnique } from "@/Services/eventService"
import { PlayerWithInfo } from "@/Services/playerService"
import { useEffect, useState } from "react"

export default function useGetEventPlayers(date?: string) {
    const [isPending, setPending] = useState(false)
    const [players, setPlayers] = useState<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>([])

    useEffect(() => {
        const getPlayers = getEventsUnique.bind(null, date)
        setPending(true)
        getPlayers()
            .then(p => {
                setPlayers(p ?? [])
            })
            .finally(() => setPending(false))

    }, [date])

    return [players, isPending] as const
}