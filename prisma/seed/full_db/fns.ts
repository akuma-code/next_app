'use server'

import { PrismaClient, Prisma } from "@prisma/client";
import { readFileSync } from "fs";


const db = new PrismaClient()
async function readFile<T>(path: string) {
    const file = readFileSync(path, { encoding: 'utf8' })
    const parsed = JSON.parse(file) as T
    // console.log('\n', parsed, '\n')
    return parsed
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

export async function map_data() {
    const data = await loadFiles()
    // console.log(data)
}


async function checkPlayerName(name: string): Promise<Prisma.PlayerCreateOrConnectWithoutEventsInput> {
    const exist = await db.player.findFirst({ where: { name }, select: { id: true } })
    let result;
    if (exist) {
        result = { id: exist.id, name }
    } else {
        result = { name }
    }
    return { where: { id: result.id }, create: { name } }
}
async function name_test() {

    return await db.event.update({ where: { date_formated: '123' }, data: { players: { connectOrCreate: await checkPlayerName('pavel') } }, include: { players: true } })
}


export async function reseedMasters() {
    const masters = [
        { name: "Алан Заикин" },
        { name: "Антон Козлов" },
        { name: "Надежда Отпетова" },
        { name: "Максим Ушкарев" },
    ]
    try {
        const del = db.master.deleteMany()
        const seed = masters.map((m) => db.master.create({ data: m }));
        const tsx = [del, ...seed]
        return await db.$transaction(tsx);
    } catch (error) {
        console.log(error);
        throw new Error("_____Seed master error");
    }
}