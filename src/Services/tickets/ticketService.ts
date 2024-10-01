'use server'


import prisma from "@/client/client";
import { Prisma } from "@prisma/client";
import { DefaultArgs, InternalArgs } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";

export type ATicketSelector = {
    all: Prisma.TicketSelect<DefaultArgs>
    main: Prisma.TicketSelectScalar

}
export type ATicket = Prisma.TicketGetPayload<{
    select: {
        uuid: true,
        amount: true,
        limit: true,
        playerId: true,
        event_dates: true,
        player: { select: { id: true, name: true } },
        eAt: true
    }
}>

export async function getTickets<T extends Prisma.TicketFindManyArgs>(args: T) {
    try {
        const t = await prisma.ticket.findMany(args)
        return t
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function getOneTicket<T extends InternalArgs = DefaultArgs>(args: Prisma.TicketFindUniqueArgs<T>) {

    try {
        const { where, select } = args as { where: Prisma.TicketFindUniqueArgs['where'], select: Prisma.TicketSelect };

        const t = await prisma.ticket.findUnique({ where, select })
        return t
    } catch (error) {
        throw error
    }
}

export async function createTicket(args: Prisma.TicketCreateArgs) {
    try {
        const t = await prisma.ticket.create(args)
        console.log("🚀 ~ created Ticket :", t)
        return t
    } catch (error) {
        throw error
    } finally {
        revalidatePath("/")
    }
}
export async function deleteTicket(args: Prisma.TicketDeleteArgs) {
    try {
        const t = await prisma.ticket.delete(args)

        console.log("🚀 ~ deleted Ticket :", t)
        return t
    } catch (error) {
        throw error
    } finally {
        revalidatePath("/")
    }


}


