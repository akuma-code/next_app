import { syncPairs } from "@/Services/events/eventActions";
import { getAllData } from "@/Services/utils";
import { NextResponse } from "next/server";
import { URL } from "url";
import { getImportantData } from "./actions";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const search = url.searchParams;

    const data = await getImportantData();

    return NextResponse.json(data);
}
