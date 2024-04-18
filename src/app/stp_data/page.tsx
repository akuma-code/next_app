
import { _isArr, _toJSON } from "@/Helpers/helpersFns";
import { StpData } from "@/Types/StpInterfaces";
import stp_list from "@/dataStore/stp_list";
import { Box } from "@mui/material";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { GetStaticProps } from "next";
import { getQueryClient } from "../providers";
import { useEffect, useState } from "react";

async function StpDataListPage() {
    const q = await getData()
    // const f = q.fetchQuery({ queryKey: ['fetch_stp_data'], queryFn: () => getData() })
    return (
        <Box>
            <ol>
                success:
                NO DATA
            </ol>
        </Box>
    );
}

export default StpDataListPage;

async function getData() {
    const res = await fetch('http://localhost:3000/api/stp_data')

    if (!res.ok) {
        throw new Error("Fetch data error")
    }

    return res.json()
}

// async function getQueryData() {
//     const query_client =  getQueryClient()
//     await query_client.ensureQueryData({
//         queryKey: ['fetch_stp_data'],
//         queryFn: () => fetch('http://localhost:3000/api/stp_data'),
//         gcTime: 1000 * 10
//     })


//     return query_client
// }