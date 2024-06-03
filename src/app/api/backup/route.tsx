import { _log } from "@/Helpers/helpersFns"
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
export async function GET(request: Request, context?: { params: { data: string } }) {
    try {
        const p = prisma.player.findMany({ include: { info: true } })
        const e = prisma.event.findMany({ include: { players: true, eventInfo: true } })
        const tsx = await prisma.$transaction([p, e])

        return NextResponse.json(tsx)
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