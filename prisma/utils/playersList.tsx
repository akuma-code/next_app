import db from "@/client/client";
import { reduceArrayToObject } from "@/Helpers/reduceToObject";
import { cache } from "react";

const allP = cache(async () => {
    try {
        const p = await db.player.findMany({
            select: {
                id: true,
                name: true,
            },
            orderBy: [
                {
                    events: {
                        _count: "desc",
                    },
                },
                { id: "asc" },
            ],
        });
        return p;
    } catch (error) {
        console.log(error);
        throw new Error("Error");
    }
});

export async function playersRecord() {
    const players = await allP();
    return reduceArrayToObject(players);
}

export default allP;
