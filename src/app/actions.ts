'use server'

import { StpData } from "@/Types/StpInterfaces";
import { StpControl, createStpFromStpData } from "../../prisma/controllers/stpService";
import { STP } from "@/Models/Stp/STP";
import { Stp, StpNumProp } from "@prisma/client";

export async function createDbItem(item: StpData) {
    return await createStpFromStpData(item)
}
export async function createAction(prev: any, formData: FormData) {
    const fd = Object.fromEntries(formData)
    const { name, ...rest } = fd
    if (typeof name !== 'string') throw new Error("Name type must be string")
    // if (!validateNumProps(rest)) throw new Error("Numeric props type error", rest)
    // const stp = new STP(name)
    console.log('formdata: ', fd)
    const stp = await StpControl.create(name)
    return stp
}

function validateNumProps(item: any): item is StpNumProp {
    const numPropFields = [
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

    return numPropFields.every(f => f in item)
}