'use server'

import prisma from "@/client/client"
import { _dbDateParser } from "@/Helpers/dateFuncs"

export async function getMonthEventPlayers() {
    const e = await prisma.event.findMany({
        select: {
            id: true,
            date_formated: true,
            _count: { select: { players: true } }
        },
        orderBy: { date_formated: 'desc' },
        take: 20
    })

    const formatter = (date: string) => date.split("-").map(Number)
    const toDayjs = (date: string) => _dbDateParser(date).dd_mmmm
    const gr = groupByDate(e)
    console.log(gr)
    const formatted = e.map(ee => ({ date: toDayjs(ee.date_formated), total: ee._count.players, id: ee.id }))
    return formatted
}

function groupByDate<T extends {
    id: number
    date_formated: string;
    _count: {
        players: number;
    }
}>(arr: T[]) {

    const res = arr.reduce((sum, c) => {
        const [y, m, d] = c.date_formated.split("-")
        if (!sum[y]) sum[y] = []
        else sum[y].push({ month: m, total: c._count.players })
        return sum


    }, {} as { [year: string]: { month: string, total: number }[] })
    // return Object.entries(res).map(([y, v]) => ({ [y]: v.reduce((s, c) => ({ ...s, total: s.total + c.total })) }))

    return res
}