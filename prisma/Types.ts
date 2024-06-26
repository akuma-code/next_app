import { getOneUserByEmail } from "@/Services/userService";
import { Prisma } from "@prisma/client";

export type P_UserSelect = Prisma.UserSelectScalar
export type P_UserFindArgs = Prisma.UserWhereUniqueInput
export type P_UserCreateArgs = Prisma.UserCreateInput
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
    userId: true
}

export type UserPersonalData = Prisma.PromiseReturnType<typeof getOneUserByEmail>

export type P_ProfileCreateArgs = Prisma.ProfileCreateInput
export type P_UserAndProfile = Prisma.$UserPayload['scalars'] & { profile?: Prisma.$ProfilePayload['scalars'] | null }