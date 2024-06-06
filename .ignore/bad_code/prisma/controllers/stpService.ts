import { StpNumProp, StpParam } from "@prisma/client";
import prisma from "../client/client";
import { _log } from "@/Helpers/helpersFns";
import { StpData } from "@/Types/StpInterfaces";
import { PrismaClient } from "@prisma/client/extension";
import { parseStpName } from "@/Models/Stp/FormulaParser";
import { STP } from "@/Models/Stp/STP";
import { extractStpDBItem } from "./DTOController";
import { stp_json } from "@/dataStore/fetched_data";


export type StpCreateParams = {
    name: string
    props?: Omit<StpNumProp, 'id' | 'stpName'>
}
export type CreateNumericProps = Omit<StpNumProp, 'id' | 'stpName'>
export async function createStp(name: string, props?: StpNumProp) {

    try {
        if (props) {

            const stp = await prisma.stp.create({
                data: {
                    name: name,
                    StpNumProp: { create: { ...props } }
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
    const stp_db = await createStp(name)
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

// const checkName = async (name_check: string) => await prisma.stp.findUniqueOrThrow({ where: { name: name_check } })
export class StpControl {

    static async create(name: string, numProps?: CreateNumericProps) {
        // const stps = await prisma.stp.findMany()
        // const existing_names = stps.map(n => n.name)
        const n = await prisma.stp.findUnique({ where: { name }, select: { id: true, name: true } })
        if (n) {
            console.log("Already has ", name)
            console.log("id: ", n.id)
            return
        }
        // if (await checkName(name)) {
        //    
        // } else console.log("new name: ", name)
        // if (existing_names.includes(name)) {
        //     console.warn(name, " already exist")
        //     throw new Error("Name already exist")
        // }
        try {
            const new_stp = new STP(name)
            const { cams, depth } = new_stp
            const secure = new_stp.secure === 'нет' ? "none" : new_stp.secure
            const stp = await prisma.stp.create({
                data: {
                    name: name,
                    StpNumProp: numProps
                        ? { create: { ...numProps } }
                        : undefined,
                    StpParam:
                    {
                        create: {
                            cams, depth, secure
                        }
                    },

                }
            })
            return stp
        } catch (e) {
            console.error("__Error while create", e)
            throw new Error("Error on Creation: ")
        }

    }


    static async addStpData(stp_data: StpData) {
        try {
            const { StpNumProp, StpParam, name } = extractStpDBItem(stp_data)
            const db = await prisma.stp.create({
                data: {

                    name: name,
                    StpNumProp: {
                        create: { ...StpNumProp }
                    },
                    StpParam: {
                        create: StpParam

                    }
                }
            })
            console.clear()
            _log("added: ", db)
            return db
        } catch (error) {
            console.error("___  ___ error while clone", error)
            throw new Error("Error on Creation: ")
        }

    }

    static async addStpArray(stps: StpData[]) {
        try {
            const data = stps.map(extractStpDBItem)
            const numprops = stps.map(extractStpDBItem).map(s => s.StpNumProp)
            const db = await prisma.stp.createMany(
                {
                    data,
                    skipDuplicates: true
                })
            console.clear()
            _log("added: ", data)
            return db
        } catch (error) {
            console.error("___  ___ error while clone", error)
            throw new Error("Error on Creation: ")
        }
    }

    static async updateDb(stp_id: number) {
        const item = await prisma.stp.findUnique({ where: { id: stp_id } })
        if (!item) return
        const numProps = await prisma.stpNumProp.findUnique({ where: { stpName: item.name } })
        const strProps = await prisma.stpParam.findUnique({ where: { stpName: item.name } })

        await prisma.stp.update({ where: { id: stp_id }, data: { stpNumPropId: numProps?.id, paramId: strProps?.id } })
    }


}

