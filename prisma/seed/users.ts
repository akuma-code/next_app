import bcrypt from 'bcrypt'
import { User, UserRole } from "@prisma/client";
function hashPass(password: string) {
    return bcrypt.hashSync(password, 5)
}
export const admin: Omit<User, 'id'> = {
    email: "nodachi@bk.ru",
    password: hashPass("aa"),
    role: UserRole.ADMIN,
    name: "Pavel Rodnyansky",
    image: "",
    emailVerified: null
}

