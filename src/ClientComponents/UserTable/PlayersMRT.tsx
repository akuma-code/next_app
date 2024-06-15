'use client'
import { _isArr } from '@/Helpers/helpersFns';
import { EVResponse, PLResponse } from '@/Services/utils';
import { Player } from '@prisma/client';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import {
    MRT_ActionMenuItem,
    MRT_EditActionButtons,
    MaterialReactTable,
    useMaterialReactTable,
    // createRow,
    type MRT_ColumnDef,
    type MRT_Row,
    type MRT_TableOptions,
} from 'material-react-table';
import { MRT_Localization_RU } from 'material-react-table/locales/ru';
import { Suspense, useMemo } from 'react';


const player_columns: MRT_ColumnDef<{ id: number, name: string, info?: { rttf_score?: number } }>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'name',
        header: 'NAME',
    },
    // {
    //     accessorKey: 'info',
    //     header: 'INFO',
    // },

]
export type EVR = Pick<EVResponse, 'date_formated' | 'id' | 'title' | 'pairs' | 'players'>
export type PLR = Pick<PLResponse, 'name' | 'id'>
const events_columns: MRT_ColumnDef<EVR>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'date_formated',
        header: 'Date'
    },
    {
        accessorKey: 'title',
        header: 'Title'
    },
    // {
    //     accessorKey: 'pairs',
    //     header: 'Pairs'
    // },
    // {
    //     accessorKey: 'players',
    //     header: 'Players'
    // }

]


export function PlayersTable({ players }: { players: PLR[] }) {
    const table = useMaterialReactTable({
        columns: player_columns,
        data: players
    })
    return (
        <MaterialReactTable table={ table } />
    )
}
export function EventsTable({ events }: { events: EVR[] }) {
    const table = useMaterialReactTable({
        columns: events_columns,
        data: events
    })
    return (
        <MaterialReactTable table={ table } />
    )
}

export function BackupTable({ restore }: { restore: 'players' | "events", data: PLR[] | EVR[] }) {
    const s = restore
    const q = useQuery({
        queryKey: [`/api/backup?data=${s}`, s]
    })





    return (
        <Suspense fallback={ <div>Loading data for table</div> }>
            { s === 'players' ?

                q.isSuccess && PlayersTable({ players: q.data as PLR[] })
                : s === 'events' ?
                    q.isSuccess && EventsTable({ events: q.data as EVR[] })
                    : null
            }
        </Suspense>
    )
}