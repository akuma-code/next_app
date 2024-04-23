
import { _isArr, _log, _toJSON } from "@/Helpers/helpersFns";
import { StpData } from "@/Types/StpInterfaces";
import stp_list from "@/dataStore/stp_list";
import { Box } from "@mui/material";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { GetStaticProps } from "next";
import { getQueryClient } from "../providers";
import { Suspense, useEffect, useState } from "react";
import { _toDb, createStpFromStpData } from "../../../prisma/controllers/stpService";
import { StpListItem } from "./StpListItem";
import { createDbItem } from "../actions";


async function StpDataListPage({ params }: { params?: { limit?: number } }) {

    const add = (stpitem: StpData) => {
        const [name, props] = _toDb(stpitem)
        const fd = new FormData()
        fd.set('name', name)
        fd.set('props', JSON.stringify(props))
        createStpFromStpData.bind(null, stpitem)
    }
    const response = await getData(10)
    const data = response[0]

    return (
        <Box>
            <ul>



                { data &&
                    data.map(s =>

                        <StpListItem key={ s.id } stp={ s } />

                    )
                }


            </ul>
        </Box>
    );
}

const fetcher = (url: string) => fetch(url).then(res => res.json())
export async function getData(limit = 2): Promise<[StpData[], number, number]> {

    try {
        const tu = `http://localhost:3000/api/stp_data?limit=${limit}`
        const res = await fetch(tu)
        if (!res.ok) {
            throw new Error("Fetch data error")
        }

        return res.json()
    } catch (error) {
        console.log(error)
        throw new Error("get data error!")
    }

}
export default StpDataListPage;

// async function getQueryData() {
//     const query_client =  getQueryClient()
//     await query_client.ensureQueryData({
//         queryKey: ['fetch_stp_data'],
//         queryFn: () => fetch('http://localhost:3000/api/stp_data'),
//         gcTime: 1000 * 10
//     })


//     return query_client
// }