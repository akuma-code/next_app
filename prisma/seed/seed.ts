import { PrismaClient } from "@prisma/client";
import { events_to_seed } from "./events";
import { masters_to_seed, players_to_seed2 } from "./players";
import { members_seed } from "./users";

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
type SeedOptions = {
  force?: boolean
}
const prisma = new PrismaClient();

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

async function seedUsers(options?: SeedOptions) {
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

export async function seed_db(options?: SeedOptions) {
  if (!seed_enabled) {
    console.log("Seed is turned off")
    return null
  }

  const players_seed = seedObjectPlayers(players_to_seed2, options).finally(
    console.info
  );
  const masters_seed = seedMasters(masters_to_seed, options).finally(console.table);
  const events_seed = seedEvents(events_to_seed, options).finally(console.table);
  const user_seed = seedUsers(options).finally(console.table);
  return Promise.all([players_seed, masters_seed, events_seed, user_seed]).then(
    () => console.log("Database seeded succesful"),
    (e) => console.log("SEED ERROR!", e)
  );
}
const seed_enabled = process.env.DB_SEED_ENABLE
const options = { force: JSON.parse(seed_enabled ?? 'false') }





seed_db(options)
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
// : console.log("Seed is turned off", { enable: seed_enabled })
