'use server'

import prisma from "@/client/client"
import { _dbDateParser } from "@/Helpers/dateFuncs"
import { Prisma } from "@prisma/client"

export async function updateEventTitle() {
    const es = await prisma.event.findMany()

    const updater = (e: typeof es[number]) => ({ title: `${_dbDateParser(e.date_formated).dd_mmmm}, ${_dbDateParser(e.date_formated)._dayjs.format("DD")}` })
    const validator = (e: typeof es[number]) => Prisma.validator<Prisma.EventUpdateArgs>()({
        where: { id: e.id },
        data: updater(e),
    })

    const tsx = es.map((e) => prisma.event.update(validator(e)))

    const result = await prisma.$transaction(tsx)
    console.table(result)


}