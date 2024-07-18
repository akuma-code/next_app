'use server'
/* eslint-disable import/no-anonymous-default-export */

import prisma from "@/client/client"
import { _log } from "@/Helpers/helpersFns"
import { events_last } from "@/seed/events"
import { seedFromJson } from "@/seed/json/seedJson"
import { masters_to_seed, players_to_seed2 } from "@/seed/players"
import { seedEventsMap, seedMasters, seedObjectPlayers } from "@/seed/seed"
import { members_seed } from "@/seed/users"
import { getMasters, removeMaster } from "@/Services/masterService"
import { DB_JSON_DATA } from "@/Types"
import dayjs from "dayjs"
import { revalidatePath } from "next/cache"
import backup from './../../../public/json/data.json'
export async function reseedMasters() {

    const existedmasters = await getMasters()
    console.log("🚀 ~ reseedMasters ~ existedmasters:", existedmasters)
    if (existedmasters.length > 0) await removeMaster()
    try {
        const m = await seedMasters(masters_to_seed)
        return m
    } catch (error) {
        _log(error)
    }
}
async function seedUsers() {
    try {
        const users = members_seed.map((user) =>
            prisma.user.create({ data: user })
        );
        // const user = prisma.user.create({
        //     data: { email: admin.email, password: admin.password, role: UserRole.ADMIN, name: admin.name }
        // })
        return await prisma.$transaction(users);
    } catch (e) {
        console.log(e);
        throw new Error("Seed admin error");
    }
}
export async function reseedPlayers(force = false) {
    // const force = JSON.parse(process.env.DB_SEED_FORCE ?? "false") as boolean;
    await seedUsers()
    await seedObjectPlayers(players_to_seed2, { force });
}

export async function reseedEvents() {
    return await seedEventsMap(events_last, { clear: true, abortSygnal: false })
}

export async function backupEvents() {
    const data = await getBackupEvents()
    const today = dayjs().format("DD.MM.YYYY").toString()
    const backup = {
        date: today,
        events: data
    }
    console.log({ data })
    return {
        date: today,
        data
    }
}

export async function getBackupEvents() {
    return await prisma.event.findMany({
        select: {
            id: true,
            date_formated: true,
            pairs: true,

            players: {
                select: {
                    id: true, name: true
                }
            },
            title: true,
            isDraft: true
        }
    })
}
export async function getBackup() {
    const events = await prisma.event.findMany({ include: { players: true, pairs: true } })

    const pairs = await prisma.pair.findMany()

    return { events, pairs }

}

export async function reseedEventsFromJson(data_json: DB_JSON_DATA = backup) {
    let data: DB_JSON_DATA = data_json


    try {
        await prisma.event.deleteMany()
        const { events, pairs } = data;

        await seedFromJson({ events, pairs })
        console.log("events restored ", events.length)
    } catch (error) {
        console.error("Events restore failed!")

        throw error
    } finally { revalidatePath("/") }


}