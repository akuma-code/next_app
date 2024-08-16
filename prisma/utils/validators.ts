

import { players } from "@/seed/full_db/data";
import { Prisma } from "@prisma/client";


type EventFields = Prisma.EventScalarFieldEnum
type EventPayload = Prisma.EventUncheckedCreateInput
export async function seed_event_validator(unchecked_event: unknown) {
    const check_arr: (keyof EventPayload)[] = [
        'date_formated', "id", "title", "pairs", "title", 'players'
    ] as const

    const e = create_eventValidator(unchecked_event)
    console.log({ e })
    function checkEventFields(event: unknown): event is EventPayload {
        if (typeof event !== 'object' || !event) return false
        const checkKeys = check_arr.every(key => key in event)
        if (!checkKeys) return false
        const keys = Object.keys(event)
        //   if(!keys.some(k=>check_arr.includes(k as keyof EventPayload))) return false
        if (!keys.some(k => check_arr.includes(k as keyof EventPayload))) {
            console.log("Check fields error!", keys)
            return false


        }
        return true

    }
    if (!checkEventFields(unchecked_event)) {
        console.error("Failed item: ", unchecked_event)
        throw new Error("validation error")

    } else return unchecked_event
}

export function create_eventValidator(
    object: any
) {


    const { date_formated, pairs, players, title } = object
    return Prisma.validator<Prisma.EventUncheckedCreateInput>()({ date_formated, players, pairs, title })

}