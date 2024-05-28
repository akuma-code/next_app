'use client'

import { _log } from "@/Helpers/helpersFns"
import { createEvent, deleteEvent } from "@/Services/eventService"
import { getPlayers } from "@/Services/playerService"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import useSWR from "swr"
import { StrictTupleKey } from "swr/_internal"

interface EventPayload {
    key: StrictTupleKey
    event: { id: number, date_formated: string, players: { name: string }[], title?: string | null }

}

export function useEventControl({ event, key }: EventPayload) {
    const { id, date_formated, players } = event;

    const { data: deleted, error, isLoading, mutate } = useSWR(key, ([key]) => deleteEvent(key))

    return [deleted, error, isLoading] as const
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
