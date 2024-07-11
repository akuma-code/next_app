'use server'
/* eslint-disable import/no-anonymous-default-export */

import prisma from "@/client/client"
import { _log } from "@/Helpers/helpersFns"
import { eventsMap } from "@/seed/events"
import { masters_to_seed, players_to_seed2 } from "@/seed/players"
import { seedEventsMap, seedMasters, seedObjectPlayers } from "@/seed/seed"
import { getMasters, removeMaster } from "@/Services/masterService"
import dayjs from "dayjs"
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

export async function reseedPlayers(force = false) {
    // const force = JSON.parse(process.env.DB_SEED_FORCE ?? "false") as boolean;
    await seedObjectPlayers(players_to_seed2, { force });
}

export async function reseedEvents() {
    return await seedEventsMap(eventsMap, { clear: true, abortSygnal: false })
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
            pairs: {
                select: {
                    eventId: true,
                    firstPlayerId: true,
                    secondPlayerId: true
                }
            },
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
