import { PrismaClient } from "@prisma/client";
import { members_seed } from "./users";
import { EventsMapObject } from "./seedFn";
// import prisma from "@/client/client";
const prisma = new PrismaClient();
type SeedEvent = {
  id: number;
  date_formated: string;
  title: string;
  isDraft?: boolean;
  players: {
    id: number;
    name: string;
    // createdAt: string;
    // updatedAt: string;
  }[];
};
export type SeedOptions = {
  force?: boolean
}


export async function seedPlayers(seed_names: string[], options?: SeedOptions) {
  const existing = await prisma.player.findMany()
  if (existing.length > 0) {
    if (options?.force === false) {
      console.log("Players list not empty, players count: ", { existing: existing.length })

      return existing
    }
    else await prisma.player.deleteMany()
  }
  try {
    const seedArray = seed_names.map((s) =>
      prisma.player.create({
        data: { name: s },
        include: { info: true, events: true },
      })
    );
    return await prisma.$transaction(seedArray);
  } catch (error) {
    console.log("___\n", error);
    throw new Error("SEED ERROR");
  }
}
export async function seedObjectPlayers(
  seed_players: { id: number; name: string }[],
  options?: SeedOptions
) {
  const existing = await prisma.player.findMany()
  if (existing.length > 0 || !options?.force) {
    if (options?.force === false) {
      console.log("Players list not empty, players count: ", { existing: existing.length })

      return existing
    }
    else await prisma.player.deleteMany()
  }

  try {
    const seedArray = seed_players.map((s) =>
      prisma.player.create({
        data: {
          id: s.id,
          name: s.name,
        },
      })
    );
    return await prisma.$transaction(seedArray);
  } catch (error) {
    console.log("___\n", error);
    throw new Error("SEED PLAYERS ERROR");
  }
}
export async function seedEventsMap(eventsMap: EventsMapObject[], options = { abortSygnal: false, clear: false }) {
  // const connect_player = (player_id: number, event_id: number) => prisma.player.update({ where: { id: player_id }, data: { events: { connect: { id: event_id } } } })
  if (options.abortSygnal) {
    console.log("Seed aborted!")
    return null
  }
  if (options.clear === true) await prisma.event.deleteMany()
  const ev_array = eventsMap.map(e => {

    const p = prisma.event.create({
      data: {
        date_formated: e.date_formated,
        title: e.title,
        // players: { create: e.players }
      },
      select: {
        id: true,
        pairs: true,
        date_formated: true,
        players: { select: { id: true, name: true } },
      }
    })

    return p
  })
  const events = await prisma.$transaction(ev_array)
  const connected = eventsMap.map(e => ({ date: e.date_formated, players: e.players }))
  const result = events.map(async (e) => {
    const pls = eventsMap.find(ev => ev.date_formated === e.date_formated)?.players ?? []
    const up = await prisma.event.update({
      where: { id: e.id },
      data: {
        players: { connect: pls }
      }
    })
    console.table(pls)
    return up
  })

  const cc = connected.map(c => prisma.event.update({
    where: { date_formated: c.date }, data: {
      players: { connect: c.players }
    }
  }))
  const res2 = await prisma.$transaction(cc)
  console.table(res2)
  return res2


}
export async function seedEvents(seed_events: SeedEvent[], options?: SeedOptions) {
  const ev = prisma.event;

  try {
    // console.log(seed_events[0])
    const seed = seed_events.map((e) =>
      ev.create({
        data: {
          date_formated: e.date_formated,
          title: e.title,
          id: e.id,
          isDraft: e.isDraft || false,
        },
      })
    );

    return await prisma.$transaction(seed);
  } catch (error) {
    console.log("\n seed events error \n", error);
    throw new Error("Restore events error");
  }
}

export async function seedMasters(masters: { name: string }[], options?: SeedOptions) {
  try {
    const seed = masters.map((m) => prisma.master.create({ data: m }));

    return await prisma.$transaction(seed);
  } catch (error) {
    console.log(error);
    throw new Error("_____Seed master error");
  }
}

export async function seedUsers(options?: SeedOptions) {
  try {
    const users = members_seed.map((user) =>
      prisma.user.create({ data: user })
    );
    // const user = prisma.user.create({
    //     data: { email: admin.email, password: admin.password, role: UserRole.ADMIN, name: admin.name }
    // })
    return await prisma.$transaction(users);
  } catch (e) {
    console.log(e);
    throw new Error("Seed admin error");
  }
}


// : console.log("Seed is turned off", { enable: seed_enabled })
