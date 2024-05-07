
import { PlayerInfo } from "@prisma/client";
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
                            rttf_link, rttf_score
                        }
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


export async function getPlayers() {
    try {
        const p = await prisma.player.findMany()
        return p
    } catch (error) {
        _log("___Find error: \n", error)
        throw new Error("findmany error")
    }
}