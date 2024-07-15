import { _log } from "@/Helpers/helpersFns";
import { getAllUsers } from "@/Services/userService";
import { getAllData, getEventsData, getPlayersData } from "@/Services/utils";
import prisma from "@/client/client";
import { NextResponse } from "next/server";

interface BackupRouteProps {
    searchParams: {
        data: string;
    };
}

export type BackupResponse = NextResponse<{
    tsx: [
        ({
            info: {
                uuid: string;
                rttf_score: number | null;
                playerId: number;
            } | null;
        } & { id: number; name: string; createdAt: Date; updatedAt: Date })[],
        ({
            players: {
                id: number;
                name: string;
                createdAt: Date;
                updatedAt: Date;
            }[];
        } & {
            id: number;
            date_formated: string;
            title: string | null;
            createdAt: Date;
            updatedAt: Date;
        })[]
    ];
}>;

type BackupTypeQuery = "all" | "users" | "players" | "events";
export async function GET(
    request: Request,
    context?: { searchParams: { data: string } }
) {
    const u = new URL(request.url);
    const query = (u.searchParams.get("data") as BackupTypeQuery) ?? "all";
    // _log({ request })
    try {
        const log = u.searchParams.get("log");
        const withLog = log === "on";
        if (query === "players") {
            const db_players = await getPlayersData({ log: withLog });
            // console.clear()
            console.log("___ ___ restore players");

            console.table(db_players);

            return NextResponse.json(db_players);
        }
        if (query === "events") {
            // console.clear()
            const db_events = await getEventsData({ log: withLog });
            console.table("___ ___ restore events");
            console.table(db_events);
            return NextResponse.json(db_events);
        }
        if (query === "users") {
            const db_users = await getAllUsers({
                select: ["id", "email", "name", "role"],
            });
            console.table(db_users);
            return NextResponse.json(db_users);
        }
        // _log({ u })
        // const p = prisma.player.findMany({ include: { info: true } })
        // const e = prisma.event.findMany({ include: { players: true, eventInfo: true } })
        // const tsx = await prisma.$transaction([p, e])
        const alldata = await getAllData();
        console.log({ alldata });
        return NextResponse.json(alldata);
        // return new Response(null, {
        //     status: 200,
        //     headers: {
        //         "Access-Control-Allow-Origin": "*",
        //         "Access-Control-Allow-Methods":
        //             "GET, POST, PUT, DELETE, OPTIONS",
        //         "Access-Control-Allow-Headers": "Content-Type, Authorization",
        //     },
        // });
    } catch (error) {
        _log("____Get Backup error \n", error);
        throw new Error("Backup error");
    }
}

export async function POST(
    request: Request,
    context?: { params: { data: string } }
) {
    const db_players = prisma.player;
    const db_event = prisma.event;

    try {
    } catch (error) {
        _log("____Restore error \n", error);
        throw new Error("Restore error");
    }
}
