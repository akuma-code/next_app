import { updatePairs } from "../../events/actions";

export async function GET() {
    await updatePairs()
    return Response.json("Update complete")
}