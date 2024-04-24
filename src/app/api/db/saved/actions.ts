import { StpData } from "@/Types/StpInterfaces";
import prisma from "../../../../../prisma/client/client";
import { StpControl } from "../../../../../prisma/controllers/stpService";
import { extractStpDBItem } from "../../../../../prisma/controllers/DTOController";
import { getDataList } from "@/dataStore/stp_list";

export async function stpCreate(prevState: any, formData: FormData) {
    const data = Object.fromEntries(formData)
    console.log("data:  ", data)
    return data
}

export async function stpNumPropsCreate(prevState: any, formData: FormData) {
    const fd = await Object.fromEntries(formData)
    const stp_data = fd.stp_data as unknown as StpData
    const data = getDataList()
    await prisma.stpNumProp.createMany({ data: [] })
}