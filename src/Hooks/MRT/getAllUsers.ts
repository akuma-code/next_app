'use server';
import prisma from "../../../prisma/client/client";

export async function getAllUsers() {

    const users = await prisma.user.findMany();
    return users;
}
