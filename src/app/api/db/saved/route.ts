import { StpData } from "@/Types/StpInterfaces";
import { NextRequest } from "next/server";
import { _log } from "@/Helpers/helpersFns";
import prisma from "../../../../../prisma/client/client";
import { StpControl } from "../../../../../prisma/controllers/stpService";
import { URL } from "url";
import { getDataList } from "@/dataStore/stp_list";



export async function POST(request: Request) {
    const url = new URL(request.url)
    const l = url.searchParams.get('limit')
    let db: StpData[]
    if (l) {
        [db] = await getDataList(parseInt(l))
        // db.map(s => StpControl.addStpData(s))
        StpControl.addStpArray(db)
        return Response.json(db)

    } else {
        [db] = await getDataList()
        // db.map(s => StpControl.addStpData(s))
        StpControl.addStpArray(db)
        return Response.json(db)
    }
}

export async function GET(request: NextRequest) {
    const url = new URL(request.url)
    const l = url.searchParams.get('limit')
    if (l) {
        const [data, prev, next] = await getDataList(parseInt(l))
        return Response.json(data)

    }
    const [db] = await getDataList()

    _log("db: ", db.length)
    return Response.json(db)
}