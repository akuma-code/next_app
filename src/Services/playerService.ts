'use server'
import { Player, PlayerInfo } from "@prisma/client";

import { _log } from "@/Helpers/helpersFns";
import { revalidatePath } from "next/cache";
import dayjs, { Dayjs } from "dayjs";
import { _date } from "@/Helpers/dateFuncs";
import prisma from "@/client/client";
import { parseNames } from "@/dataStore/avangardPlayers";


type DeletePayload = {
    id: number
}

type InfoCreatePayload = {
    rttf_score?: number
    rttf_link?: string
}

export type PlayerWithInfo = {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date,
    PlayerInfo:
    {
        uuid: string;
        rttf_score: number | null;
        rttf_link: string | null;
        playerId: number;
    } | null;
    events?: {
        id: number;
        date: Date;
    }[];
}
export async function createPlayer(name: string, info?: InfoCreatePayload) {
    try {
        const player = await prisma.player.create({
            data: {
                name
            },
            include: { PlayerInfo: true }
        })
        if (info) {
            const { rttf_score, rttf_link } = info;

            const addInfo = await prisma.player.update({
                where: { id: player.id },
                data: {
                    PlayerInfo: {
                        create: {
                            // where: { playerId: player.id },
                            // create: { rttf_link, rttf_score }
                            rttf_link, rttf_score
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

export async function editPlayer(PlayerId: string, data: Partial<Player & PlayerInfo>) {
    const { name, rttf_score, rttf_link } = data
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
                    PlayerInfo: {
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


export async function getPlayers(info?: string) {
    try {

        const p = await prisma.player.findMany({
            select: {
                PlayerInfo: true,
                events: true,
                id: true,
                name: true,
                createdAt: true,
                updatedAt: true
            },
            orderBy: {
                events: { _count: 'desc' },
                // id: 'asc'
            },
        })
        return p
    } catch (error) {
        _log("___Find error: \n", error)
        throw new Error("findmany error")
    }
}
export async function getPlayersWithEvents(date?: string) {
    _log("searchdate valid: ", dayjs(date).format("DD-MM-YY"))
    const searchdate = dayjs(date).format("DD-MM-YY")

    try {

        const p = await prisma.player.findMany({
            where: {
                events: {

                }
            }, include: { events: true }
        })
        _log("finded: ", p)
        return p
    } catch (error) {
        _log("___Find error: \n", error)
        throw new Error("findmany error")
    }
}
export async function getPlayersByDateString(date?: string) {
    _log("searchdate valid: ", dayjs(date).isValid())
    const searchdate = dayjs(date).format('DD-MM-YYYY')
    try {
        const events = await prisma.event.findMany() //* все ивенты
        const players = await prisma.player.findMany({ include: { events: { select: { id: true } } } }) //* все игроки + ид ивентов
        const fevents = events.map(e => ({ ...e, date: dayjs(e.date).format('DD-MM-YYYY') })) //* форматируем дату ивентов
        const eresult = fevents.find(e => e.date === searchdate)?.id //* ищем ивент с датой, совпадающей с искомой
        _log("\nev.id: ", eresult)
        if (eresult) {
            const pres = players.filter(p =>
                p.events.map(e => e.id).includes(eresult)) //* если ивент нашелся, фильтруем игроков у которых есть ивент с искомым ид
            _log("\nev.play", pres.map(p => p.name))
            return pres
        }
        return []
    } catch (error) {
        _log("___Find error: \n", error)
        throw new Error("findmany error")
    }
}
export async function getOnePlayer(id: number) {
    try {

        const p = await prisma.player.findUnique({ where: { id }, include: { PlayerInfo: true, events: true, } })
        return p
    } catch (error) {
        _log("___Find error: \n", error)
        throw new Error("findone error")
    }
}
export async function getPlayersByEventId({ eventId, date }: { eventId?: number, date: string }) {
    if (date) {
        const p = prisma.event.findFirst({
            where: { formated_date: date },
            include: { players: true },

        })
        return p
    }
}


interface PlayerFullInfo {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    events: {
        id: number;
        date: Date;
    }[];
    PlayerInfo: {
        uuid: string;
        rttf_score: number | null;
        rttf_link: string | null;
        playerId: number;
    } | null;
}

export async function getPlayerWithCondition(condition: any): Promise<PlayerFullInfo[]> {
    const dbp = prisma.player
    return await dbp.findMany({ where: condition, include: { events: true, PlayerInfo: true } })


}

export async function seedPlayers() {
    const seed = parseNames.map(n => n.secondname ? { name: n.name + " " + n.secondname } : { name: n.name })
    try {
        // const pls = prisma.player.createMany({ data: seed, })
        const seedArray = seed.map(s => prisma.player.create({
            data: s,
            include: { PlayerInfo: true, events: true }
        }))
        return await prisma.$transaction(seedArray)
    } catch (error) {
        _log("___\n", error)
        throw new Error("SEED ERROR")
    }
}