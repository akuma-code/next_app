'use client'

import { _log } from "@/Helpers/helpersFns"
import { getEventPairs } from "@/Services/events/eventActions"
import { useQuery } from "@tanstack/react-query"
export const usePairs = (eventId?: number, enabled?: boolean) => {
    const pairsFn = getEventPairs(eventId)
    const q = useQuery({
        queryKey: ['pairs', eventId],
        queryFn: async () => await pairsFn,
        enabled: !!enabled
    })
    q.isSuccess && _log("pairs: ", q.data)
    if (q.error) _log(q.error.message)
    return q
}