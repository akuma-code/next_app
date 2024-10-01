'use client'

import { getEventsUnique } from "@/Services/eventService"
import { GET_PLAYERS, getPlayers } from "@/Services/playerService"
import { PrismaPlayer_ } from "@/Types"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"

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
    const [players, setPlayers] = useState<PrismaPlayer_[]>([])

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

export function useMRTPlayers(config?: { take?: number, skip?: number }) {
    const take = config?.take
    const skip = config?.skip
    const q = useQuery({
        queryKey: ['players', take, skip],
        queryFn: async () => await GET_PLAYERS({ take, skip }),
        refetchOnWindowFocus: true,
        gcTime: 1000 * 60 * 5

    })

    return q

}

export type MRT_Player = {
    name: string;
    id: number;
    hasTicket: boolean;
    events_count: number;

};

const s_filter = (data: PrismaPlayer_[]) => {
    return data.map((p) => ({
        name: p.name,
        id: p.id,
        hasTicket: !!p.ticket,
        events_count: p._count.events,
    })) as MRT_Player[];
}
export function useMRTPlayersSelect(preload_data?: PrismaPlayer_[], p?: { pageIndex: number, pageSize?: number }) {
    // const take = pageSize ? pageIndex + 1 * pageSize : undefined
    // const skip = take ? take * pageIndex : undefined

    const q = useQuery({
        queryKey: ['players', p?.pageIndex, p?.pageSize],
        queryFn: async () => await GET_PLAYERS({ select: { name: true, id: true, ticket: true, _count: { select: { events: true } } } }) as PrismaPlayer_[],
        refetchOnWindowFocus: true,
        gcTime: 1000 * 60 * 5,
        select: s_filter,
        placeholderData: preload_data

    })

    return q

}