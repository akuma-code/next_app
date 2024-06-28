/* eslint-disable import/no-anonymous-default-export */
'use server'

import { _log } from "@/Helpers/helpersFns"
import { masters_to_seed } from "@/seed/players"
import { seedMasters } from "@/seed/seed"
import { getMasters, removeMaster } from "@/Services/masterService"
export async function reseedMasters() {

    const existedmasters = await getMasters()
    console.log("🚀 ~ reseedMasters ~ existedmasters:", existedmasters)
    if (existedmasters.length > 0) await removeMaster()
    try {
        const m = await seedMasters(masters_to_seed)
        return m
    } catch (error) {
        _log(error)
    }
}

