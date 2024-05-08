import { _log } from "@/Helpers/helpersFns";
import { createPlayer, getPlayers } from "@/Services/playerService";
import { NextRequest } from "next/server";
import prisma from "../../../../prisma/client/client";

export async function GET(req: NextRequest) {

    const q = req.nextUrl.searchParams.get('info')
    if (q) {
        // const i = await prisma.playerInfo.findMany()
        const i = await getPlayers("info")
        return Response.json(i)
    }

    const data = await getPlayers()
    if (data.length === 0) return Response.json("Players not found")



    return Response.json(data)
}

export async function POST(req: NextRequest) {

    try {




        const fd = await req.formData()
        const _e = Object.fromEntries(fd)
        _log("info: \n", _e)
        const name = fd.get('name') as string
        const n = _e?.name as string
        const s = _e?.rttf_score as unknown as number
        if (!n) return Response.error()
        const player = await createPlayer(n, { rttf_score: s })
        return Response.json(player)
    } catch (e) {
        _log("Route__POst Error: \n", e)
        return Response.error()
    }
}