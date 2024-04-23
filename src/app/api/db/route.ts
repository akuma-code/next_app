import { StpData } from "@/Types/StpInterfaces";
import { createStpFromStpData } from "../../../../prisma/controllers/stpService";

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