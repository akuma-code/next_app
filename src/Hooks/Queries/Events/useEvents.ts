'use client'

import { _log } from "@/Helpers/helpersFns"
import { reduceArrayToObject, reducePairs } from "@/Helpers/reduceToObject"
import { GetEventResponse, getEventWithConfig, getEventWithIncludes } from "@/Services/events/db_event"
import { getMasters } from "@/Services/masterService"
import { keepPreviousData, useQuery } from "@tanstack/react-query"


const getEvent = getEventWithIncludes.bind(null)
const getEventAndPairs = getEventWithIncludes.bind(null)

export const useGetEvent = (payload: { id: number | undefined }) => {
    const id = payload.id

    const context = useQuery({
        queryKey: ['event', payload],
        queryFn: () => getEvent({ where: { id }, includes: { pairs: { include: { master: true, player: true } }, players: true } }),
        enabled: !!payload.id,
        gcTime: 5000,
        placeholderData: keepPreviousData,
        staleTime:5000



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

interface TPairEvent {
    id: number
    firstPlayerId: number
    secondPlayerId: number
    masterId: number | null
    playerId: number | null
    eventId: number
}

export function getPlayersList(data?: {
    date_formated: string,
    pairs: TPairEvent[],
    players: { id: number, name: string }[],
    id: number
} | null) {

    if (data === null || !data) return []
    try {
        const { players, pairs, id } = data
        const reduced = reducePairs<typeof pairs[number]>(pairs)

        const players_list = players.map(p =>
        ({
            eventId: id,
            date_formated: data.date_formated,
            player: { ...p },
            master: reduced[p.id.toString()]
                ? {
                    id: reduced[p.id].firstPlayerId,
                    pairId: reduced[p.id].id

                }
                : null,

        }))
        return players_list
    } catch (error) {
        console.log(error)
    }
}


// export function eventSelect<T extends GetEventResponse | null | undefined>(data: T, masters: { id: number, name: string }[]) {
//     if (!data) {
//         _log("NO DATAS", data)
//         return
//         // throw new Error("Data error")
//     }
//     const { date_formated, id, pairs, players, title } = data
//     const pp = pairs.reduce((prev, { secondPlayerId, ...rest }) => ({
//         ...prev,
//         [secondPlayerId]: { ...rest, masterId: rest.firstPlayerId, firstPlayerId: rest.firstPlayerId }
//     }),
//         {} as Record<string, typeof pairs[number]>)
//     _log({ pp })
//     // const mid = (id: number) => pp[id.toString()].masterId
//     const M = reduceArrayToObject(masters)

//     const _players = players.map(p => {
//         let master;
//         if (pp[p.id]) {
//             master = M[pp[p.id].firstPlayerId]
//         } else {
//             master = null
//         }
//         return {

//             player: { id: p.id, name: p.name },
//             master: master
//         }
//     })
//     // _log(_players)
//     const new_data = {
//         eventId: id, title, date_formated,
//         player_pairs: _players
//     }
//     return new_data
// }