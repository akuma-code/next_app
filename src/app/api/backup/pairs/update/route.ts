import { updatePairs } from "../../events/actions";

export async function GET() {
    const updater = await updatePairs()
    return Response.json(updater)
}