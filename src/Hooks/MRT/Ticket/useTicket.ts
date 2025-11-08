'use client'

import { _dbDateParser, _formated_date } from "@/Helpers/dateFuncs"
import { createTicketForPlayer, getPlayersWithTickets } from "@/Services/tickets/ticketActions"
import { createTicket, deleteTicket, updateTicket } from "@/Services/tickets/ticketService"
import { Prisma } from "@prisma/client"
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query"
import dayjs from "dayjs"
export type Prisma_PlayerWithTicket = Prisma.PlayerGetPayload<{
    select: {
        id: true,
        name: true,
        ticket: true,
        events: { select: { date_formated: true } },
    }
}>

export type DTO_PwT = {
    id: number
    name: string
    deposit: number
    rest: number
    price: number
    countFrom: string
    events_count: number
    status: 'open' | 'closed'
}
function findEventsAfterDate(date: string, players: Prisma_PlayerWithTicket[]) {
    const find_date = _dbDateParser(date)._dayjs
    const filtered = players.map(p => ({ ...p, events: p.events.filter((e) => _dbDateParser(e.date_formated)._dayjs.isAfter(find_date)) }))
    return filtered
}

function selectPlayerEvents(player: Prisma_PlayerWithTicket) {
    const t = player.ticket
    if (!t) throw new Error("No ticket!")
    const find_date = t.countFromDate
    const new_events = player.events.filter(e => _dbDateParser(e.date_formated)._dayjs.isAfter(find_date))

    return { ...player, events: new_events, count: new_events.length }
}

function makePayload(player: DTO_PwT, data: { amount: number, date?: string }) {
    const cfd = data.date || _formated_date(dayjs())


    switch (player.status) {
        case "open": return { amount: player.deposit + data.amount }
        case "closed": return { amount: data.amount, countFromDate: cfd }
    }
}
function makeDTO_Player(player: Prisma_PlayerWithTicket) {
    const { events, id, name, ticket } = player
    if (!ticket) throw new Error(`${name} has no ticket!`)
    const cfd = ticket?.countFromDate
    const new_events = player.events.filter(e => _dbDateParser(e.date_formated)._dayjs.isAfter(cfd))
    const event_count = new_events.length
    const total_paid = event_count * ticket.price
    const rest = ticket.amount - total_paid
    const dto: DTO_PwT = {
        id,
        name,
        countFrom: cfd,
        deposit: ticket.amount,
        price: ticket.price,
        rest,
        events_count: event_count,
        status: rest > ticket.price ? 'open' : 'closed'

    }
    return dto
}
export function useGetPlayersWithTickets() {

    const q = useQuery({
        queryKey: ["ticket"],
        queryFn: async () => await getPlayersWithTickets(),
        select(data) {
            return data.map(makeDTO_Player)
        },
        refetchOnWindowFocus: true,
        staleTime: 1000,
        gcTime: 1000

    })

    return q
}

export function useTicketActions() {
    const q = useQuery({
        queryKey: ["ticket"],
        queryFn: async () => await getPlayersWithTickets(),
        staleTime: 60 * 1000,
        gcTime: 1000
    })
    const { mutate } = useEditTicket()

    const openTicket = async (id: number, amount: number, price: number, date?: string) => {
        const cfd = date || _formated_date(dayjs())

        const new_ticket = await createTicket({ data: { amount, playerId: id, countFromDate: cfd, price } })
        return new_ticket
    }
    function verifyPlayerTicket(player: Prisma_PlayerWithTicket) {
        const dto = makeDTO_Player(player)
        const { status } = dto;
        return status

    }

    async function extendTicketForPlayer(player: Prisma_PlayerWithTicket, amount: number, date?: string) {
        if (!player.ticket) throw new Error(`No tiket at ${player.name}`)
        const cfd = date || _formated_date(dayjs())
        const status = verifyPlayerTicket(player)
        const { rest, id } = makeDTO_Player(player)
        const extend_data = {
            amount: rest + amount,
            countFromDate: cfd
        }
        return mutate({ player_id: id, payload: extend_data })

        //         if (status === 'open') {
        // //! если активен, то общая сумма = остаток + внесенное, дата начала - на дату или на сегодня

        //             return mutate({ player_id: player.id, payload: { amount: player.ticket?.amount + amount } })

        //         } else {
        //             return mutate({ player_id: player.id, payload: { amount, countFromDate: cfd } })

        //         }

    }

    async function removeTicket(player: Prisma_PlayerWithTicket) {
        const del = await deleteTicket({ where: { playerId: player.id } })
        console.log("deleted ticket from player ", player.name)
    }

    async function editTicket(player: Prisma_PlayerWithTicket, new_data: { amount?: number, price?: number, date?: string }) {
        if (!player.ticket) throw new Error(`No tiket at ${player.name}`)
        const { amount, date, price } = new_data;

        const edit = await updateTicket({ where: { playerId: player.id }, data: { amount, price, countFromDate: date } })
        return edit
    }

    return { openTicket, extendTicketForPlayer, removeTicket, players_with_tickets: q.data || [], editTicket }
}


export function useOpenTicket() {
    return useMutation({
        mutationKey: ['ticket', 'open'],
        mutationFn: (payload: { id: number, amount: number, price: number, date?: string }) => createTicket({
            data: {
                playerId: payload.id,
                amount: payload.amount,
                price: payload.price,
                countFromDate: payload.date || _formated_date(dayjs())
            }
        }),
        gcTime: 10 * 1000

    })
}

export function useEditTicket() {

    return useMutation({
        mutationKey: ['ticket', 'edit'],
        mutationFn: ({ payload, player_id }: { player_id: number, payload: Prisma.TicketUpdateInput }) => updateTicket({
            where: {
                playerId: +player_id
            },
            data: payload
        }),

    })
}
export function useExtendTicket() {

    function makePayload(player: DTO_PwT, data: { amount: number, date?: string }) {
        const cfd = data.date || _formated_date(dayjs())


        switch (player.status) {
            case "open": return { amount: player.deposit + data.amount }
            case "closed": return { amount: data.amount, countFromDate: cfd }
        }
    }



    const { mutateAsync } = useEditTicket()
    // const payload = makePayload(player, data)
    // return mutateAsync({})
    // async function extend(payload: { player: DTO_PwT, payload: { amount: number, date?: string } }) {

    //     const { status } = payload.player
    //     if (status === 'open') {

    //         const new_ticket = await updateTicket({
    //             where: { playerId: payload.player.id }, data: {
    //                 amount: payload.player.deposit + payload.payload.amount
    //             }
    //         })
    //         return new_ticket
    //     } else {
    //         const cfd = payload.payload.date || _formated_date(dayjs())

    //         const new_ticket = await updateTicket({
    //             where: { playerId: payload.player.id }, data: {
    //                 amount: payload.payload.amount, countFromDate: cfd
    //             }
    //         })
    //         return new_ticket
    //     }
    // }
    // return useMutation({
    //     mutationKey: ['ticket', 'extend'],
    //     mutationFn: (payload: { player: DTO_PwT, payload: { amount: number, date?: string } }) => extend(payload),


    // })
}