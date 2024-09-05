"use server";
import { Info, Player, Prisma } from "@prisma/client";

import { _log } from "@/Helpers/helpersFns";

import { parseNames } from "@/dataStore/avangardPlayers";
import { revalidatePath } from "next/cache";
import prisma from "@/client/client";

const ASC = "asc" as const;
const DESC = "desc" as const;
const orderByEvents = [{ events: { _count: DESC }, id: ASC }];
type DeletePayload = {
  id: number;
};

type InfoCreatePayload = {
  rttf_score?: number;
};

export type PlayerWithInfo = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  info: {
    uuid: string;
    rttf_score: number | null;

    playerId: number;
  } | null;
};
export async function createPlayer(name: string, info?: InfoCreatePayload) {
  try {
    const player = await prisma.player.create({
      data: {
        name,
      }

    });
    // if (info) {
    //   const { rttf_score } = info;

    //   const addInfo = await prisma.player.update({
    //     where: { id: player.id },
    //     data: {
    //       info: {
    //         create: {
    //           rttf_score,
    //         },
    //       },
    //     },
    //   });

    //   return addInfo;
    // }

    return player;

    // return await prisma.player.create({ data: { name } })
  } catch (error) {
    _log("___Create error: \n", error);
    throw error
  } finally {
    revalidatePath("/");
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
      revalidatePath("/");
      return d;
    } catch (error) {
      _log("___Delete error: \n", error);
      throw new Error("delete error");
    }
  }
}

export async function editPlayer(
  PlayerId: string,
  data: Partial<Player & Info>
) {
  const { name, rttf_score } = data;
  const score = rttf_score ? +rttf_score : null;
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
          name,
          info: {
            upsert: {
              create: { rttf_score: score },
              update: { rttf_score: score },
            },
          },
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
type P_PlayerIncludes = Partial<
  Record<keyof Prisma.$PlayerPayload["objects"], boolean>
>;

export async function getPlayers(includes?: Prisma.PlayerInclude) {
  let defaultInclude = {
    events: true,
    info: false,
    profile: false,
    ticket: true
  } satisfies Prisma.PlayerInclude;


  try {
    const p = await prisma.player.findMany({
      include: {
        ...defaultInclude,
        ticket: true,
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
export async function getPlayerEvents(id: number, config = { take: 10 }) {
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
          take: -config.take,

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

export async function getEventsByPlayerId({ playerId }: { playerId: number }) {
  const player_events = await prisma.player
    .findUnique({
      where: { id: playerId },
    })
    .events();

  const filtered = await prisma.event.groupBy({
    by: ["date_formated"],
    having: { date_formated: {} },
  });
}
