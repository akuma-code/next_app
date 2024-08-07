'use server'

import prisma from "@/client/client"
import { Prisma } from "@prisma/client"
import { DefaultArgs } from "@prisma/client/runtime/library"

const default_filter = {
    by: ['id', 'date_formated', 'isDraft'] as const,
    orderBy: { date_formated: 'desc' }
} satisfies Prisma.EventGroupByArgs
export async function getEventsGroup(params: Prisma.EventGroupByArgs<DefaultArgs> = default_filter) {
    const { by, orderBy, having } = params;

    const p = await prisma.event.groupBy({
        by, having, orderBy
    })
    return p
}