import { getDataList } from "@/dataStore/stp_list"
import { NextRequest } from "next/server"
import { StpControl } from "../../../../../prisma/controllers/stpService"

export async function PATCH(request: NextRequest) {
    const { url, formData, nextUrl } = request
    console.log("### PATCH", url, nextUrl)

    const [db] = await getDataList()
    const res = db
    // .map(i => StpControl.updateDb(i.id))
    return Response.json(res)
}