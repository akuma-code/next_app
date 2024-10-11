import { verifySession } from "@/auth/verifySession";
import { getUser } from "@/Services/userService";
import { NextResponse } from "next/server";

export async function GET() {
    const { isAuth, user } = await verifySession()
    if (!user) return new Response("Authentication failed", { status: 401 })
    // const db_user = await getUser({ id: userId })




    return NextResponse.json(user, {
        headers: {
            [`Content-Type`]: "application/json",
            my_header: "akuma",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
    });
}