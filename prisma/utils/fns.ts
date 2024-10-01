'use server'

import prisma from "@/client/client";
import { _isArr } from "@/Helpers/helpersFns";
import { Prisma } from "@prisma/client";

type DB_FieldsEnum = "event" | "player" | "pair" | "master"
export async function clear_db(columns: DB_FieldsEnum | DB_FieldsEnum[]) {
    if (!columns || columns.length === 0) return console.log("No fields selected. Clearing Cancelled")
    const event = prisma.event.deleteMany()
    const player = prisma.player.deleteMany()
    const pair = prisma.pair.deleteMany()
    const master = prisma.master.deleteMany()

    const db: Record<DB_FieldsEnum, Prisma.PrismaPromise<Prisma.BatchPayload>> = {
        event, player, pair, master
    }
    const tsx = []
    if (_isArr(columns) === true) {
        columns.forEach(c => tsx.push(db[c as keyof typeof db]))

    } else {
        tsx.push(db[columns])
    }
    console.log("columns to delete: ", columns)
    return await prisma.$transaction(tsx)

}