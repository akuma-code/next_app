
import db from "@/dataStore/db_events/events100724";
import { events_to_seed, eventsMap } from "./events";
import { backup_players_1506, masters_to_seed, players_to_seed2 } from "./players";
import { seedEvents, seedEventsMap, seedMasters, seedObjectPlayers, SeedOptions, seedUsers } from "./seed";
import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export interface EventsMapObject {
    players: { name: string, id: number }[]
    id: number;
    date_formated: string;
    title: string;
    isDraft: boolean;
    // eventInfo?: null;
    pairs: Prisma.PairWhereUniqueInput[]
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


async function seed_db(options?: SeedOptions) {

    console.log("🚀 ~ seed_enabled:", seed_enabled)
    if (seed_enabled === false) {
        console.log("Seed is turned off", { seed_enabled })
        return null
    }
    console.log("\n____ _____ Seeding started!")
    // const events_seed = seedEventsMap(db.events)

    // const masters_seed = seedMasters(masters_to_seed, options)
    // const user_seed = seedUsers(options)

    const all_seed = seedEventsMap(db.events)
        .then(
            () => seedMasters(masters_to_seed, options)
        )
        .then(
            () => seedUsers(options)
        )
    // return prisma.$transaction([players_seed, masters_seed, events_seed, user_seed])
    return Promise.all([all_seed])
        .then(
            (r) => console.log("Database seeded succesful", r),
            (e) => console.log("SEED ERROR!", e)
        );
}

const options = { force: seed_enabled }





seed_db(options)
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    })