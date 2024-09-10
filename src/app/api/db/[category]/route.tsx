import prisma from "@/client/client";
import { NextResponse } from "next/server";

type Categories = "event" | "player" | "ticket" | "pair";

export async function GET(
    request: Request,
    context: { params: { category: string } }
) {
    const { category } = context.params;
    const cats = ["event", "player", "ticket", "pair"] satisfies Categories[];
    if (!cats.includes(category as Categories))
        return console.error("invalid category", category);

    const db_tsx = [
        prisma.player.findMany({
            select: {
                id: true,
                name: true,
                events: { select: { id: true, date_formated: true } },
                ticket: true,
            },
        }),
        prisma.ticket.findMany(),
        prisma.event.findMany({
            select: {
                id: true,
                cost: true,
                date_formated: true,
                pairs: {
                    select: { eventId: true, playerId: true, masterId: true },
                },
                players: true,
                title: true,
                // _count: { select: { players: true } },
            },
        }),
        prisma.pair.findMany({
            select: { eventId: true, playerId: true, masterId: true },
        }),
    ];

    const db_data = await prisma.$transaction(db_tsx);
    const data = {
        player: db_data[0],
        ticket: db_data[1],
        event: db_data[2],
        pair: db_data[3],
    };

    const result = data[category as Categories];
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
