'use server'
import db from '@/client/client'
import { cache } from 'react'


const eventsCache = cache(async () => {
    try {
        const events = await db.event.findMany({
            include: {
                players: true,
                pairs: true,
            },
        })
        const pairs = await db.pair.findMany({
            include: { event: true }
        })
        return { events, pairs }
    } catch (error) {
        console.log(error)
        throw new Error("Error")
    }

})

export default eventsCache