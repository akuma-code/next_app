import bcrypt from 'bcrypt'
import { User, UserRole } from "@prisma/client";
function hashPass(password: string) {
    return bcrypt.hashSync(password, 5)
}
export const admin: Omit<User, 'id'> = {
    email: "akumapl86@gmail.com",
    password: hashPass("darks1de"),
    role: UserRole.ADMIN
}

