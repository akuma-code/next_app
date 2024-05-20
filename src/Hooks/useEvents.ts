'use client'

import { createEvent } from "@/Services/eventService"
import { getPlayers } from "@/Services/playerService"
import { useEffect, useMemo, useState } from "react"
import useSWR from "swr"
interface EventPayload {
    findBy?: { month: string } | { id: number } | undefined
    initPlayersList: { id: number, name: string }[]
    activeEvent?: { id: number, date_formated: string, players: { name: string }[], title?: string | null } | null

}

export function useEventControl({ findBy, initPlayersList, activeEvent }: EventPayload) {

    const names = useMemo(() => initPlayersList.map(p => p.name), [])

    const restNames = useMemo(() => {
        if (!activeEvent) return names
        const active = activeEvent.players.map(p => p.name)
        return names.filter(name => !active.includes(name))
    }, [activeEvent])
    const selectorOptions = {
        names, restNames
    }

    return { options: selectorOptions }
}





interface PlayerResponse {
    id: number;
    name: string;
    createdAt?: Date;
    updatedAt?: Date
    info: {
        uuid: string
        rttf_score: number | null
        playerId: number
    } | null
    events: {
        id: number
        date_formated: string
        title: string | null
        createdAt: Date
        updatedAt: Date
    }[]
    _count: {
        events: number
    }
}
