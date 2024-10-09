'use client'

import { connectOnePlayer, getEventById } from "@/Services/eventService";
import { ticketCountMinus } from "@/Services/tickets/ticketActions";
import { useMutation } from "@tanstack/react-query";

export function useConnectPlayer(eventId: number) {
    // console.log({ eventId });
    return useMutation({
        mutationFn: (player: Player) => connectPlayerHandler(player, eventId),
        gcTime: 5000,

    });
}

interface Player {
    name: string;
    id: number;
    ticket: {
        uuid: string;
        amount: number;
        eAt: string;
        event_dates: string[];
        playerId: number;
    } | null;
}

async function connectPlayerHandler(
    player: Player,
    eventId: number
) {
    if (player.ticket) {
        const e = await getEventById(eventId.toString());
        if (!e) return;
        const { cost } = e;
        if (cost) {
            await connectOnePlayer(eventId, player.id);
            await ticketCountMinus(
                { uuid: player.ticket.uuid },
                { amount: cost, event_date: e.date_formated }
            );
        }
    } else {
        await connectOnePlayer(eventId, player.id);
    }
}