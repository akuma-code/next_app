import { User } from '@prisma/client';
import {
    MRT_EditActionButtons,
    MaterialReactTable,
    // createRow,
    type MRT_ColumnDef,
    type MRT_Row,
    type MRT_TableOptions,
    useMaterialReactTable,
} from 'material-react-table';

const userColumns: MRT_ColumnDef<User>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        size: 80,
    },
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
]

export default userColumns