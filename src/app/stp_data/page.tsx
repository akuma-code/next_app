
import { _isArr, _log, _toJSON } from "@/Helpers/helpersFns";
import { StpData } from "@/Types/StpInterfaces";
import stp_list from "@/dataStore/stp_list";
import { Box } from "@mui/material";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { GetStaticProps } from "next";
import { getQueryClient } from "../providers";
import { Suspense, useEffect, useState } from "react";


async function StpDataListPage({ params }: { params?: { limit?: number } }) {


    const response = await getData(10)
    const data = response[0]

    return (
        <Box>
            <ul>



                { data &&
                    data.map(s =>

                        <li key={ s.id } className="list-decimal list-inside">
                            { s.name }
                        </li>

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