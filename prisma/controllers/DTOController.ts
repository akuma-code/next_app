import { StpData } from "@/Types/StpInterfaces";
import { Stp } from "@prisma/client";

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
    const StpNumProp = { Lt, Lr, Er, Ea, Det, Ra, Ro, Rw, S, Sf, weight, stpName: name }
    const secure = sec !== 'нет' ? sec : 'none' as const
    const StpParam = { cams, depth, tags, secure }
    return {
        stp,
        StpNumProp,
        StpParam
    }
}