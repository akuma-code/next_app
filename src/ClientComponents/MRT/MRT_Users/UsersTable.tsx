'use client'
import { useMemo, useState } from 'react';
import {
    MRT_EditActionButtons,
    MaterialReactTable,
    // createRow,
    type MRT_ColumnDef,
    type MRT_Row,
    type MRT_TableOptions,
    useMaterialReactTable,
} from 'material-react-table';
import {
    Box,
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Tooltip,
} from '@mui/material';
import {
    QueryClient,
    QueryClientProvider,
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';
import userColumns from './MRT_Data';
import { User } from '@prisma/client';
import { MRT_Localization_RU } from 'material-react-table/locales/ru';
type UsersMrtProps = {
    users: User[]
}
const UsersMRT: React.FC<UsersMrtProps> = ({ users }) => {
    const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});
    const columns = useMemo(() => [
        {
            accessorKey: 'nickname',
            header: 'Name',
            size: 80,
        },
        {
            accessorKey: 'role',
            header: 'Role',
            size: 80,
        },
        {
            accessorKey: 'password',
            header: 'Password',
            size: 80,
        },
        {
            accessorKey: 'id',
            header: 'UUID',
            size: 80,


        },
    ] as MRT_ColumnDef<User>[], [validationErrors])

    const table = useMaterialReactTable({
        columns,
        data: users,
        localization: MRT_Localization_RU,
        initialState: {
            density: 'compact',
            columnVisibility: {
                id: false,
                password: false
            }
        }
    })

    return (<MaterialReactTable table={ table } />)
}

export default UsersMRT