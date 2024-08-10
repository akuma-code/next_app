import { NextResponse } from "next/server";
import { URL } from "url";
import { getImportantData } from "./actions";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const search = url.searchParams;
    const save = process.env.DB_SAVE_TO_HDD === "1";
    const data = await getImportantData({ saveToDisk: save });

    return NextResponse.json(data, {
        headers: { [`Content-Type`]: "application/json", my_header: "akuma" },
    });
}
