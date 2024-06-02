'use server'

import prisma from "@/client/client"
import { Member } from "@prisma/client"
type MemberFront = Omit<Member, 'instanceUuid'>

const db = prisma.draftEvent
const inst = prisma.draftEventInstance
export async function getDrafts() {
    const drafts = await db.findMany({ include: { members: true } })
    const instances = await inst.findMany({ include: { members: true } })
    return { drafts, instances }
}

export async function createInstance(payload: { members: MemberFront[] }) {
    const { members } = payload
    try {
        const arr = members.map(m => prisma.member.create({ data: m }))
        const ms = await prisma.$transaction(arr)

        const i = await inst.create({ data: { members: { connect: ms } } })
        return { i, ms }
    } catch (error) {
        console.log(error)
        throw new Error("\n_______Create Instance Error!______")
    }
}
