'use server'

import prisma from "@/client/client";
import { Prisma } from "@prisma/client";

export async function getPlayerInfo(payload: Prisma.PlayerFindUniqueArgs) {
    try {
        const { where, include, select } = payload;
        const p = prisma.player.findUnique({
            where,
            select: { id: true, name: true }

            // include:{
            //     pairs:true,
            //     events:true,
            //     ticket:true,
            //     _count:{select:{events:true}},
            //     ...include
            // }
        })
        const player = await p
        const events = await p.events({ select: { id: true, date_formated: true, title: true } })
        const pairs = await p.pairs()
        const ticket = await p.ticket()

        const result = { player, events, pairs, ticket }

        return result
    } catch (error) {
        throw error
    }

}