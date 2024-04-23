'use server'

import { StpData } from "@/Types/StpInterfaces";
import { createStpFromStpData } from "../../prisma/controllers/stpService";

export async function createDbItem(item: StpData) {
    return await createStpFromStpData(item)
}