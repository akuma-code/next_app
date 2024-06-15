import prisma from "@/client/client";


type PromiseType<T> = T extends Promise<infer U> ? U : never

export type EVResponse = PromiseType<ReturnType<typeof getEventsData>>[0]
export type PLResponse = PromiseType<ReturnType<typeof getPlayersData>>[0]

export async function getEventsData(options?: { log?: boolean }) {
    const e = await prisma.event.findMany({

        select: {
            id: true,
            date_formated: true,
            players: {
                select: {
                    id: true,
                    name: true,
                    // info: { select: { rttf_score: true } },
                    // profileId: true,
                },

            },
            pairs: {
                select: {
                    eventId: true,
                    firstPlayerId: true,
                    secondPlayerId: true,
                    id: true
                }
            },
            title: true,
            // eventInfo: true,
            isDraft: true
        }
    })
    if (options?.log) {
        console.clear()
        console.table(e)
    }
    return e
}

export async function getPlayersData(options?: { log?: boolean }) {
    const p = await prisma.player.findMany({
        select: {
            id: true,
            name: true,
            // info: true,
            // profile: true,

        },
        where: { name: { not: undefined } },
        distinct: ["name"]


    })
    const pwe = await prisma.player.findMany({
        where: {
            NOT: [
                { events: { none: {} } }
            ]
        },
        include: {
            events: true,
            // info: true,
            // profile: true,
        }
    })
    if (options?.log === true) {
        console.clear()
        console.log("___players")
        console.table(p)
        console.log("___players with events")
        console.table(pwe)

    }
    return p
}

