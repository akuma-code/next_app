'use client'
import { _isArr } from '@/Helpers/helpersFns';
import { EVResponse, PLResponse } from '@/Services/utils';
import { Player, UserRole } from '@prisma/client';
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
import { RowProfileCard } from '../MRT/Profile/UserProfileCard';
export type EVR = Pick<EVResponse, 'date_formated' | 'id' | 'title' | 'pairs' | 'players'>
export type PLR = Pick<PLResponse, 'name' | 'id'>






const player_columns: MRT_ColumnDef<PLR>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        grow: 0,
        maxSize: 150,
    },
    {
        accessorKey: 'name',
        header: 'NAME',
        grow: 1
    },


]
export function PlayersTable({ players }: { players: PLR[] }) {
    const table = useMaterialReactTable({
        columns: player_columns,
        data: players,
        muiTableContainerProps: {
            sx: { maxHeight: '50vh' }
        },
        // positionGlobalFilter: 'left',
        // enableColumnActions: true,
        // enableColumnFilters: false,
        // enablePagination: false,
        // enableSorting: false,
        // state: {
        //     showGlobalFilter: false,
        //     showColumnFilters: false
        // },
        renderDetailPanel: ({ row }) => {
            return <RowProfileCard row={ row } />
        }
    })
    return (
        <MaterialReactTable table={ table } />
    )
}
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


]

type TColumn = { [K in keyof TDataApi]?: MRT_ColumnDef<TDataApi[K]>[] }
export function EventsTable({ events }: { events: EVR[] }) {
    const table = useMaterialReactTable({
        columns: events_columns,
        data: events,
    })
    return (
        <MaterialReactTable table={ table } />
    )
}
const all_columns: TColumn = {
    db_events: [

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



    ],
    db_players: [
        {
            accessorKey: 'id',
            header: 'ID',

        },
        {
            accessorFn: ({ name }) => name,
            header: 'Имя',


        },
    ],

    db_users: [
        {
            accessorKey: 'user_name',
            header: 'Name',

        },
        {
            accessorKey: 'id',
            header: 'ID',

        },
        {
            accessorKey: 'email',
            header: 'Email',

        },
    ],
}
interface ApiUserResponse {
    id: number;
    name: string | null;
    role: UserRole;
    email: string;
    password: string;
    profile: {
        id: number;
        name: string | null;
        userId: number;
    } | null;
}

interface ApiEventResponse {
    id: number;
    name?: string | null
    players: {
        id: number;
        name: string;
    }[];
    title: string | null;
    date_formated: string;
    isDraft: boolean | null;
    pairs: {
        id: number;
        firstPlayerId: number;
        secondPlayerId: number;
        eventId: number;
    }[];
}

interface ApiPlayerResponse {
    id: number;
    name: string;
}

type TDataApi = {
    db_events: ApiEventResponse,
    db_players: ApiPlayerResponse,
    db_users: ApiUserResponse
}
type TabOptions = Pick<MRT_TableOptions<TDataApi[keyof TDataApi][]>, 'data' | 'columns'>
export function AllDataTable({ data_all, type }: {
    data_all: TDataApi,
    type: keyof TColumn
}) {
    const tab_data = useMemo(() => {
        switch (type) {
            case 'db_events': {
                const data = data_all[type]
                const columns = all_columns[type]
                return { data, columns }
            }
            case 'db_players': {
                const data = data_all[type]
                const columns = all_columns[type]
                return { data, columns }
            }
            case 'db_users': {
                const data = data_all[type]
                const columns = all_columns[type]
                return { data, columns }
            }
            default: {
                console.log('unknown type: ', type)
                // return {data:{}, columns:[]}
                return { data: [], columns: [] }
            }
        }


    }, [type, data_all])

    const { columns = [], data = [] } = tab_data as unknown as TabOptions
    const table = useMaterialReactTable({
        data, columns
    })



    return (
        <MaterialReactTable table={ table } />
    )
}

export function BackupTable({ restore }: { restore: 'players' | "events" | "all", data: PLR[] | EVR[] }) {
    const s = restore
    const q = useQuery({
        queryKey: [`/api/backup?data=${s}`, s]
    })





    return (
        <Suspense fallback={ <div>Loading data for table</div> }>
            { s === 'players' ?

                q.isSuccess && <PlayersTable players={ q.data as PLR[] } />
                : s === 'events' ?
                    q.isSuccess && EventsTable({ events: q.data as EVR[] })
                    : null
            }
        </Suspense>
    )
}

