import { type StpProp } from "@prisma/client";
import prisma from "../client/client";
import { _log } from "@/Helpers/helpersFns";


export type StpCreateParams = {
    name: string
    props?: Omit<StpProp, 'id' | 'stpName'>
}

export async function createStp(name: string, props?: StpCreateParams['props']) {

    try {
        if (props) {

            const stp = await prisma.stp.create({
                data: {
                    name: name,
                    StpProps: { create: { ...props } }
                },

            })
            return stp
        } else {
            const stp = await prisma.stp.create({
                data: {
                    name: name,
                },

            })
            return stp
        }

    } catch (e) {
        _log(e)
        throw new Error("Create stp error")
    }
}

const stp1: StpCreateParams = {

    name: "4TopN-16TGIAr-4FHgr",
    props: {


        "Ra": 97,
        "Det": 27,
        "Ea": 52,
        "Er": 21,
        "Lr": 15,
        "Lt": 37,
        "Ro": 0.9,
        "Rw": 30,
        "S": 1.09,
        "Sf": 34,
        "weight": 20,

    }

}