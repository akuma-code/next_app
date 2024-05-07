import { _log } from "@/Helpers/helpersFns";
import { createPlayer, getPlayers } from "@/Services/playerService";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const data = await getPlayers()
    if (data.length === 0) return Response.json("Players not found")
    return Response.json(data)
}

export async function POST(req: NextRequest) {

    const fd = await req.formData()

    const name = fd.get('name') as string
    try {
        const player = await createPlayer(name)
        return Response.json(player)
    } catch (e) {
        _log("Route__POst Error: ", e)
        return Response.error()
    }
}