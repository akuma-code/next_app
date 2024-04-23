import { StpData } from "@/Types/StpInterfaces";
import { createStpFromStpData } from "../../../../prisma/controllers/stpService";
import { NextRequest } from "next/server";
import { _log } from "@/Helpers/helpersFns";
import prisma from "../../../../prisma/client/client";

export async function createStpDbItem(item: StpData) {
    const stp = await createStpFromStpData(item)
    return Response.json({ stp })

}

export async function POST(request: Request) {
    const formData = await request.formData()
    const name = formData.get('name')
    const props = formData.get('props')
    return Response.json({ name, props })
}

export async function GET(request: NextRequest) {
    const db = await prisma.user.findFirst()

    _log("db: ", db)
    return Response.json(db)
}