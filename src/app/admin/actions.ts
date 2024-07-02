/* eslint-disable import/no-anonymous-default-export */
'use server'

import { _log } from "@/Helpers/helpersFns"
import { masters_to_seed, players_to_seed2 } from "@/seed/players"
import { seedMasters, seedObjectPlayers } from "@/seed/seed"
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

export async function reseedPlayers(force = false) {
    // const force = JSON.parse(process.env.DB_SEED_FORCE ?? "false") as boolean;
    await seedObjectPlayers(players_to_seed2, { force });
}