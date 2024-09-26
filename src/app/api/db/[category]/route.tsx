import prisma from "@/client/client";
import { NextRequest, NextResponse } from "next/server";

export type Categorie = "event" | "player" | "ticket" | "pair";

export async function GET(
    request: NextRequest,
    context: {
        params: { category: string };
        searchParams: { take?: string; skip: string };
    }
) {
    const { category } = context.params;
    const take = request.nextUrl.searchParams.get("take");
    const order = request.nextUrl.searchParams.get("order");
    const cats = ["event", "player", "ticket", "pair"] satisfies Categorie[];

    if (!cats.includes(category as Categorie)) {
        console.error("invalid category", category);
        return NextResponse.json("Нет такой категории в базе данных", {
            status: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods":
                    "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
            },
        });
    }

    const taken = typeof take === "string" ? Number(take) : undefined;
    const id_order = order === "desc" ? order : "asc";
    // const skipped = skip ? { skip: +skip } : {};
    // const filtering = { ...taken, ...skipped };
    const tsx_players = prisma.player.findMany({
        select: {
            id: true,
            name: true,
            events: { select: { id: true, date_formated: true } },
            ticket: true,
            pair: true,
        },
        orderBy: { id: id_order },
        take: taken,
    });

    const tsx_tickets = prisma.ticket.findMany({
        take: taken,
        orderBy: { playerId: id_order },
    });

    const tsx_events = prisma.event.findMany({
        select: {
            id: true,
            cost: true,
            date_formated: true,
            pairs: {
                select: {
                    eventId: true,
                    playerId: true,
                    masterId: true,
                    id: true,
                },
            },
            players: {
                select: {
                    id: true,
                    events: { select: { date_formated: true, id: true } },
                    pair: true,
                    ticket: true,
                    name: true,
                },
            },
            title: true,
            // _count: { select: { players: true } },
        },
        take: taken,
        orderBy: { id: id_order },
        // orderBy: { id: "desc" },
    });

    const tsx_pairs = prisma.pair.findMany({
        select: { eventId: true, playerId: true, masterId: true, id: true },
        take: taken,
        orderBy: { id: id_order },
    });

    const db_tsx = [tsx_players, tsx_tickets, tsx_events, tsx_pairs];

    const db_data = await prisma.$transaction(db_tsx);
    const data = {
        player: db_data[0],
        ticket: db_data[1],
        event: db_data[2],
        pair: db_data[3],
    };

    const result = data[category as Categorie];
    // console.log({ taken, order });
    console.log(db_data.map((d, idx) => ({ [cats[idx]]: d.length })));
    return NextResponse.json(result, {
        status: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
    });
}

export async function POST(
    request: Request,
    context: { params: { category: string } }
) {}
