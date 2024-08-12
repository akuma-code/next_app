import { PrismaClient } from "@prisma/client";
import { data } from "./data";
const db = new PrismaClient()

async function restore_database() {
    const test = data

}

restore_database()
    .then(async (r) => {
        // console.log("seed_result: \n", r)
        await db.$disconnect();
        console.log("Success")
    })
    .catch(async (e) => {
        console.error(e);
        await db.$disconnect();
        process.exit(1);
    })