'use client'
import { DTO_User } from '@/app/admin/users/userList';
<<<<<<< HEAD
<<<<<<< HEAD
import { validateUserCreate, validateUserUpdate } from '@/auth/validator';
import { createUserWithProfile, deleteUser, editUser, } from '@/Services/userService';
import { Stack, Typography, Button, Avatar, Box, DialogContent, DialogTitle, TextField, Grid, DialogActions, IconButton, MenuItem } from '@mui/material';
=======
import { validateUser } from '@/auth/validator';
import { createUser, createUserWithProfile, updateUser } from '@/Services/userService';
import { Stack, Typography, Button, Avatar, Box, DialogContent, DialogTitle, TextField, Grid } from '@mui/material';
>>>>>>> 820e0e3 (sync)
=======
import { validateUserCreate, validateUserUpdate } from '@/auth/validator';
import { createUserWithProfile, deleteUser, editUser, } from '@/Services/userService';
import { Stack, Typography, Button, Avatar, Box, DialogContent, DialogTitle, TextField, Grid, DialogActions, IconButton, MenuItem } from '@mui/material';
>>>>>>> 298ba52 (custom signin page)
import { User, UserRole } from '@prisma/client';
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
import { useMemo, useState } from 'react';
<<<<<<< HEAD
<<<<<<< HEAD
import { AccountCircleTwoTone, DeleteTwoTone, ShareTwoTone } from '@mui/icons-material';
import { _log } from '@/Helpers/helpersFns';
import { usePathname, useRouter } from 'next/navigation';
=======
import SubmitButton from '../UI/SubmitButton';
>>>>>>> 820e0e3 (sync)
=======
import { AccountCircleTwoTone, DeleteTwoTone, ShareTwoTone } from '@mui/icons-material';
import { _log } from '@/Helpers/helpersFns';
import { usePathname, useRouter } from 'next/navigation';
>>>>>>> 298ba52 (custom signin page)
const roles = {
    ADMIN: "Админ",
    MEMBER: "Пользователь",
    GUEST: "Гость",
}
const UsersMRT: React.FC<{ users: DTO_User[] }> = ({ users }) => {

    const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});
<<<<<<< HEAD
<<<<<<< HEAD
    const [profile_, setProfile] = useState({ name: "", email: "", pass: "", role: "" })
    const router = useRouter()
    const pathname = usePathname()
=======
    const [profile_, setProfile] = useState({ name: "", email: "", pass: "" })
>>>>>>> 820e0e3 (sync)
=======
    const [profile_, setProfile] = useState({ name: "", email: "", pass: "", role: "" })
    const router = useRouter()
    const pathname = usePathname()
