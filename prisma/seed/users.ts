import bcrypt from 'bcrypt'
import { User, UserRole } from "@prisma/client";
import { P_UserCreateArgs } from '@/Types';



export const members_seed: P_UserCreateArgs[] = [
    {
        email: "nodachi@bk.ru",
        password: 'aa',
        role: UserRole.ADMIN,
        name: "Pavel Rodnyansky",
        image: "",
        emailVerified: null
    },
    {
        email: 'aa@aa.ru',
        password: 'aa',
        role: UserRole.MEMBER,
        name: "First"
    },
    {
        email: 'bb@bb.ru',
        password: 'bb',
        role: UserRole.MEMBER,
        name: "second"
    },
    {
        email: 'cc@cc.ru',
        password: 'cc',
        role: UserRole.MEMBER,
        name: "third"
    },
]
