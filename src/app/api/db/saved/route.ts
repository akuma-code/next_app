import { StpData } from "@/Types/StpInterfaces";
import { NextRequest } from "next/server";
import { _log } from "@/Helpers/helpersFns";
import prisma from "../../../../../prisma/client/client";
import { StpControl } from "../../../../../prisma/controllers/stpService";
import { URL } from "url";
import { getDataList } from "@/dataStore/stp_list";
import { DTO_numProps } from "../../../../../prisma/controllers/DTOController";
import { stpBackup_128 } from "@/dataStore/fetched_data";



export async function POST(request: Request) {
    const url = new URL(request.url)
    const l = url.searchParams.get('limit')
    const cursor = url.searchParams.get('cursor')
    const sname = url.searchParams.get('name')
    let db: StpData[]
    const [list, p, n] = await getDataList()
    if (sname) {
        const stp = list.find(s => s.name === sname)
        if (stp) {
            StpControl.addStpData(stp)
            StpControl.updateDb(stp.id)
        }
        return Response.json(stp)
    }
    list.map(d => StpControl.addStpData(d))
    if (l) {
        [db] = await getDataList(parseInt(l))
        // db.map(s => StpControl.addStpData(s))
        try {

            StpControl.addStpArray(db)
        } catch (error) {
            throw new Error("route error")
        }

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
export async function PATCH(request: NextRequest) {
    const [db] = await getDataList()
    const res = db.map(i => StpControl.updateDb(i.id))
    return Response.json(res)
}