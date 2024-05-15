'use client'

import { createEvent } from "@/Services/eventService"

export function useEvents() {
    async function create(date: string, players: { id: number }[]) {
        const event = await createEvent({ event_date: date, ids: players })
        return event
    }

    return { create }
}