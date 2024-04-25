import { StpData } from "@/Types/StpInterfaces";
import { NextRequest } from "next/server";
import { _log } from "@/Helpers/helpersFns";
import prisma from "../../../../../prisma/client/client";
import { StpControl } from "../../../../../prisma/controllers/stpService";
import { redirect } from "next/navigation";



export async function POST(request: Request) {
    const fd = await request.formData()
    const d = fd.get('stp')
    if (!d) return

    const stp = await StpControl.addStpData(d as unknown as StpData)
    return Response.json(stp)
}

export async function GET(request: NextRequest) {
    const db = await prisma.stp.findMany()

    _log("db: ", db)
    return Response.json(db)
}