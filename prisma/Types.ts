import { getOneUserByEmail } from "@/Services/userService";
import { Prisma } from "@prisma/client";
import { DefaultArgs, InternalArgs, ModelArgs, ResultArgs } from "@prisma/client/runtime/library";
import db_data from "@/dataStore/allData/all_data.json"
import backup_last from './../public/json/data.json'

export type P_UserSelect = Prisma.UserSelectScalar
export type P_UserFindArgs = Prisma.UserWhereUniqueInput
export type P_UserCreateArgs = Prisma.UserUncheckedCreateWithoutSessionsInput
export const UserFieldsEnum = Prisma.UserScalarFieldEnum

export const _UserSelect: Record<'all' | "no_pass", P_UserSelect> = {
    all: {
        email: true,
        name: true,
        id: true,
        role: true,
        image: true,
        password: true,

    },
    no_pass: {
        email: true,
        name: true,
        id: true,
        role: true,
        image: true,

    },

}

export const _ProfileSelect: Record<keyof Prisma.ProfileUncheckedCreateInput, boolean> = {
    id: true,
    name: true,
    playerId: true,
    userId: true,

}
export type PrismaPlayer = {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    profileId: number | null;
    events?:
    | {
        id: number;
        date_formated: string;
        //   isDraft: boolean | null;
        //   title: string | null;
    }[]
    | [];
    info?: { uuid: string; rttf_score: number | null; playerId: number } | null;
    profile: {
        id: number;
        name: string | null;
        playerId: number | null;
        userId: number;
    } | null;
    _count: {
        events: number;
    };
};

export const default_event_select: Prisma.EventSelect<DefaultArgs> = {
    date_formated: true,
    id: true,
    pairs: true,
    players: true,
    title: true,
    eventInfo: false
}
export type UserPersonalData = Prisma.PromiseReturnType<typeof getOneUserByEmail>

export type P_ProfileCreateArgs = Prisma.ProfileCreateInput
export type P_UserAndProfile = Prisma.$UserPayload['scalars'] & { profile?: Prisma.$ProfilePayload['scalars'] | null }

export type P_EventFields = Prisma.EventScalarFieldEnum
export type P_DB = Record<P_EventFields, Prisma.$EventPayload<InternalArgs>>


export type DB_JSON_DATA = typeof backup_last;