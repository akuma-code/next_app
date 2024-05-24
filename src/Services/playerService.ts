'use server'
import { Info, Player } from "@prisma/client";

import { _log } from "@/Helpers/helpersFns";

import { parseNames } from "@/dataStore/avangardPlayers";
import { revalidatePath } from "next/cache";
import prisma from "@/client/client";

const ASC = 'asc' as const
const DESC = 'desc' as const
const orderByEvents = [
    { events: { _count: DESC }, id: ASC }
]
type DeletePayload = {
    id: number
}

type InfoCreatePayload = {
    rttf_score?: number

}

export type PlayerWithInfo = {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date,
    info:
    {
        uuid: string;
        rttf_score: number | null;

        playerId: number;
    } | null;

}
export async function createPlayer(name: string, info?: InfoCreatePayload) {
    try {
        const player = await prisma.player.create({
            data: {
                name
            },
            include: { info: true }
        })
        if (info) {
            const { rttf_score } = info;

            const addInfo = await prisma.player.update({
                where: { id: player.id },
                data: {
                    info: {
                        create: {
                            // where: { playerId: player.id },
                            // create: { rttf_link, rttf_score }
                            rttf_score
                        }
                    }
                }
            })

            revalidatePath('/')
            return addInfo
        }
        revalidatePath('/')

        return player

        // return await prisma.player.create({ data: { name } })
    } catch (error) {
        _log("___Create error: \n", error)
        throw new Error("__create error")
    }


}

export async function deletePlayer(payload: DeletePayload) {
    const { id } = payload
    const p = await prisma.player.findFirst({ where: { id } })
    // _log(p)
    if (p) {
        try {

            const d = await prisma.player.delete({ where: { id } })
            _log("deleted: ", d)
            revalidatePath('/')
            return d
        } catch (error) {
            _log("___Delete error: \n", error)
            throw new Error("delete error")
        }

    }

}

export async function editPlayer(PlayerId: string, data: Partial<Player & Info>) {
    const { name, rttf_score } = data
    const score = rttf_score ? +rttf_score : null
    try {
        const id = Number(PlayerId)
        const p = await prisma.player.findUnique({ where: { id } })
        if (p) {
            // const name = data?.name
            if (!name) return
            revalidatePath('/')
            const pp = await prisma.player.update({
                where: { id },
                data: {
                    name,
                    info: {
                        upsert: {


                            create: { rttf_score: score },
                            update: { rttf_score: score }
                        }
                        // connectOrCreate: {
                        //     where: { playerId: id },
                        //     create: {
                        //         rttf_score: Number(rttf_score)
                        //     }
                        // }
                    }
                },
                // include: { PlayerInfo: true }

            },
            )
            return pp

        }
        return revalidatePath('/')
    } catch (e) {
        _log(`___Edit player error: \n ${e} \n_____`)
    }

}


export async function getPlayers(options?: { info?: boolean, }) {
    try {

        const p = await prisma.player.findMany({

            include: {
                events: true,
                info: true,
                _count: { select: { events: true } }
            },
            orderBy: [
                {
                    events: {
                        _count: 'desc'
                    }
                },
                { id: 'asc' }
            ],
        })
        return p
    } catch (error) {
        _log("___Find error: \n", error)
        throw new Error("findmany error")
    }
}
// export async function getPlayersWithEvents(date?: string) {
//     _log("searchdate valid: ", dayjs(date).format("DD-MM-YY"))
//     const searchdate = dayjs(date).format("DD-MM-YY")

//     try {

//         const p = await prisma.player.findMany({
//             where: {
//                 events: {}
//             }, include: { events: true }
//         })
//         _log("finded: ", p)
//         return p
//     } catch (error) {
//         _log("___Find error: \n", error)
//         throw new Error("findmany error")
//     }
// }

export async function getOnePlayer(id: number) {
    try {

        const p = await prisma.player.findUnique({ where: { id }, include: { info: true, events: true, } })
        return p
    } catch (error) {
        _log("___Find error: \n", error)
        throw new Error("findone error")
    }
}



export async function seedPlayers() {
    const seed = parseNames.map(n => n.secondname ? { name: n.name + " " + n.secondname } : { name: n.name })
    try {
        // const pls = prisma.player.createMany({ data: seed, })
        const seedArray = seed.map(s => prisma.player.create({
            data: s,
            include: { info: true, events: true }
        }))
        return await prisma.$transaction(seedArray)
    } catch (error) {
        _log("___\n", error)
        throw new Error("SEED ERROR")
    }
}

export async function getPlayersByEventDate(payload: { event_date?: string }) {
    const { event_date } = payload
    const p = prisma.player

    try {
        if (!event_date) {
            const players = await p.findMany({
                orderBy: [{
                    events: {
                        _count: 'desc'
                    }
                },
                { id: 'asc' }]
            })
            const nonPlayers: typeof players = []
            return { players, nonPlayers }
        }

        const ev_players = await p.findMany({
            where: {
                events: {
                    some: {
                        date_formated: event_date
                    }
                }
            },
            select: {
                id: true, name: true,
            },
        })

        const nonEv_players = await p.findMany(
            {
                where: {
                    events: {
                        none: {
                            NOT: {
                                date_formated: event_date
                            }
                        }
                    }
                },
                select: {
                    id: true, name: true,
                }
            }
        )
        return { players: ev_players, nonPlayers: nonEv_players }
    } catch (error) {
        _log("___\n", error)
        throw new Error("fetch players error, __getplayers_by_event_date")
    }

}