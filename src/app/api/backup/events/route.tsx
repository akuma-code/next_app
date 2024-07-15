import { syncPairs } from "@/Services/events/eventActions";
import { getAllData } from "@/Services/utils";
import { NextResponse } from "next/server";
import { URL } from "url";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const search = url.searchParams;

    const data = await getAllData();

    return NextResponse.json(data);
}
