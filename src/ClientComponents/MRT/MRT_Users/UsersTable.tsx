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
import { useCreateUser } from '@/Hooks/MRT/useCreateUser';
import { useGetUsers } from '@/Hooks/MRT/useGetUsers';
import { useUpdateUser } from '@/Hooks/MRT/useUpdateUser';
import { useDeleteUser } from '@/Hooks/MRT/useDeleteUser';
import { validateUser } from './validators';
import { Delete, EditNotifications } from '@mui/icons-material';

type UsersMrtProps = {
    users: User[]
}
const UsersMRT: React.FC<UsersMrtProps> = ({ users }) => {

    const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});
    const columns = useMemo(() => [
        {
            accessorKey: 'id',
            header: 'ID',
            size: 80,


        },
        {
            accessorKey: 'nickname',
            header: 'Name',
            size: 200,
            muiEditTextFieldProps: {
                required: true,
                error: !!validationErrors?.nickname,
                helperText: validationErrors?.nickname,

                onFocus: () =>
                    setValidationErrors({
                        ...validationErrors,
                        nickname: undefined,
                    })
            },
        },
        {
            accessorKey: 'role',
            header: 'Role',
            size: 100,
            editVariant: 'select',
            editSelectOptions: ['user', 'guest', 'admin'],
            muiEditTextFieldProps: {
                select: true,

                required: false,
                error: !!validationErrors?.role,
                helperText: validationErrors?.role,

                onFocus: () =>
                    setValidationErrors({
                        ...validationErrors,
                        role: undefined,
                    })
            },
        },
        {
            accessorKey: 'password',
            header: 'Password',
            size: 200,
            muiEditTextFieldProps: {
                required: true,
                error: !!validationErrors?.password,
                helperText: validationErrors?.password,

                onFocus: () =>
                    setValidationErrors({
                        ...validationErrors,
                        password: undefined,
                    })
            },
        },

        {
            accessorKey: 'uuid',
            header: 'UUID',
            size: 200,


        },

    ] as MRT_ColumnDef<User>[], [validationErrors])

    const { mutateAsync: createUser, isPending: isCreatingUser } = useCreateUser()
    const handleCreateUser: MRT_TableOptions<User>['onCreatingRowSave'] = async ({ values, table, }) => {
        const newValidationErrors = validateUser(values);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        const { nickname, role, password } = values
        setValidationErrors({});
        await createUser({ nickname, password, role: role === '' ? 'guest' : role });
        table.setCreatingRow(null); //exit creating mode
    }


    const {
        data: fetchedUsers = [],
        isError: isLoadingUsersError,
        isFetching: isFetchingUsers,
        isLoading: isLoadingUsers,
    } = useGetUsers();
    const { mutateAsync: updateUser, isPending: isUpdatingUser } =
        useUpdateUser();
    //UPDATE action
    const handleSaveUser: MRT_TableOptions<User>['onEditingRowSave'] = async ({
        values,
        table,
    }) => {
        const newValidationErrors = validateUser(values);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }

        setValidationErrors({});
        await updateUser(values);
        table.setEditingRow(null); //exit editing mode
    };
    //call DELETE hook
    const { mutateAsync: deleteUser, isPending: isDeletingUser } =
        useDeleteUser();
    //DELETE action
    const openDeleteConfirmModal = (row: MRT_Row<User>) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            deleteUser({ userName: row.original.nickname })
        }
    };
    const table = useMaterialReactTable<User>({
        columns,
        data: fetchedUsers,
        layoutMode: 'grid',
        localization: MRT_Localization_RU,
        createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
        editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
        enableEditing: true,
        getRowId: (row) => row.uuid,
        muiToolbarAlertBannerProps: isLoadingUsersError
            ? {
                color: 'error',
                children: 'Error loading data',
            }
            : undefined,
        muiTableContainerProps: {
            sx: {
                minHeight: '300px',
                // minWidth: '800px'
            },
        },
        onCreatingRowCancel: () => setValidationErrors({}),
        onCreatingRowSave: handleCreateUser,
        onEditingRowCancel: () => setValidationErrors({}),
        onEditingRowSave: handleSaveUser,
        renderTopToolbarCustomActions: ({ table }) => (
            <Button
                variant="contained"
                size='small'
                onClick={ () => {
                    table.setCreatingRow(true); //simplest way to open the create row modal with no default values
                    //or you can pass in a row object to set default values with the `createRow` helper function
                    // table.setCreatingRow(
                    //   createRow(table, {
                    //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
                    //   }),
                    // );
                } }
            >
                Добавить пользователя
            </Button>
        ),
        renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => {
            const [Id, Nick, Role, Pass, ...rest] = internalEditComponents
            return (
                <>
                    <DialogTitle variant="h3">Create New User</DialogTitle>
                    <DialogContent
                        sx={ { display: 'flex', flexDirection: 'column', gap: '.5rem' } }
                    >

                        { Nick }
                        { Pass }
                        {
                            Role
                        }

                    </DialogContent>
                    <DialogActions>
                        <MRT_EditActionButtons variant="text" table={ table } row={ row } />
                    </DialogActions>
                </>
            )
        },
        //optionally customize modal content
        renderEditRowDialogContent: ({ table, row, internalEditComponents }) => {
            const [Id, Nick, Role, Pass, ...rest] = internalEditComponents

            return (

                <>
                    <DialogTitle variant="h3">Edit User</DialogTitle>
                    <DialogContent
                        sx={ { display: 'flex', flexDirection: 'column', gap: '1.5rem' } }
                    >
                        { Nick }
                        { Pass }
                        { Role }
                        {/* { internalEditComponents } {/* or render custom edit components here */ }
                    </DialogContent>
                    <DialogActions>
                        <MRT_EditActionButtons variant="text" table={ table } row={ row } />
                    </DialogActions>
                </>
            )
        },
        renderRowActions: ({ row, table }) => (
            <Box sx={ { display: 'flex', gap: '.5rem' } }>
                <Tooltip title="Edit">
                    <IconButton onClick={ () => table.setEditingRow(row) }>
                        <EditNotifications />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton color="error" onClick={ () => openDeleteConfirmModal(row) }>
                        <Delete />
                    </IconButton>
                </Tooltip>
            </Box>
        ),
        defaultDisplayColumn: {
            grow: 1,
            minSize: 100,
            muiTableHeadCellProps: {
                align: 'center'
            }
        },
        defaultColumn: {
            muiTableHeadCellProps: {
                align: 'left'
            },
            muiTableBodyCellProps: {
                align: 'left'
            }
        },
        initialState: {
            density: 'compact',
            columnVisibility: {
                password: false,
                uuid: false
            },

        },
        state: {
            isLoading: isLoadingUsers,
            isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
            showAlertBanner: isLoadingUsersError,
            showProgressBars: isFetchingUsers,
        },

    })

    return (<MaterialReactTable table={ table } />)
}

UsersMRT.displayName = '___UsersMRT'
export default UsersMRT
