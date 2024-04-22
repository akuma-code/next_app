import { _log } from "@/Helpers/helpersFns";

import { getDataList } from "@/dataStore/stp_list";
import { revalidatePath } from "next/cache";

export async function GET(req: Request): Promise<Response> {

    const _url = new URL(req.url)
    const limit = _url.searchParams.get('limit')
    const cursor = _url.searchParams.get('cursor')


    _log("limit: ", limit)
    _log("cursor: ", cursor)
    try {
        if (limit) {

            const data = await getDataList(parseFloat(limit))
            // 
            return Response.json(data)
        }
        else {

            const data = await getDataList()
            const res = Response.json(data)
            return res

        }
    } catch (error) {
        console.log("Fetch error!")
        throw new Error("fetch error")
    } finally {
        revalidatePath(_url.href)
    }


}