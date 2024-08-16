import { PrismaClient } from "@prisma/client";
import { backup_players_last, masters_to_seed } from "./players";
import { EventsMapObject } from "./seedFn";
import { members_seed } from "./users";
import { pairs } from "./pairs";


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
  clear?: boolean
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
async function getMasters() {
  const masters = await prisma.master.findMany()
  return masters
}
async function checkName(name: string) {
  const m = await prisma.master.findFirst({ where: { name } })
  if (m) {
    console.log(`Master ${name} already exist`)
    return false
  } else return true

}
async function removeMaster(master_id?: number) {
  if (master_id) {

    const m = await prisma.master.delete({ where: { id: master_id } })
    return m
  } else {
    const m = await prisma.master.deleteMany()
    return m
  }


}
export async function reseedMasters(options?: SeedOptions) {
  const force = options?.force
  const existedmasters = await getMasters()
  console.log("🚀 ~ reseedMasters ~ existedmasters:", existedmasters)
  if (existedmasters.length > 0) {
    if (force) {
      await removeMaster()


    } else return existedmasters
  }
  try {
    const m = await seedMasters(masters_to_seed)
    return m
  } catch (error) {
    console.log(error)
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
async function syncPairs() {
  try {
    const pairs = await prisma.pair.findMany()
    const tsx_pairs = pairs.map(p => prisma.pair.update({
      where: { id: p.id },
      data: {
        player: { connect: { id: p.secondPlayerId } },
        master: { connect: { id: p.firstPlayerId } }
      }
    }))
    const tsx = await prisma.$transaction(tsx_pairs)
    // console.log({ tsx })
    return tsx
  } catch (error) {
    console.log(error)
  }
}
export async function seedEventsMap(eventsMap: EventsMapObject[], options = { abortSygnal: false, clear: false }) {
  // const connect_player = (player_id: number, event_id: number) => prisma.player.update({ where: { id: player_id }, data: { events: { connect: { id: event_id } } } })
  if (options.abortSygnal) {
    console.log("Seed aborted!")
    return null
  }
  try {
    if (options.clear === true) {
      await prisma.event.deleteMany()
      await prisma.player.deleteMany()
      await seedObjectPlayers(backup_players_last, { force: true })
      // await seedPairs()
    }
    // const [_pairs] = pairs.map(p => p.pairs)
    // const __p = _pairs.map(pp => prisma.pair.create({ data: { firstPlayerId: pp.firstPlayerId, secondPlayerId: pp.secondPlayerId, eventId: pp.eventId } }))
    // console.log(eventsMap.map(e => e.pairs))

    // console.log({ ppp })
    const ev_array = eventsMap.map(e => {

      const p = prisma.event.create({
        data: {
          date_formated: e.date_formated,
          title: e.title,
          // pairs: {connectOrCreate:{create:__p}},
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


    // const connected = eventsMap.map(e => ({ ...e, date: e.date_formated, players: e.players, pairs: e.pairs }))
    const res2 = await prisma.$transaction([...ev_array,])

    // const [pairs_seed] = pairs.map(p => p.pairs.map(pp => prisma.pair.create({ data: pp })))
    // await prisma.$transaction(pairs_seed)
    // const cc = eventsMap.map(c => prisma.event.update({
    //   where: { date_formated: c.date_formated },
    //   data: {
    //     players: {
    //       set: [...c.players]
    //     },
    //     pairs: {
    //       set: c.pairs.length > 0 ? [...c.pairs] : [],
    //     }
    //   },
    //   select: { id: true, date_formated: true, players: true, pairs: true }
    // }))
    // await prisma.$transaction([...ev_array,...cc])

    console.table(res2)
    return res2


  } catch (error) {
    console.error(error)
    throw error
  }
}



export async function seedMasters(masters = masters_to_seed, options?: SeedOptions) {
  const masters_ = [
    { name: "Алан Заикин" },
    { name: "Антон Козлов" },
    { name: "Надежда Отпетова" },
    { name: "Максим Ушкарев" },
  ]
  try {
    const seed = masters.map((m) => prisma.master.create({ data: m }));

    return await prisma.$transaction(seed);
  } catch (error) {
    console.log(error);
    throw new Error("_____Seed master error");
  }
}

export async function seedUsers(options?: SeedOptions) {
  const existed = await prisma.user.findMany()
  if (existed.length > 0) {
    if (options?.force === false) return existed
    else await prisma.user.deleteMany()
  }
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
