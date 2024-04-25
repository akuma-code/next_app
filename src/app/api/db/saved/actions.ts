'use server'
import { StpData } from "@/Types/StpInterfaces";
import prisma from "../../../../../prisma/client/client";
import { StpControl } from "../../../../../prisma/controllers/stpService";
import { DTO_numProps, extractStpDBItem } from "../../../../../prisma/controllers/DTOController";
import { getDataList } from "@/dataStore/stp_list";
import { stp_json, stpBackup_128 } from "@/dataStore/fetched_data";

export async function stpCreate(prevState: any, formData: FormData) {
    const data = Object.fromEntries(formData)
    console.log("data:  ", data)
    return data
}

export async function stpNumPropsCreate(prevState: any, formData: FormData) {
    const fd = Object.fromEntries(formData) as { cursor?: number }
    const index = formData.has('cursor') ? fd.cursor! : 0
    return await DTO_numProps.createFromFetched(stpBackup_128[index])
}