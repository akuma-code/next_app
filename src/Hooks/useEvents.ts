'use client'

import { _log } from "@/Helpers/helpersFns"
import { createEvent } from "@/Services/eventService"
import { getPlayers } from "@/Services/playerService"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

interface EventPayload {
    findBy?: { month: string } | { id: number } | undefined
    initPlayersList: { id: number, name: string }[]
    activeEvent?: { id: number, date_formated: string, players: { name: string }[], title?: string | null } | null

}

export function useEventControl({ findBy, initPlayersList, activeEvent }: EventPayload) {
    const [names, setNames] = useState(() => initPlayersList.map(p => p.name))

    const isSelected = (name: string) => names.includes(name)

    const selectorOptions = {
        names, isSelected, setNames
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
