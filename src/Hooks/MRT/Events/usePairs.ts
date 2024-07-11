'use client'

import { _log } from "@/Helpers/helpersFns"
import { getEventPairs } from "@/Services/eventActions"
import { useQuery } from "@tanstack/react-query"

export const usePairs = (eventId?: number) => {
    const q = useQuery({
        queryKey: ['pairs', eventId],
        queryFn: () => getEventPairs(eventId)
    })
    // _log("pairs: ", q.data)
    return q
}