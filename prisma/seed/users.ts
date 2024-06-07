import { User, UserRole } from "@prisma/client";

export const admin: Omit<User, 'id'> = {
    email: "akumapl86@gmail.com",
    password: "darks1de",
    role: UserRole.ADMIN
}

