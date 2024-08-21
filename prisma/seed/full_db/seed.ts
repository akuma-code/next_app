import { PrismaClient, Prisma } from "@prisma/client";
import { data, ServerDataResponse, server_data } from "./data";
import { readFile } from "../../../src/Services/fs/data_service";
import { clear_main_data, seed_main_data, update_main_data } from "./fns";
import { seedFromJson } from "../json/seedJson";
import { cloneEvents, clonePairs, clonePlayers } from "./clone_db";
const prisma = new PrismaClient()

async function restore_database() {
    console.log("\nSEED STARTED!")
    // const pls = await clonePlayers()

    // await clear_main_data()


    // await cloneEvents()

    // await clonePairs()

    // const { events, pairs, players, } = await readFile<ServerDataResponse>("./data/server_data.json")
    // await seedFromJson(server_data)
    // await seed_main_data(data)
    //     .then(update_main_data)


}

restore_database()
    .then(async (r) => {
        await prisma.$disconnect();
        console.log("SEED Success")
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    })