import { STP } from "@/Models/Stp/STP";
import { StpData } from "@/Types/StpInterfaces";
import { FetchedData } from "@/dataStore/fetched_data";
import { Stp } from "@prisma/client";
import prisma from "../client/client";
import { _log } from "@/Helpers/helpersFns";

export const numPropFields = [
    'Ro',
    'Rw',
    'Lt',
    'Lr',
    'Ra',
    'De',
    'Er',
    'Ea',
    'Sf',
    'S',
    'weight',
] as const

export function extractStpDBItem(stp_data_item: StpData) {
    const { name, Lt, Lr, Er, Ea, Det, Ra, Ro, Rw, S, Sf, weight, cams, depth, tags, secure: sec } = stp_data_item
    const stp = { name }
    const StpNumProp = { Lt, Lr, Er, Ea, Det, Ra, Ro, Rw, S, Sf, weight, }
    const secure = sec !== 'нет' ? sec : 'none' as const
    const StpParam = { cams, depth, secure }
    return {
        name,
        StpNumProp,
        StpParam
    }
}

export class DTO_numProps {
    static async createFromFetched(fetched: FetchedData) {
        try {
            const [name, ...params] = fetched
            const stp = new STP(name)
            stp.initFetchedData(fetched)
            _log(stp)
            if (!stp.params) return
            const np = await prisma.stpNumProp.create({
                data: {
                    stpName: stp.name,
                    ...stp.params,
                }
            })
            return np
        } catch (e) {
            console.warn(e)
            throw new Error("NumProp error")
        }

    }

    static async bulkCreateFromFetched(fetched_array: FetchedData[]) {
        try {
            const bulkData = fetched_array.map((item) => DTO_numProps.createFromFetched(item))
            return Promise.allSettled(bulkData)
        } catch (error) {
            console.warn(error)
            throw new Error("NumProp error")
        }

    }
}