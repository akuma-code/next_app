import { StpData } from "@/Types/StpInterfaces";

import stp_list, { getDataList } from "@/dataStore/stp_list";

export async function GET(req: Request): Promise<Response> {


    const data = await getDataList()
    const res = Response.json(data)
    return res
}