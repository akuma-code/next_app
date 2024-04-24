import { StpData } from "@/Types/StpInterfaces";
import { NextRequest } from "next/server";
import { _log } from "@/Helpers/helpersFns";
import prisma from "../../../../../prisma/client/client";
import { StpControl } from "../../../../../prisma/controllers/stpService";



export async function POST(request: Request) {
    const formData = await request.formData()
    const d = Object.fromEntries(formData) as unknown as { stp: StpData }
    _log(d)
    const stp = await StpControl.addStpData(d.stp)
    return Response.json(stp)
}

export async function GET(request: NextRequest) {
    const db = await prisma.stp.findMany()

    _log("db: ", db)
    return Response.json(db)
}