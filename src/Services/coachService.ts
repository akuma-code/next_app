'use server'

import db from "@/client/client"

export async function createCoach(payload: { first_name: string, second_name?: string | null }) {
    const { first_name, second_name } = payload;

    try {
        const c = await db.coach.create({
            data: {
                first_name, second_name
            },
            select: { first_name: true, second_name: true }
        })
        return c
    } catch (error) {
        throw new Error("Create coach error!")
    }
}

export async function getAllCoaches() {
    const coaches = await db.coach.findMany()
    return coaches
}