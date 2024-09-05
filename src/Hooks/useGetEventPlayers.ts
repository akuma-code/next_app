'use client'

import { getEventsUnique } from "@/Services/eventService"
import { PlayerWithInfo, getPlayers } from "@/Services/playerService"
import allP from "@/utils/playersList"
import { useEffect, useMemo, useState } from "react"

export default function useGetEventPlayers(date?: string) {
    const [isPending, setPending] = useState(false)
    const [players, setPlayers] = useState<{
        id: number;
        name: string;
        ticket?: any
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
export function useGetAllPlayers() {
    const [isPending, setPending] = useState(false)
    const [players, setPlayers] = useState<{
        id: number;
        name: string;
        ticket?: any | null
    }[]>([])

    useEffect(() => {
        const getall = async () => {

            return await getPlayers()
        }
        setPending(true)
        getall()
            .then(p => {
                setPlayers(p ?? [])
            })
            .finally(() => setPending(false))

    }, [])

    return [players, isPending] as const
}