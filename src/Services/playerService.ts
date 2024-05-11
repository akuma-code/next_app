'use server'
import { Player, PlayerInfo } from "@prisma/client";
import prisma from "../../prisma/client/client";
import { _log } from "@/Helpers/helpersFns";


type DeletePayload = {
    id: number
}
export async function createPlayer(name: string, info?: Partial<PlayerInfo>) {
    try {
        if (info) {
            const { rttf_score, rttf_link } = info;

            const p = prisma.player.create({
                data: {
                    name,
                    PlayerInfo: {
                        create: {
                            rttf_link, rttf_score: rttf_score ? +rttf_score : undefined
                        }
                    }
                },
                select: {
                    name: true,
                    PlayerInfo: {
                        select: { rttf_link: true, rttf_score: true }
                    }
                }
            })

            return prisma.$transaction([p])
        }

        return await prisma.player.create({ data: { name } })
    } catch (error) {
        _log("___Create error: \n", error)
        throw new Error("__create error")
    }


}

export async function deletePlayer(payload: DeletePayload) {
    const p = await prisma.player.findUnique({ where: payload })
    if (p) {
        try {
            return await prisma.player.delete({ where: payload })
        } catch (error) {
            _log("___Delete error: \n", error)
            throw new Error("delete error")
        }

    }

}

export async function editPlayer(PlayerId: string, data: Partial<Player & PlayerInfo>) {
    try {
        const id = Number(PlayerId)
        const p = await prisma.player.findUnique({ where: { id } })
        if (p) {
            const name = data?.name
            if (!name) return

            return await prisma.player.update({
                where: { id },
                data: { ...data }
            },
            )


        }
        return
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