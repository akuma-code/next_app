'use server'
import { Player, PlayerInfo } from "@prisma/client";
import prisma from "../../prisma/client/client";
import { _log } from "@/Helpers/helpersFns";
import { revalidatePath } from "next/cache";


type DeletePayload = {
    id: number
}

type InfoCreatePayload = {
    rttf_score?: number
    rttf_link?: string
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
                        update: {

                            rttf_link,
                            rttf_score: score
                        }
                        // connectOrCreate: {
                        //     where: { playerId: id },
                        //     create: {
                        //         rttf_score: Number(rttf_score)
                        //     }
                        // }
                    }
                },
                include: { PlayerInfo: true }

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

        const p = await prisma.player.findMany({ include: { PlayerInfo: !!info } })
        return p
    } catch (error) {
        _log("___Find error: \n", error)
        throw new Error("findmany error")
    }
}
export async function getOnePlayer(id: number) {
    try {

        const p = await prisma.player.findUnique({ where: { id }, include: { PlayerInfo: true } })
        return p
    } catch (error) {
        _log("___Find error: \n", error)
        throw new Error("findone error")
    }
}