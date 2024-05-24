import db from '@/client/client'
import { cache } from 'react'


const allP = cache(async () => {
    const p = await db.player.findMany({
        select: {
            id: true, name: true
        },
        orderBy: [
            {
                events: {
                    _count: 'desc'
                }
            },
            { id: 'asc' }
        ]
    })
    return p
})

export default allP