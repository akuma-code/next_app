'use client'

import { _log } from "@/Helpers/helpersFns"
import { Box, Typography } from "@mui/material"
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
    if (error) return <Box>{ error }</Box>
    if (!data) return <Box>No data Fetched</Box>
    console.table(data && data[0])
    console.table(data && data[1])
    const [players, events] = data
    return (
        <Box>
            { players.map(p =>
                <PlayerRow player={ p } key={ p.name } />
            ) }

        </Box>
    )
}

const PlayerRow = ({ player }: { player: { id: number, name: string } }) => {
    const { id, name } = player;

    return (
        <Typography>

            id:{ id }. { name }
        </Typography>)

}
const EventRow = (event: { id: number, title?: string, date_formated: string, players: { id: number, name: string }[] }) => {
    const { id, date_formated, players, title } = event;


    return (
        <Typography>
            id:{ id }, дата:{ date_formated }, кол-во игроков: { players.length }

        </Typography>)

}

const fetcher = (resource: string, init?: RequestInit | undefined) => fetch(resource, init).then(res => res.json())