import { _log } from "@/Helpers/helpersFns"
import { getAllUsers } from "@/Services/userService"
import { getEventsData, getPlayersData } from "@/Services/utils"
import prisma from "@/client/client"
import { NextResponse } from "next/server"

interface BackupRouteProps {
    searchParams: {
        data: string
    }
}

export type BackupResponse = NextResponse<{
    tsx: [
        ({ info: { uuid: string; rttf_score: number | null; playerId: number } | null }
            & { id: number; name: string; createdAt: Date; updatedAt: Date })[],
        ({ players: { id: number; name: string; createdAt: Date; updatedAt: Date }[] }
            & { id: number; date_formated: string; title: string | null; createdAt: Date; updatedAt: Date })[]]
}>
export async function GET(request: Request, context?: { searchParams: { data: string } }) {
    const u = new URL(request.url)
    const query = u.searchParams.get('data')
    // _log({ request })
    try {
        const withLog = u.searchParams.get('log') === 'on'
        const db_events = await getEventsData({ log: true })
        const db_players = await getPlayersData({ log: true })
        const db_users = await getAllUsers()
        if (query === 'players') {
            // console.clear()
            console.info("___ ___ restore players")
            return NextResponse.json(db_players)
        }
        if (query === 'events') {
            // console.clear()
            console.info("___ ___ restore events")
            return NextResponse.json(db_events)
        }
        if (query === 'users') {
            // console.clear()
            console.info("___ ___ restore users")
            return NextResponse.json(db_users)
        }
        // _log({ u })
        // const p = prisma.player.findMany({ include: { info: true } })
        // const e = prisma.event.findMany({ include: { players: true, eventInfo: true } })
        // const tsx = await prisma.$transaction([p, e])

        return NextResponse.json({ db_users, db_events, db_players })
    } catch (error) {
        _log("____Get Backup error \n", error)
        throw new Error("Backup error")
    }


}

export async function POST(request: Request, context?: { params: { data: string } }) {
    const db_players = prisma.player
    const db_event = prisma.event

    try {
    } catch (error) {
        _log("____Restore error \n", error)
        throw new Error("Restore error")
    }

}