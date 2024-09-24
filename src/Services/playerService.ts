"use server";
import { Prisma } from "@prisma/client";

import { _log } from "@/Helpers/helpersFns";

import prisma from "@/client/client";
import { parseNames } from "@/dataStore/avangardPlayers";
import { revalidatePath } from "next/cache";
import { PrismaPlayer_ } from "@/Types";

type DeletePayload = {
  id: number;
};


export type PlayerWithTicket = Prisma.PlayerGetPayload<{ select: { id: true, name: true, ticket: true, createdAt: true } }>
export async function createPlayer(name: string) {
  try {
    const p = await prisma.player.create({ data: { name }, select: { id: true, name: true } })
    return p

    // return await prisma.player.create({ data: { name } })
  } catch (error) {
    _log("___Create error: \n", error);
    throw error
  } finally {
    revalidatePath("/");
  }
}

export async function CreateNewPlayer(payload: Prisma.PlayerCreateArgs) {
  const [lastPlayer] = await prisma.player.findMany({ take: -1, select: { id: true } })
  try {

    const p = await prisma.player.create(payload)
    return p
  } catch (error) {
    console.log(error)
    throw error
  } finally {
    revalidatePath("/")
  }
}
export async function EditPlayer(payload: Prisma.PlayerUpdateArgs) {
  try {


    const p = await prisma.player.update(payload)
    console.log(p)
    return p
  } catch (error) {
    console.log(error)
    throw error
  } finally {
    revalidatePath("/")
  }
}

export async function deletePlayer(payload: DeletePayload) {
  const { id } = payload;
  const p = await prisma.player.findFirst({ where: { id } });

  // _log(p)
  if (p) {
    try {
      const d = await prisma.player.delete({ where: { id } });
      _log("deleted: ", d);

      return d;
    } catch (error) {
      _log("___Delete error: \n", error);
      throw new Error("delete error");
    } finally {
      revalidatePath("/");
    }
  }
}

export async function editPlayer(
  PlayerId: string,
  data: Prisma.PlayerUpdateInput
) {
  const { name, } = data;
  // const score = rttf_score ? +rttf_score : null;
  try {
    const id = Number(PlayerId);
    const p = await prisma.player.findUnique({ where: { id } });
    if (p) {
      // const name = data?.name
      if (!name) return;
      revalidatePath("/");
      const pp = await prisma.player.update({
        where: { id },
        data: {
          ...data
          // name,
          // info: {
          //   upsert: {
          //     create: { rttf_score: score },
          //     update: { rttf_score: score },
          //   },
          // },
        },
        // include: { PlayerInfo: true }
      });
      return pp;
    }
  } catch (e) {
    _log(`___Edit player error: \n ${e} \n_____`);
  } finally {
    revalidatePath("/");
  }
}
export async function GET_PLAYERS(params: Prisma.PlayerFindManyArgs, config?: Pick<Prisma.PlayerFindManyArgs, 'skip' | "take" | "select">) {
  const args = { ...params, ...config }
  const p: PrismaPlayer_[] = await prisma.player.findMany({
    ...args,
    orderBy: { events: { _count: 'desc' } },
    select: config?.select ? { ...config.select } : {
      id: true,
      name: true,
      pair: true,
      ticket: true,
      profile: true,
      events: true,
      createdAt: true,
      updatedAt: true,
      _count: { select: { events: true } },
    } as Prisma.PlayerSelect
  })
  console.log("players: ", p?.length)
  return p
}
export async function getPlayers() {
  let defaultInclude = {
    events: true,
    info: false,
    profile: false,
    ticket: true
  } satisfies Prisma.PlayerInclude;


  try {
    const p = await prisma.player.findMany({
      // include: {

      //   ticket: true,
      //   _count: { select: { events: true } },
      // },
      select: {
        id: true,
        name: true,
        pair: true,
        ticket: true,
        profile: true,
        events: true,
        createdAt: true,
        updatedAt: true,
        _count: { select: { events: true } },
      },
      orderBy: [
        {
          events: {
            _count: "desc",
          },
        },
        { id: "asc" },
      ],
      // distinct: "name",
    });
    return p;
  } catch (error) {
    _log("___Find error: \n", error);
    throw new Error("findmany error");
  } finally {
    revalidatePath("/");
  }
}

export async function getOnePlayer(id: number) {
  try {
    const p = await prisma.player.findUnique({
      where: { id },
      select: {
        info: true,
        events: true,
        updatedAt: false,
        createdAt: true,
        profileId: true,
        name: true,
        id: true,
        ticket: true
      },
    });
    return p;
  } catch (error) {
    _log("___Find error: \n", error);
    throw new Error("findone error");
  }
}
export async function getPlayerEvents(id: number, config = { take: 100 }) {
  try {
    const db = prisma.player;
    const p = await db.findUniqueOrThrow({
      where: { id: id },
      select: {
        id: true,
        name: true,
        ticket: true,
        events: {
          select: {
            date_formated: true,
            id: true,

          },
          ...config,
          // take: -config.take,

        },
        _count: { select: { events: true } }
      },
    });
    return p;
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function seedPlayers() {
  const seed = parseNames.map((n) =>
    n.secondname ? { name: n.name + " " + n.secondname } : { name: n.name }
  );
  try {
    // const pls = prisma.player.createMany({ data: seed, })
    const seedArray = seed.map((s) =>
      prisma.player.create({
        data: s,
        include: { info: true, events: true },
      })
    );
    return await prisma.$transaction(seedArray);
  } catch (error) {
    _log("___\n", error);
    throw new Error("SEED ERROR");
  }
}

export async function getEventsByPlayerId() {

}
