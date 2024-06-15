import { PrismaClient, UserRole } from '@prisma/client'
import { masters_to_seed, players_to_seed, players_to_seed2 } from './players'
import { events_to_seed } from './events';
import { admin } from './users';

type SeedEvent = {
    id: number;
    date_formated: string;
    title: string;
    isDraft?: boolean
    players: {
        id: number;
        name: string;
        createdAt: string;
        updatedAt: string;
    }[];
}

export const prisma = new PrismaClient()

export async function seedPlayers(seed_names: string[]) {
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
export async function seedObjectPlayers(seed_players: { id: number, name: string }[]) {
    try {

        const seedArray = seed_players.map(s => prisma.player.create({
            data: {
                name: s.name,
            },

        }))
        return await prisma.$transaction(seedArray)
    } catch (error) {
        console.log("___\n", error)
        throw new Error("SEED PLAYERS ERROR")
    }
}

export async function seedEvents(seed_events: SeedEvent[]) {
    const ev = prisma.event

    try {
        // console.log(seed_events[0])
        const seed = seed_events.map(e => ev.create({
            data: {
                date_formated: e.date_formated,
                title: e.title,
                id: e.id,
                isDraft: e.isDraft || false,

            }
        }))


        return await prisma.$transaction(seed)
    } catch (error) {
        console.log("\n seed events error \n", error)
        throw new Error("Restore events error")
    }
}

export async function seedMasters(masters: { name: string }[]) {
    try {
        const seed = masters.map(m => prisma.master.create({ data: m }))

        return await prisma.$transaction(seed)
    } catch (error) {
        console.log(error)
        throw new Error("_____Seed master error")
    }

}

async function seedAdmin() {



    try {
        const user = prisma.user.create({
            data: { email: admin.email, password: admin.password, role: UserRole.ADMIN, name: admin.name }
        })
        return user
    } catch (e) {
        console.log(e)
        throw new Error("Seed admin error")
    }
}

export async function seed_db() {
    const players_seed = seedObjectPlayers(players_to_seed2).finally(console.table)
    const masters_seed = seedMasters(masters_to_seed).finally(console.table)
    const events_seed = seedEvents(events_to_seed).finally(console.table)
    const user_seed = seedAdmin().finally(console.table)
    return Promise.all([
        players_seed,
        masters_seed,
        events_seed,
        user_seed
    ]).then(
        () => console.log("Database seeded succesful"),
        (e) => console.log("SEED ERROR!", e))
}

seed_db().then(async () => {
    await prisma.$disconnect()
})
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })