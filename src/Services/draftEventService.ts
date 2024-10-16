'use server'

import prisma from "@/client/client"
import { Member } from "@prisma/client"
type MemberFront = Omit<Member, 'instanceUuid'>

const db = prisma.draftEvent

export async function getDrafts() {
    const drafts = await db.findMany({ include: { members: true } })

    return { drafts }
}

export async function createInstance(payload: { members: MemberFront[] }) {
    const { members } = payload
    try {
        const arr = members.map(m => prisma.member.create({ data: m }))
        const ms = await prisma.$transaction(arr)


        return { ms }
    } catch (error) {
        console.log(error)
        throw new Error("\n_______Create Instance Error!______")
    }
}
