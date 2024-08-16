'use server'

import { PrismaClient, Prisma } from "@prisma/client";
import { readFileSync } from "fs";
import { data } from "./data";

const db = new PrismaClient()
async function readFile<T>(path: string) {
    const file = readFileSync(path, { encoding: 'utf8' })
    const parsed = JSON.parse(file) as T
    // console.log('\n', parsed, '\n')
    return parsed
}
async function seedMasters() {
    const masters = [
        { name: "Алан Заикин" },
        { name: "Антон Козлов" },
        { name: "Надежда Отпетова" },
        { name: "Максим Ушкарев" },
    ]
    try {
        const seed = masters.map((m) => db.master.create({ data: m }));

        return await db.$transaction(seed);
    } catch (error) {
        console.log(error);
        throw new Error("_____Seed master error");
    }
}
export async function loadFiles() {
    try {
        const e = (await readFile("./data/file.json")) satisfies {

            pairs: any[];
            events: string[];

        }[]

        const p = await readFile<string[]>("./data/last_players.json")
        console.log({ e, p });
        return { events: e, players: p };
    } catch (error) {
        throw error
    }
}
async function getOrCreatePlayer(name: string) {

    const p = await db.player.findFirst({ where: { name }, select: { name: true, id: true } })
    const result = p ? p : await db.player.create({ data: { name }, select: { name: true, id: true } })
    return result satisfies Prisma.PlayerCreateInput
}
export async function map_tsx_data(payload?: typeof data) {
    const { events } = payload || data;

    // const events_updated = events.map(e => ({ ...e, players: e.players.map(async (n)=>await getOrCreatePlayer(n)) }))

    const active_players = Array.from(new Set(events.map(e => e.players).flat(1))).map(name => ({ name }))
    const tsx_players_create = active_players.map(p => db.player.create({ data: p, select: { name: true, id: true } }))
    const tsx_events_create = events.map(e => {

        return db.event.create({
            data: { date_formated: e.date },
            select: { id: true, date_formated: true }
        })
    })


    return [tsx_players_create, tsx_events_create] as const

}
export async function seed_main_data(seed_data = data) {
    const next_ = seed_data.events.map(e => ({ date: e.date, names: e.players, pairs: e.pairs }))
    const [players, events] = await map_tsx_data(seed_data)
    try {
        const masters = await seedMasters()
        // const p = await db.$transaction(players)
        const e = await db.$transaction(events)
        // console.table(p)
        console.table(e)
        return [next_, masters] as const
    } catch (error) {
        console.log(error)
        throw error
    }
}
export async function update_main_data(prev: Awaited<ReturnType<typeof seed_main_data>>) {
    const [players, updater,] = prev
    // const up = updater.map(u => ({
    //     ...u,
    //     players: u.names.map(n => players.find(p => p.name === n)!),
    //     pairs: u.pairs.map(n => ({ ...n, player: players.find(p => p.name === n.player)!, master: masters.find(p => p.name === n.master)! }))

    // }))
    // const tsx = up.map(e => db.event.update({ where: { date_formated: e.date }, data: { players: { connect: e.players } } }))
    // const result = await db.$transaction(tsx)
    // return result
}

export async function clear_main_data() {
    // await db.player.deleteMany()
    await db.event.deleteMany()
    await db.master.deleteMany()
}

async function checkPlayerName(name: string) {
    const exist = await db.player.findFirst({ where: { name }, select: { id: true } })
    let result;
    if (exist) {
        result = { id: exist.id, name }
    } else {
        result = { name }
    }
    return { where: { id: result.id }, create: { name } } satisfies Prisma.PlayerCreateOrConnectWithoutEventsInput
}

