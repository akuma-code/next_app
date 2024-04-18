import { StpData } from "@/Types/StpInterfaces";

import stp_list, { } from "@/dataStore/stp_list";

export async function GET(req: Request): Promise<Response> {
    const list = stp_list.slice()
    const res = new Response()
    const fd = new FormData()
    fd.set('datalist', JSON.stringify(list))
    console.log(Object.fromEntries(fd))
    return Response.json(fd)
}