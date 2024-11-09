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
    const gr = groupByDate1(e, () => true)
    console.log(gr)
    const formatted = e.map(ee => ({ date: toDayjs(ee.date_formated), total: ee._count.players, id: ee.id }))
    return formatted
}

function groupByDate1<T extends {
    id: number
    date_formated: string;
    _count: {
        players: number;
    }
}>(arr: T[], fn: ((args?: any) => boolean)) {

    const res__ = arr.reduce((sum, c) => {
        const [y, m, d] = c.date_formated.split("-")
        if (!sum) sum = []
        else sum.push({ month: m, total: c._count.players })
        return sum
    }, [] as { month: string; total: number }[])



    // const res_ = arr.reduce((sum, c) => {
    //     const [y, m, d] = c.date_formated.split("-")
    //     if (!sum[y]) sum[y] = []
    //     else sum[y].push({ month: m, total: c._count.players })
    //     const CURRENT = sum[y]

    //     // CURRENT.reduce((ss, curr) => {
    //     //     const s = ss.total += curr.total
    //     //     CURRENT.map(i => i.month === m ? { ...i, total: i.total + s } : i)
    //     //     return ss
    //     // })
    //     return sum


    // }, {} as Record<string, { month: string; total: number }[]>)



    // const res = arr.reduce((sum, c) => {
    //     const [y, m, d] = c.date_formated.split("-")
    //     const data = { month: m, total: c._count.players }
    //     if (!sum[y]) sum[y] = []
    //     sum[y].push(data)



    //     return sum


    // }, {} as Record<string, { month: string; total: number }[]>)
    // const rr = Object.entries(res).reduce((sum, [k, vals]) => {

    //     vals.reduce((ss, c) => {
    //         const { total, month } = c;
    //         ss = ss.month === month ? { ...ss, total: ss.total + total } : { ...ss }


    //         return ss
    //     })



    //     return sum
    // }, {})

    return res__
}