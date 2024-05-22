import { _log } from "@/Helpers/helpersFns";
import parseSearch from "@/Helpers/parseSearch";
import { StpData } from "@/Types/StpInterfaces";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client/client";
import { StpControl } from "../../../../../prisma/controllers/stpService";



export async function POST(request: Request) {
    const fd = await request.formData()
    const d = fd.get('stp')
    if (!d) return

    const stp = await StpControl.addStpData(d as unknown as StpData)
    return Response.json(stp)
}

export async function GET(request: NextRequest) {

    const s = parseSearch(request)
    _log(s)

    const db = await prisma.stp.findMany({
        include: {
            StpNumProp: true,
            StpParam: true
        }
    })

    _log("db: ", db.length)
    const res = NextResponse.json(db)
    return res
}

