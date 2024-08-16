import prisma from "@/client/client";
import { _log } from "@/Helpers/helpersFns";
import { syncPairs } from "@/Services/events/eventActions";
import { getAllUsers } from "@/Services/userService";
import { getAllData, getEventsData, getPlayersData } from "@/Services/utils";
import { create_eventValidator } from "@/utils/validators";
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
    await syncPairs();
    const u = new URL(request.url);
    const query = (u.searchParams.get("data") as BackupTypeQuery) ?? "all";
    // _log({ request })
    try {
        const t = await prisma.pair.groupBy({
            by: ["eventId"],
        });
        console.log(t);
        const log = u.searchParams.get("log");
        const withLog = log === "on";
        if (query === "players") {
            const db_players = await getPlayersData({ log: withLog });
            // console.clear()
            console.log("___ ___ restore players");

            console.table(db_players);

            return NextResponse.json(db_players, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods":
                        "GET, POST, PUT, DELETE, OPTIONS",
                    "Access-Control-Allow-Headers":
                        "Content-Type, Authorization",
                },
            });
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
            return NextResponse.json(db_users, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods":
                        "GET, POST, PUT, DELETE, OPTIONS",
                    "Access-Control-Allow-Headers":
                        "Content-Type, Authorization",
                },
            });
        }
        // _log({ u })
        // const p = prisma.player.findMany({ include: { info: true } })
        // const e = prisma.event.findMany({ include: { players: true, eventInfo: true } })
        // const tsx = await prisma.$transaction([p, e])
        const alldata = await getAllData();

        console.log(
            "validator_______\n",
            create_eventValidator(alldata.events[alldata.events.length - 1])
        );
        // console.log({ alldata });
        return NextResponse.json(
            { alldata },
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods":
                        "GET, POST, PUT, DELETE, OPTIONS",
                    "Access-Control-Allow-Headers":
                        "Content-Type, Authorization",
                },
            }
        );
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