>>>>>>> 298ba52 (custom signin page)
    const mrt_columns = useMemo(() =>
        [

            {
                accessorKey: 'email',
                header: "Email",
                minSize: 150,
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.email,
                    helperText: validationErrors?.email,
                    variant: 'filled',
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            email: undefined,
                        }),
                    // onChange: (e) =>
                    //     setProfile(prev => ({ ...prev, email: e.target.value }))
                },
            },
            {
                accessorKey: 'name',
                header: "Имя",
                minSize: 100,
                muiEditTextFieldProps: {
                    required: false,
                    error: !!validationErrors?.name,
                    helperText: validationErrors?.name,
                    variant: 'filled',
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            name: undefined,
                        }),
                    // onChange: (e) =>
                    //     setProfile(prev => ({ ...prev, name: e.target.value }))
                },

                Cell: ({ row }) => row.original.profile?.name ?? "No name"
            },
            {
                accessorKey: 'role',
                header: "Доступ",
                grow: 1,
                minSize: 80,
                editVariant: 'select',
                editSelectOptions: [UserRole.ADMIN, UserRole.MEMBER, UserRole.GUEST],
                enableColumnActions: false,
                Cell: ({ cell }) => roles[cell.getValue() as UserRole],
                muiEditTextFieldProps: {
                    variant: 'outlined',
                    error: !!validationErrors?.role,
                    helperText: validationErrors?.role,
                    onChange: (e) => setProfile(prev => ({ ...prev, role: e.target.value as string })),
                    // defaultValue: UserRole.GUEST
                },
<<<<<<< HEAD
<<<<<<< HEAD
=======
                Cell: ({ cell, row }) => <Link href={ `/admin/users/profile/${row.original.id}` }><Avatar /></Link>,
                enableEditing: false,
>>>>>>> 820e0e3 (sync)
=======
>>>>>>> 298ba52 (custom signin page)

            },

            {
                accessorKey: 'password',
                header: "Пароль",
                grow: 1,
                minSize: 120,
                enableHiding: true,
<<<<<<< HEAD
<<<<<<< HEAD
                enableEditing: false,
=======
>>>>>>> 298ba52 (custom signin page)
=======
                enableEditing: false,
>>>>>>> 09b08fd (db schema)
                muiEditTextFieldProps: {
                    required: false,
                    error: !!validationErrors?.password,
                    helperText: validationErrors?.password,
                    variant: 'filled',
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            password: undefined,
                        }),
                    // onChange: (e) =>
                    //     setProfile(prev => ({ ...prev, pass: e.target.value }))
                },
                Cell: ({ cell }) => `${cell.getValue()}`.toString().slice(0, 8) + ' ....'
            },

        ] as MRT_ColumnDef<DTO_User>[], [validationErrors])

    const handleCreateUser: MRT_TableOptions<DTO_User & { name?: string }>['onCreatingRowSave'] = async ({ values, table, row, exitCreatingMode }) => {

        const errors = validateUserCreate(values)
        if (Object.values(errors).some((error) => error)) {
            setValidationErrors(errors);
            return;
        }
        // _log({ values })
        const { email, password, role, name } = values;

        await createUserWithProfile({ email, password, role }, { name })


        setValidationErrors({})
<<<<<<< HEAD
<<<<<<< HEAD
=======
        const name = profile_.name
        const new_user = await createUserWithProfile({ email, password, role }, { name: profile_.name })
>>>>>>> 820e0e3 (sync)
=======
>>>>>>> 298ba52 (custom signin page)
        table.setCreatingRow(null)
        // exitCreatingMode()


    }
    const handleUpdateUser: MRT_TableOptions<DTO_User & { name?: string }>['onEditingRowSave'] = async ({ exitEditingMode, values, table, row }) => {
        const errors = validateUserUpdate(values)
        if (Object.values(errors).some((error) => error)) {
            setValidationErrors(errors);
            console.table(errors)
            return;
        }
        setValidationErrors({})
        // _log({ values })
        const userId = row.original.id
        // const name = values['profile.name']
        const { email, password, role, name } = values
        await editUser({ id: userId }, { email, password, role }, { name })
        table.setEditingRow(null)
        // exitEditingMode()
    }

    const handleDeleteUser = async (id: number) => {
        confirm("Delete user? ") && await deleteUser(id)
    }
    const table = useMaterialReactTable<DTO_User & { name?: string }>({
        columns: mrt_columns,
        data: users,
        layoutMode: 'grid',
        localization: MRT_Localization_RU,
        enableEditing: true,
        createDisplayMode: 'modal',
        editDisplayMode: 'modal',
        enableRowNumbers: true,
        muiDetailPanelProps: {
            size: 'small',

        },

        enableHiding: true,
        positionActionsColumn: 'last',
        renderTopToolbarCustomActions: ({ table }) => (
            <Button
                variant="contained"
                size='small'
                onClick={ () => {
                    table.setCreatingRow(true);

                } }
            >
                Добавить пользователя
            </Button>
        ),
        onCreatingRowSave: handleCreateUser,
        onCreatingRowCancel({ table }) {
            setValidationErrors({})
            table.setCreatingRow(null)
        },

        onEditingRowSave: handleUpdateUser,
        onEditingRowCancel: ({ table }) => {
            setValidationErrors({})
            table.setEditingRow(null)
        },
        renderCreateRowDialogContent: ({ row, table, internalEditComponents }) => {
<<<<<<< HEAD

            return (
                <>
                    <DialogTitle >
                        Добавить нового пользователя
                    </DialogTitle>
                    <Grid container spacing={ 2 } p={ 2 }>

                        { internalEditComponents.map((c, idx) =>

                            <Grid item key={ idx / 3 } md={ 12 }>
                                { c }
                            </Grid>
                        ) }

                    </Grid>
                    <DialogActions sx={ { display: 'flex', justifyContent: 'start' } }>
                        <MRT_EditActionButtons variant="text" color={ 'warning' } table={ table } row={ row } />
                    </DialogActions>
                </>
            )
        },
        renderEditRowDialogContent: ({ row, table, internalEditComponents }) => {
=======
>>>>>>> 298ba52 (custom signin page)

            return (
                <>
                    <DialogTitle >
<<<<<<< HEAD
                        Изменить данные
                    </DialogTitle>
                    <Grid container spacing={ 2 } p={ 2 }>
<<<<<<< HEAD

                        { internalEditComponents.map((c, idx) =>

                            <Grid item key={ idx / 3 } md={ 12 }>
                                { c }
                            </Grid>
                        ) }


                    </Grid>
                    <DialogActions sx={ { display: 'flex', justifyContent: 'space-between' } }>
                        <MRT_EditActionButtons variant="text" table={ table } row={ row } />
                    </DialogActions>
=======
                        <Grid item md={ 12 }>
                            <TextField name='name'
                                value={ profile_.name }
                                onChange={ (e) => setProfile(prev => ({ ...prev, name: e.target.value })) }
                                label="Name"
                                variant='outlined'
                                fullWidth
=======
                        Добавить нового пользователя
                    </DialogTitle>
                    <Grid container spacing={ 2 } p={ 2 }>
>>>>>>> 298ba52 (custom signin page)

                        { internalEditComponents.map((c, idx) =>

                            <Grid item key={ idx / 3 } md={ 12 }>
                                { c }
                            </Grid>
                        ) }

                    </Grid>
                    <DialogActions sx={ { display: 'flex', justifyContent: 'start' } }>
                        <MRT_EditActionButtons variant="text" color={ 'warning' } table={ table } row={ row } />
                    </DialogActions>
                </>
            )
        },
        renderEditRowDialogContent: ({ row, table, internalEditComponents }) => {

            return (
                <>
                    <DialogTitle >
                        Изменить данные
                    </DialogTitle>
                    <Grid container spacing={ 2 } p={ 2 }>

                        { internalEditComponents.map((c, idx) =>

                            <Grid item key={ idx / 3 } md={ 12 }>
                                { c }
                            </Grid>
                        ) }


<<<<<<< HEAD
>>>>>>> 820e0e3 (sync)
=======
                    </Grid>
                    <DialogActions sx={ { display: 'flex', justifyContent: 'space-between' } }>
                        <MRT_EditActionButtons variant="text" table={ table } row={ row } />
                    </DialogActions>
>>>>>>> 298ba52 (custom signin page)
                </>
            )
        },
        renderDetailPanel(props) {
            const { row, table } = props;

            return (
                <Grid gridTemplateRows={ '1fr 1fr' } container spacing={ 2 } direction={ 'column' }>
                    <Grid item >

                        <Typography variant='body2' fontWeight={ 'bold' }>name: { row.original.profile?.name }</Typography>
                    </Grid>
                    <Grid item >

<<<<<<< HEAD
<<<<<<< HEAD
                        <Typography variant='subtitle1'>
                            { row.original.password }
=======
                        <Typography variant='body2'>
                            Дополнительная информация:
>>>>>>> 298ba52 (custom signin page)
=======
                        <Typography variant='subtitle1'>
                            { row.original.password }
>>>>>>> 09b08fd (db schema)

                        </Typography>
                    </Grid>
                </Grid>
            )
        },

        displayColumnDefOptions: {
            'mrt-row-actions': {
                header: 'Меню', //change header text
                size: 100, //make actions column wider
            },
        },

        renderRowActionMenuItems: ({
            closeMenu,
            row
        }) => [
                <MenuItem
                    divider
                    key={ 1 }
                    onClick={ async () => await handleDeleteUser(row.original.id).finally(() => closeMenu()) }
                >
                    <Stack
                        direction={ 'row' } width={ '100%' }
                        gap={ 2 }
                    >
                        <DeleteTwoTone className='mx-1' /><Box flexGrow={ 1 }> Удалить</Box>
                    </Stack>
                </MenuItem>,
                <MenuItem key={ 2 }


                    onClick={ () => {
                        router.push(pathname + `/profile/${row.original.id}`)
                        closeMenu();
                    } }>
                    <Stack direction={ 'row' } width={ '100%' } gap={ 2 }>

                        <AccountCircleTwoTone /> <span className='mp-1'> Профиль</span>
                    </Stack>
                </MenuItem>,
                <MenuItem key={ 3 } onClick={ () => {
                    console.info('Share', row.original);
                    closeMenu();
                } }>
                    <Stack direction={ 'row' } width={ '100%' } gap={ 2 }>
                        <ShareTwoTone /> Поделиться
                    </Stack>
                </MenuItem>
            ],
        defaultDisplayColumn: {
            grow: 1,
            // maxSize: 120,
            muiTableHeadCellProps: {
                align: 'center',
                sx: {
                    border: '1px solid black',
                    bgcolor: 'secondary.light',
                    color: 'primary.main',
                    fontWeight: 'normal'
                }

            },
            muiTableBodyCellProps: {
                align: 'center',
                sx: { borderRight: '1px solid black', },
            }
        },
        defaultColumn: {
            grow: 1,
            muiTableHeadCellProps: {
                align: 'center',
                sx: {
                    bgcolor: 'secondary.light',
                    color: 'primary.main',
                    border: '1px solid black',
                    fontSize: {
                        xs: '10px',
                        sm: '11px',
                        md: '12px',
                        lg: '13px',
                        xl: '14px',
                    },
                    fontWeight: 'bold'
                }
            },
            muiTableBodyCellProps: {
                align: 'left',
                sx: {
                    borderRight: '1px solid black',
                    fontSize: {
                        xs: '10px',
                        sm: '11px',
                        md: '12px',
                        lg: '13px',
                        xl: '14px',
                    },
                    fontWeight: 'normal'
                },

            },
        },
        state: {
            density: 'compact',
            columnOrder: [

                'mrt-row-numbers',
                'mrt-row-expand',
                'email',
                'name',
                'role',
                'password',
                'mrt-row-actions',
            ],

        },
        initialState: {

        },
        muiTableContainerProps: {
            sx: {
                minWidth: 700,
                // minWidth: 500,
                border: '2px groove darkgrey',
            }
        },


    })
    return (<MaterialReactTable table={ table } />)
}

export default UsersMRT