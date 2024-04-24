import { STP } from "@/Models/Stp/STP";
import prisma from "../../../../../prisma/client/client";
import { StpControl } from "../../../../../prisma/controllers/stpService";
import { StpData } from "@/Types/StpInterfaces";

export async function createFromStpData(req: Request) {
    const fd = await req.formData()
    const d = Object.fromEntries(fd) as unknown as StpData

    const stp = StpControl.addStpData(d)
}