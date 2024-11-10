import { red } from "@mui/material/colors"

enum _mn {
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
}

type MonthCount = Record<keyof typeof _mn, number>
type MN = keyof typeof _mn
type MonthItem = {
    [x in MN]?: number
}
type GrouppedItem = {
    year?: string


} & MonthItem


//? {date_f, _count}[]=>{m, y, total}[]=>{y, mn?:number}
export function groupByMonth<T extends {
    id: number
    date_formated: string;
    _count: {
        players: number;
    }
}>(events: T[]): GrouppedItem[] {
    const _format = (e: T) => {
        const [year, month] = e.date_formated.split("-")
        const index = Number(month)
        const m = _mn[index - 1]
        return { month: m, total: e._count.players, year }
    }

    const formated_events = events.map(_format)
    const keys = getKeys(formated_events)
    const key_total = (items: typeof formated_events, m: string) => items.filter(i => i.month === m).reduce((res, curr) => ({ ...res, total: res.total + curr.total, month: curr.month }), { total: 0 })
    const key_reduce = (items = formated_events) => {
        return items.reduce((res, i) => {
            const { month, total, year } = i;
            if (!res) {
                res = { [i.month as MN]: i.total }
                return res
            }
            const t = res[i.month as MN] || 0
            return { ...res, [i.month as MN]: t + i.total }
        }, {} as MonthItem)
    }
    console.log(key_reduce(formated_events))
    // console.table(formated_events)
    const reduced = keys.map(k => ({ ...key_total(formated_events, k) })) as GrouppedItem[]
    // const reduced = keys.map(k => ({ year: '2024', total: key_total(formated_events, k).total, month: k })) as GrouppedItem[]
    // const reduced = keys.map(k => ({ [k]: key_total(formated_events, k).total })) as GrouppedItem[]

    return reduced


}

export function group(items: { date: string, total: number, id: number }[]) {
    console.table(items)
}

function getKeys<T extends { month: string }>(items: T[]): string[] {
    const a = Array.from(new Set(items.map(i => i.month)))
    return a

}