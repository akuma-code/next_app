'use server'

import { Prisma, PrismaClient } from "@prisma/client"


// import prisma from "@/client/client"
const prisma = new PrismaClient()
async function fetchServer() {
    'use server'

    try {
        const data = fetch(
            "https://akumadev-git-auth-akuma-codes-projects.vercel.app/api/backup/"
        ).then(
            (r) => r.json(),
            (e) => console.log({ e })
        );
        return data;
    } catch (error) {
        throw error
    }
}
async function fetchData() {
    const server_data = await fetchServer() as { players: { id: number, name: string }[], events: any[], pairs: any[] } | undefined
    return server_data?.players

}
export async function clonePlayers() {
    try {
        // const server_data = await fetchServer() as { players: { id: number, name: string }[], events: any[], pairs: any[] }
        const server_players = await fetchData()
        if (!server_players) {
            console.log("no players")
            return null
        }

        await prisma.player.deleteMany()
        const server_id_pool = server_players?.map(p => p.id)
        const existed_players = await prisma.player.findMany({ select: { id: true, name: true } })


        // if (existed_players.length === server_data.players.length) return console.log("players in sync, all good")

        const to_create = server_players.filter(p => !existed_players.map(e => e.id).includes(p.id))

        // const create_data_players = server_data.players
        const validate = <T extends typeof to_create[number]>(player: T) => Prisma.validator<Prisma.PlayerUncheckedCreateInput>()({ id: player.id, name: player.name })
        const validated_players = to_create.map(validate)
        // const tsx_delete = prisma.player.deleteMany()

        const tsx = validated_players.map(p => prisma.player.create({ data: p }))

        const result = await prisma.$transaction(tsx)
        console.table(result)
        return result
    } catch (error) {
        console.log(error)
        throw error
    }
}