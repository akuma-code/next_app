'use server'

import prisma from "@/client/client"
import { _log } from "@/Helpers/helpersFns"

export async function getMasters() {
    const masters = await prisma.master.findMany()
    return masters
}
async function checkName(name: string) {
    const m = await prisma.master.findFirst({ where: { name } })
    if (m) {
        _log(`Master ${name} already exist`)
        return false
    } else return true

}
export async function createMaster({ name }: { name: string }) {
    if (await checkName(name)) {

        const new_master = await prisma.master.create({
            data: { name }
        })
        _log({ new_master })
        return new_master
    } else {
        return null
    }

}

export async function removeMaster(master_id?: number) {
    if (master_id) {

        const m = await prisma.master.delete({ where: { id: master_id } })
        return m
    } else {
        const m = await prisma.master.deleteMany()
        return m
    }


}