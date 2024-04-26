import { NextRequest } from "next/server"

function parseSearch(req: NextRequest) {

    const url = new URL(req.url)
    const search = Object.fromEntries(url.searchParams.entries())
    return search
}

export default parseSearch