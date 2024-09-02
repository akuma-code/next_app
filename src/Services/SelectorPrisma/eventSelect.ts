

import { Prisma } from "@prisma/client"


type EventSelectorType = "standart" | "all"
export function eventSelect(type: EventSelectorType = "standart") {
    const select_default = {
        id: true,
        date_formated: true,
        title: true,
        eventInfo: false,
        pairs: true,
        players: { select: { id: true, name: true } }
    } satisfies Prisma.EventSelect

    const select_all = {
        id: true,
        date_formated: true,
        title: true,
        eventInfo: false,
        pairs: true,
        players: { select: { id: true, name: true } }
    } satisfies Prisma.EventSelect


    switch (type) {
        case "standart": return select_default
        case "all": return select_all
        default: return select_default
    }
}