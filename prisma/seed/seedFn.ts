

import { Prisma, PrismaClient } from "@prisma/client";
import { seedFromJson } from "./json/seedJson";
import { SeedOptions } from "./seed";
const prisma = new PrismaClient();
export interface EventsMapObject {
    players: { name: string, id: number }[]
    id: number;
    date_formated: string;
    title: string;
    isDraft: boolean;
    // eventInfo?: null;
    pairs: (Prisma.PairCreateWithoutEventInput & { id?: number })[]
}
export type EventsBackupPayload = {

} & Prisma.$EventPayload['scalars'] & Exclude<Prisma.$EventPayload['objects'], 'eventInfo'>
// async function seedEventsMap(eventsMap: EventsMapObject[], options = { abortSygnal: false, clear: false }) {
//     // const connect_player = (player_id: number, event_id: number) => prisma.player.update({ where: { id: player_id }, data: { events: { connect: { id: event_id } } } })
//     if (options.abortSygnal) {
//         console.log("Seed aborted!")
//         return null
//     }
//     if (options.clear === true) await prisma.event.deleteMany()
//     const ev_array = eventsMap.map(e => {

//         const p = prisma.event.create({
//             data: {
//                 date_formated: e.date_formated,
//                 title: e.title,
//                 // players: { create: e.players }
//             },
//             select: {
//                 id: true,
//                 pairs: true,
//                 date_formated: true,
//                 players: { select: { id: true, name: true } },
//             }
//         })

//         return p
//     })
//     const events = await prisma.$transaction(ev_array)

//     events.forEach(async (e) => {
//         await prisma.event.update({
//             where: { date_formated: e.date_formated }, data: {
//                 players: { connect: e.players }
//             }
//         })
//     })
//     return events


// }



const seed_enabled = process.env.DB_SEED_ENABLE === 'true'
const options = { force: seed_enabled, seed_enabled }
// const db_events = db.events
// async function seed_db(options?: SeedOptions) {

//     console.log("🚀 ~ seed_enabled:", { seed_enabled })
//     if (seed_enabled === false) {
//         console.log("Seed is turned off", { seed_enabled })
//         return
//     }
//     console.log("\n____ _____ Seeding started!\n")

//     const user_seed = seedUsers(options)

//     const events_seed = seedEventsMap(events_last, { clear: true, abortSygnal: false })

//     return Promise.allSettled([
//         user_seed,
//         // seedPairs(),
//         reseedMasters(),
//         events_seed,
//     ])
//         .then(
//             (r) => console.log("Database seeded succesful", r),
//             (e) => console.log("SEED ERROR!", e)
//         );
// }

async function syncPairs() {
    try {
        const pairs = await prisma.pair.findMany()
        // if (!pairs.every(p => !!p.masterId)) return console.log("\nskipped!\n")
        console.log("\nSYNCING!\n")
        const tsx_pairs = pairs.map(p => prisma.pair.update({
            where: { id: p.id },
            data: {
                player: { connect: { id: p.secondPlayerId ?? p.playerId } },
                master: { connect: { id: p.firstPlayerId ?? p.masterId } }
            }
        }))
        const tsx = await prisma.$transaction(tsx_pairs)
        console.log({ tsx })
        // return tsx
    } catch (error) {
        console.log(error)
    }
}
async function seed_fromJson(options?: SeedOptions) {
    console.log("🚀 ~ seed_enabled:", { seed_enabled })
    if (options && options.clear === true) {
        await prisma.event.deleteMany()
        // await prisma.player.deleteMany()
        // await prisma.pair.deleteMany()



    }
    try {
        if (seed_enabled === false) {
            console.log("Seed is turned off", { seed_enabled })
            return
        }


        console.log("\n____ _____ Seeding started!\n")

        await seedFromJson().then(syncPairs)
    } catch (error) {
        console.log(error)
    }

}




seed_fromJson({ clear: true, force: true })
    .then(async (r) => {
        console.log("seed_result: \n", r)
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    })