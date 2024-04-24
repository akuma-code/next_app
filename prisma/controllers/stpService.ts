import { StpNumProp, StpParam } from "@prisma/client";
import prisma from "../client/client";
import { _log } from "@/Helpers/helpersFns";
import { StpData } from "@/Types/StpInterfaces";
import { PrismaClient } from "@prisma/client/extension";
import { parseStpName } from "@/Models/Stp/FormulaParser";
import { STP } from "@/Models/Stp/STP";
import { extractStpDBItem } from "./DTOController";


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

export class StpControl {

    static async create(name: string, numProps?: CreateNumericProps) {
        const stps = await prisma.stp.findMany()
        const existing_names = stps.map(n => n.name)
        if (existing_names.includes(name)) {
            console.warn(name, " already exist")
            throw new Error("Name already exist")
        }
        const new_stp = new STP(name)
        const { cams, depth } = new_stp
        const secure = new_stp.secure === 'нет' ? "none" : new_stp.secure
        try {
            const stp = await prisma.stp.create({
                data: {
                    name: name,
                    // StpNumProp: numProps
                    //     ? { create: { ...numProps } }
                    //     : undefined,
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

            console.error("___ /\ ___ error on Creation", e)
            throw new Error("Error on Creation: ")
        }

    }


    static async addStpData(stp_data: StpData) {
        try {
            const data = extractStpDBItem(stp_data)
            const db = await prisma.stp.create({
                data: {
                    ...data,
                    name: stp_data.name,
                    StpNumProp: {
                        create: { ...data.StpNumProp }
                    },
                    StpParam: {
                        create: {
                            ...data.StpParam
                        }
                    }
                }
            })
            _log("added: ", data)
            return await data
        } catch (error) {
            console.error("___  ___ error while clone", error)
            throw new Error("Error on Creation: ")
        }

    }

    static async addStpArray(stps: StpData[]) {
        try {
            const ss = stps.map(extractStpDBItem).map(s => s.stp)
            const numprops = stps.map(extractStpDBItem).map(s => s.StpNumProp)
            const db = await prisma.stp.createMany(
                {
                    data: ss,
                    skipDuplicates: true
                })

            _log("added: ", ss)
            return db
        } catch (error) {
            console.error("___  ___ error while clone", error)
            throw new Error("Error on Creation: ")
        }
    }
}

