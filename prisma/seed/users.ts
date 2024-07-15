import bcrypt from 'bcrypt'
import { User, UserRole } from "@prisma/client";
import { P_UserCreateArgs } from '@/Types';



export const members_seed: P_UserCreateArgs[] = [
    {
        email: "nodachi@bk.ru",
        password: 'aa',
        role: UserRole.ADMIN,
        name: "Павел Роднянский",


    },
    {
        "id": 16,
        "email": "otpetova@gmail.com",
        "name": "Надежда Отпетова",
        "role": "GUEST",
        password: '1234'
    },
    {
        "id": 4,
        "email": "pavelcat1@mail.ru",
        "name": "Павел",
        "role": "GUEST",
        password: '123'
    }
    // {
    //     email: 'aa@aa.ru',
    //     password: 'aa',
    //     role: UserRole.MEMBER,
    //     name: "First"
    // },
    // {
    //     email: 'bb@bb.ru',
    //     password: 'bb',
    //     role: UserRole.MEMBER,
    //     name: "second"
    // },
    // {
    //     email: 'cc@cc.ru',
    //     password: 'cc',
    //     role: UserRole.MEMBER,
    //     name: "third"
    // },
]
