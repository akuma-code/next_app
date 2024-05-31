import { PrismaClient } from '@prisma/client'
import { seed_players } from './players'
import { events_to_seed } from './events';
type SeedEvent = {
    id: number;
    date_formated: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    players: {
        id: number;
        name: string;
        createdAt: string;
        updatedAt: string;
    }[];
}

const prisma = new PrismaClient()

async function seedPlayers(seed_names: string[]) {
    try {

        const seedArray = seed_names.map(s => prisma.player.create({
            data: { name: s },
            include: { info: true, events: true }
        }))
        return await prisma.$transaction(seedArray)
    } catch (error) {
        console.log("___\n", error)
        throw new Error("SEED ERROR")
    }
}

async function seedEvents(seed_events: SeedEvent[]) {
    const ev = prisma.event

    try {
        const seed = seed_events.map(e => ev.create({
            data: {
                date_formated: e.date_formated,
                title: e.title,
                id: e.id,
                players: {
                    connect: e.players.map(p => ({ id: p.id })),
                },
            }
        }))
        return await prisma.$transaction(seed)
    } catch (error) {
        console.log("\n seed events error", error)
        throw new Error("Restore events error")
    }
}

async function seed_db() {
    const players_seed = await seedPlayers(seed_players)
    const events_seed = await seedEvents(events_to_seed)
    console.table(players_seed)
    console.table(events_seed)
}


seed_db().then(async () => {
    await prisma.$disconnect()
})
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })