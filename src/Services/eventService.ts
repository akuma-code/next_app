"use server";

import { _formated_date } from "@/Helpers/dateFuncs";
import { _log } from "@/Helpers/helpersFns";
import { revalidatePath } from "next/cache";
import prisma from "@/client/client";
import { db_events } from "@/dataStore/backup_db";
import { getMasters } from "./masterService";
import { getPlayers } from "./playerService";

export interface EventCreatePayload {
    event_date: string;
    isDraft: boolean;
    ids: { id: number }[];
}

export interface DTO_NewEvent {
    id?: number;
    date_formated: string;
    title: string;
    isDraft: boolean;
    players: {
        id: number;
        name: string;
    }[];
}
export interface EventUpdatePayload {
    id: number;
    _new_data: {
        date_formated?: string;
        players: { id: number; name: string }[];
        title?: string | null;
        isDraft?: boolean;
    };
}
function validateDate(date_to_valid: string) {
    const regex = /\d{2}_\d{2}_\d{4}/gi;
    const isValid = regex.test(date_to_valid);
    _log("__date: ", date_to_valid, { isValid });
    return isValid;
}

export async function eventCreate(payload: DTO_NewEvent) {
    const { date_formated, players, title, isDraft = false } = payload;
    try {
        const e = await prisma.event.create({
            data: {
                isDraft,
                date_formated,
                title,
                players: { connect: players.map((p) => ({ id: p.id })) },
            },
            select: {
                id: true,
                date_formated: true,
                title: true,
                players: true,
                isDraft: true,
                eventInfo: true,
                pairs: true,
            },
        });
        return e;
    } catch (error) {
        console.log(" \n", error);
        throw new Error("Create event error:");
    } finally {
        revalidatePath("/");
    }
}

export async function makeNewEvent(payload: DTO_NewEvent) {
    const { date_formated, players, title, isDraft = false } = payload;
    const existEvent = await prisma.event.findUnique({
        where: { date_formated },
    });

    if (existEvent) {
        const { id } = existEvent;
        return await updateEventPlayers({
            id,
            _new_data: { players, date_formated, title, isDraft },
        });
    }

    const e = await eventCreate(payload);
    return e;
}

export async function seedEvents(mock?: typeof db_events) {
    const ev = prisma.event;
    const eventArray = mock ? mock : db_events.map((e) => ({ ...e }));
    try {
        const seed = eventArray.map((e) =>
            ev.create({
                data: {
                    date_formated: e.date_formated,
                    title: e.title,
                    id: e.id,
                    players: {
                        connect: e.players.map((p) => ({ id: p.id })),
                    },
                },
            })
        );
        return await prisma.$transaction(seed);
    } catch (error) {
        _log("\n seed events error", error);
        throw new Error("Restore events error");
    }
}

export async function createEvent(payload: EventCreatePayload) {
    const { event_date, ids } = payload;
    const date = validateDate(event_date)
        ? event_date
        : _formated_date(event_date);
    // if (!dayjs(event_date).isValid()) {
    //     _log(`${event_date} is wrong!`)
    //     throw new Error(`\n\nEvent date is invalid: ${event_date}`)
    // }

    const existEvent = await prisma.event.findUnique({
        where: { date_formated: date },
    });
    if (existEvent) {
        try {
            const ee = await connectPlayersToEvent(existEvent.id, ids);

            return ee;
        } catch (error) {
            console.log(" \n", error);
            throw new Error("___Update event error:");
        } finally {
            revalidatePath("/");
        }
    }
    try {
        const ev = await prisma.event.create({
            data: {
                isDraft: false,

                date_formated: date,
                players: {
                    connect: ids,
                },
            },
            select: {
                players: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                date_formated: true,
            },
        });

        _log("\nCreated event: ", ev);
        return ev;
    } catch (error) {
        console.log("___Create event error: \n", error);
        throw new Error("Error while create event");
    } finally {
        revalidatePath("/");
    }
}
export async function deleteEvent(id: number) {
    try {
        const ev = await prisma.event.delete({ where: { id } });
        _log("deleted event: ", { id });
        return ev;
    } catch (error) {
        console.log("___Delete event error: \n", error);
        throw new Error("Error while deleting event");
    } finally {
        revalidatePath("/");
    }
}
export async function disconnectPlayer(playerId: number, eventId: number) {
    try {

        const e = await prisma.event.update({
            where: { id: eventId },
            data: { players: { disconnect: { id: playerId } } },
        });
        console.log(e);
        return e
    } catch (error) {
        throw error
    } finally { revalidatePath("/") }
}
export async function updateEventPlayers(payload: EventUpdatePayload) {
    const { id, _new_data } = payload;

    const { title, players, date_formated, isDraft } = _new_data;
    const _players = players.map((p) => ({ id: p.id, name: p.name }));
    try {
        const ev = await prisma.event.update({
            where: { id },
            data: {
                isDraft,
                date_formated,
                title,
                players: {
                    set: [],
                    connect: _players,
                },
            },
        });
        _log("\n", { ev });
        return ev;
    } catch (error) {
        console.log(" \n", error);
        throw new Error("___Update event error:");
    } finally {
        revalidatePath("/");
    }
}

export async function getEventsUnique(date?: string) {
    if (!date) {
        _log({ date });
        return null;
    }

    try {
        const playersByDate = (date: string) =>
            prisma.event.findUnique({ where: { date_formated: date } }).players();
        return await playersByDate(date);
    } catch (error) {
        console.log(" \n", error);
        throw new Error("get event players error:");
    } finally {
        revalidatePath("/");
    }
}

async function getEventsWithPlayers() {
    const ev = await prisma.event.findMany({
        where: { players: {} },

        select: {
            date_formated: true,
            id: true,
            players: true,
            _count: { select: { players: true } },
        },
        orderBy: { date_formated: "asc" },
    });

    return ev;
}

export async function getEventsByMonth(
    month?: string,
    order: "asc" | "desc" = 'desc',
    year?: number
) {
    const y = year ? year : 2024;
    const e = prisma.event;
    const _order = order ? order : "desc";
    try {
        if (!month) {
            // if month omit return all avents with players
            const events = e.findMany({
                where: { isDraft: false },
                orderBy: { date_formated: _order },
                select: {
                    id: true,
                    date_formated: true,
                    title: true,
                    pairs: { select: { id: true, firstPlayerId: true, secondPlayerId: true } },
                    players: { select: { id: true, name: true, pair: true } },
                    _count: { select: { players: true } },
                },
            });
            return events;
        }
        const searchM = `${y}-${month}` as const;
        const result = await e.findMany({
            where: {
                AND: {
                    players: {},
                    isDraft: false,
                    date_formated: { startsWith: searchM },
                },
            },
            select: {
                id: true,
                date_formated: true,
                title: true,
                pairs: { select: { id: true, firstPlayerId: true, secondPlayerId: true } },
                players: { select: { id: true, name: true } },
                _count: { select: { players: true } },
            },
            orderBy: { date_formated: _order },
        });

        return result;
    } catch (error) {
        console.log(" \n", error);
        throw new Error("Error in function: getEventsByMonth");
    } finally {
        revalidatePath("/");
    }
}
export async function getEventsByMonthDto(
    month?: string,
    order: "asc" | "desc" = 'desc',
    year?: number) {
    const events = await getEventsByMonth(month, order, year)
    const masters = await getMasters()
    const players = await getPlayers()
    const master_name = (id: number) => masters.find(m => m.id === id)?.name ?? ""
    const player_name = (id: number) => players.find(p => p.id === id)?.name ?? ""
    return events.map(e => ({ ...e, pairs: e.pairs.map(p => ({ master: master_name(p.firstPlayerId), player: player_name(p.secondPlayerId) })) }))
}
export async function getEventById(eventId: string) {
    const id = Number(eventId);
    if (isNaN(id)) throw new Error(`Event Id Invalid: ${eventId}`);

    const e = prisma.event;
    try {
        const event = await e.findUnique({
            where: { id },
            select: {
                id: true,
                date_formated: true,
                title: true,
                players: true,
                _count: { select: { players: true } },
                isDraft: true,
                pairs: true,
            },
        });
        return event;
    } catch (error) {
        console.log(" \n", error);
        throw new Error("get eventId error:");
    }
}
export async function getOneEventByDate(date: string) {
    const e = prisma.event;
    try {
        const event = await e.findUnique({
            where: { date_formated: date },
            select: {
                id: true,
                date_formated: true,
                title: true,
                players: true,
                //  _count: { select: { players: true }                  }
            },
        });
        return event;
    } catch (error) {
        console.log(" \n", error);
        throw new Error("get event by date error:");
    }
}

export async function createBlankEvent(date: string, title?: string) {
    try {
        const _date = validateDate(date) ? date : _formated_date(date);
        const pev = await prisma.event.create({
            data: { date_formated: _date, title: title, players: {} },
            select: { id: true, date_formated: true },
        });
        _log("created event: \n", pev);
        return pev;
    } catch (error) {
        console.log(" \n", error);
        throw new Error("create blank_event error");
    }
}

export async function connectPlayersToEvent(
    id: number,
    players: { id: number }[]
) {
    try {
        const connect_event = await prisma.event.update({
            where: { id },
            data: {
                players: {
                    set: [],
                    connect: players,
                },
            },
            include: {
                players: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
        // _log("\ntsx: ", { connect_event })
        return connect_event;
    } catch (error) {
        console.log(" \n", error);
        throw new Error("CONNECT PLAYERS ERROR");
    } finally {
        revalidatePath("/");
    }
}

export async function connectOnePlayer(eventId: number, playerId: number) {
    try {
        const p = await prisma.player.update({
            where: { id: playerId },
            data: {
                events: {
                    connect: { id: eventId },
                },
            },
            select: {
                id: true,
                name: true,
            },
        });
        return p;
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        revalidatePath("/");
    }
}


// async function dateupdate(){
//     const reverse =(date:string)=>date.split("_").reverse().join("_")
//     const dates_arr = await prisma.event.findMany({select:{date_formated:true, id:true}})
// const dates = dates_arr.reduce((acc,{date_formated,id})=>({...acc, [date_formated]:id}),{} as Record<string,number>)
//     return await prisma.event.updateMany({
//         data:{date_formated:{set:}}
//     })
// }