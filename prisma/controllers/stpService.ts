import { type StpProp } from "@prisma/client";
import prisma from "../client/client";
import { _log } from "@/Helpers/helpersFns";
import { StpData } from "@/Types/StpInterfaces";
import { PrismaClient } from "@prisma/client/extension";


export type StpCreateParams = {
    name: string
    props?: Omit<StpProp, 'id' | 'stpName'>
}

export async function createStp(name: string, props?: StpCreateParams['props']) {

    try {
        if (props) {

            const stp = await prisma.stp.create({
                data: {
                    name: name,
                    StpProps: { create: { ...props } }
                },

            })
            return stp
        } else {
            const stp = await prisma.stp.create({
                data: {
                    name: name,
                },

            })
            return stp
        }

    } catch (e) {
        _log(e)
        throw new Error("Create stp error")
    }
}

export async function createStpFromStpData(stp: StpData) {
    const [name, props] = _toDb(stp)
    const stp_db = await createStp(name, props)
    _log(stp_db)
    return stp_db

}
export const _toDb = <T extends StpData>(item: T) => {
    let { name, id, tags, secure, cams, depth, ...props } = item
    props = { ...props, stpName: name }
    return [name, props] as const
}

const stp1: StpCreateParams = {

    name: "4TopN-16TGIAr-4FHgr",
    props: {


        "Ra": 97,
        "Det": 27,
        "Ea": 52,
        "Er": 21,
        "Lr": 15,
        "Lt": 37,
        "Ro": 0.9,
        "Rw": 30,
        "S": 1.09,
        "Sf": 34,
        "weight": 20,

    }

}

class StpControl<T> {
    db: PrismaClient
    constructor(prisma_client: T) {
        this.db = prisma_client
    }
    static async create(name: string, props?: Required<StpCreateParams['props']>) {
        const stp = await prisma.stp.create({
            data: {
                name: name
            }
        })

        if (props) {
            const { Det, ...rest } = props
            const numprops = await prisma.stpProp.create({
                data: { ...rest, Det, stpName: stp.name }
            })
            await prisma.stp.update({ data: { StpProps: { update: { data: numprops } } }, where: { id: stp.id } })

        }

        return stp
    }
}

const sc = new StpControl(prisma)