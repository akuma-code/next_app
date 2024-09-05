'use server'

import prisma from "@/client/client"
import { default_event_select } from "@/Types"
import { Prisma } from "@prisma/client"
import { Args, Operation, Payload } from "@prisma/client/runtime/library"
import { useQuery } from "@tanstack/react-query"



export type PCategoryies = "event" | "player" | "ticket" | "pair"
export type SearchUniquePayload = {
    event: Prisma.EventFindUniqueArgs;
    player: Prisma.PlayerFindUniqueArgs;
    ticket: Prisma.TicketFindUniqueArgs;
    pair: Prisma.PairFindUniqueArgs;
}
export type SearchManyPayload = {
    event: Prisma.EventFindManyArgs;
    player: Prisma.PlayerFindManyArgs;
    ticket: Prisma.TicketFindManyArgs;
    pair: Prisma.PairFindManyArgs;
}

export type GetPayload<T extends PCategoryies, O extends Operation> = Args<typeof prisma[T], O>
export type Get_ARGS<T extends PCategoryies, O extends "findMany" | "findUnique"> = {
    category: T
    operation: O
    payload: GetPayload<T, O>
}

type EFM_Args = Get_ARGS<"event", "findMany">
type EFU_Args = Get_ARGS<"event", "findUnique">
type PFM_Args = Get_ARGS<"player", "findMany">
type PFU_Args = Get_ARGS<"player", "findUnique">
type TFM_Args = Get_ARGS<"ticket", "findMany">
type TFU_Args = Get_ARGS<"ticket", "findUnique">
type PPFM_Args = Get_ARGS<"pair", "findMany">
type PPFU_Args = Get_ARGS<"pair", "findUnique">

type db_Args = | EFM_Args | EFU_Args | PFM_Args | PFU_Args | PPFM_Args | PPFU_Args | TFM_Args | TFU_Args

//*_______________________________________________________________ */



export async function useGetDatabase(args: db_Args) {
    const { category, operation, payload } = args;






}
export async function getEvents(args?: Prisma.EventFindUniqueArgs) {
    if (!args) {
        const e = await prisma.event.findMany({ select: default_event_select })
        return e
    }


    const e = await prisma.event.findUnique({ ...args, select: default_event_select, })
    return e
}



export async function dbData(args: db_Args) {


    switch (args.category) {
        case "event": {
            const { operation, payload, category } = args;

            const tsx = operation === 'findMany' ? await prisma[category].findMany(payload) : await prisma[category].findUnique(payload)
            return tsx
        }
        case "player": {
            const { operation, payload, category } = args;

            const tsx =
                operation === 'findMany' ? await prisma[category].findMany(payload) : await prisma[category].findUnique(payload)
            return tsx
        }
        case "ticket": {
            const { operation, payload, category } = args;

            const tsx =
                operation === 'findMany' ? await prisma[category].findMany(payload) : await prisma[category].findUnique(payload)
            return tsx
        }
        case "pair": {
            const { operation, payload, category } = args;

            const tsx =
                operation === 'findMany' ? await prisma[category].findMany(payload) : await prisma[category].findUnique(payload)
            return tsx
        }
    }
}

