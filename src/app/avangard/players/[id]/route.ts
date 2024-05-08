import { Player } from "@prisma/client";
import { NextRequest } from "next/server";
import prisma from "../../../../../prisma/client/client";
import { editPlayer, getOnePlayer } from "@/Services/playerService";
import { _log } from "@/Helpers/helpersFns";

export async function POST(req: NextRequest, data?: { params: { id: string } }) {
    try {
        const fd = await req.formData()

        if (!data) return Response.json("No ID!")

        const id = data.params.id

        const new_data = Object.fromEntries(fd) as Partial<Player>
        const update = await editPlayer(id, new_data)
        return Response.json(update)
    } catch (error) {
        _log("____Update error \n", error)
    }


}

export async function GET(req: NextRequest, urlParams: { params: { id: string } }) {

    const id = urlParams.params.id
    try {

        const player = await getOnePlayer(+id)
        return Response.json({ player })
    } catch (error) {
        _log(error)
        return Response.error()
    }


}