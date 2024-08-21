'use server'

import { Prisma, PrismaClient } from "@prisma/client"
import { server_data } from "./data"

// import prisma from "@/client/client"
const prisma = new PrismaClient()
export async function clonePlayers() {
    try {
        const create_data_players = server_data.players
        const validate = <T extends typeof create_data_players[number]>(player: T) => Prisma.validator<Prisma.PlayerUncheckedCreateInput>()({ id: player.id, name: player.name })
        const validated_players = create_data_players.map(validate)
        const tsx_delete = prisma.player.deleteMany()

        const tsx = validated_players.map(p => prisma.player.create({ data: p }))

        const result = await prisma.$transaction([tsx_delete, ...tsx])
        console.table(result)
        return result
    } catch (error) {
        throw error
    }
}

export async function cloneEvents() {
    try {
        const db = server_data.events
        const validate = (e: typeof db[number]) => Prisma.validator<Prisma.EventUncheckedCreateInput>()({
            id: e.id,
            date_formated: e.date_formated,
            players: { connect: e.players.map(p => ({ id: p.id })) },

        })

        const validated_events = db.map(validate)
        // const tsx_del = prisma.event.deleteMany()
        const tsx_events = validated_events.map(e => prisma.event.create({ data: e }))
        const res = await prisma.$transaction(tsx_events)
        console.table(res)
        return res
    } catch (error) {
        throw error
    }
}

export async function clonePairs() {
    try {
        const db = server_data.pairs
        const validatePair = (pair: typeof db[number]) => Prisma.validator<Prisma.PairCreateInput>()({
            player: {
                connectOrCreate: {
                    create: { name: pair.player.name },
                    where: { id: pair.playerId }
                },
                // event:{connect:{id:pair.eventId}}
            },
            event: { connect: { id: pair.eventId } },
            master: {
                connectOrCreate: {
                    where: { id: pair.masterId },
                    create: { name: pair.master.name }
                }
            }

        })
        const validated = db.map(validatePair)
        const tsx_pairs = validated.map(p => prisma.pair.create({ data: p }))
        const res = await prisma.$transaction(tsx_pairs)
        console.table(res)
        return res
    } catch (error) {
        throw error
    }
}