'use client'

import { reducePairs } from "@/Helpers/reduceToObject"
import { getDBOneEventData } from "@/Services/events/db_event"
import { useQuery } from "@tanstack/react-query"


export const useGetEvent = ({ id }: { id?: number }) => {
    const getEvent = getDBOneEventData.bind(null)

    const context = useQuery({
        queryKey: ['event', id],
        queryFn: () => getEvent({ id }, ['date_formated', 'id', "players", "pairs", "title"]),
        enabled: !!id,
        gcTime: 5000,


    })
    if (context.error) console.log(context.error.message)
    return context
}

export function syncPlayers(data?: {
    pairs: {
        id: number;
        firstPlayerId: number;
        secondPlayerId: number;
        masterId: number | null;
        playerId: number | null;
        eventId: number;
    }[],
    players: { id: number, name: string }[]
}) {
    if (!data) return []
    const { players, pairs } = data
    const reduced = reducePairs<typeof pairs[number]>(pairs)

    const players_list = players.map(p =>
    ({
        id: p.id, name: p.name,
        pair: reduced[p.id.toString()]
            ? { id: reduced[p.id].id, masterId: reduced[p.id].firstPlayerId, eventId: reduced[p.id].eventId }
            : null
    }))
    return players_list
}