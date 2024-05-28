'use client'

import { _log } from "@/Helpers/helpersFns"
import { Box } from "@mui/material"
import { NextApiResponse } from "next"
import useSWR from "swr"

interface BackupApiResponse {
    tsx: string
    json: string
}

type ApiPlayersResponse = {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    info: {
        uuid: string;
        rttf_score: number | null;
        playerId: number;
    } | null;
}[]

type ApiEventsResponse = {
    id: number;
    date_formated: string;
    title: string | null;
    createdAt: Date;
    updatedAt: Date;
    players?: ApiPlayersResponse
}[]
export const CommonBackup = () => {
    const { data, error, isLoading } = useSWR<[ApiPlayersResponse, ApiEventsResponse]>('/api/backup', fetcher)
    const json = (item: object) => JSON.stringify(item, null, 2)
    if (isLoading) return <Box>Loading data...</Box>
    console.table(data && data[0])
    console.table(data && data[1])
    return (
        <Box>
            { data?.map((i, idx) => (
                <Box key={ idx }>

                    { i.map((item, index) =>

                        <Box key={ '_' + index } component={ 'p' }>
                            { json(item) }
                        </Box>
                    ) }
                </Box>
            )

            ) }
        </Box>
    )
}

const fetcher = (resource: string, init?: RequestInit | undefined) => fetch(resource, init).then(res => res.json())