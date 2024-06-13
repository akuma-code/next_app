'use client'
import { DTO_User } from '@/app/admin/users/userList';
import { validateUser } from '@/auth/validator';
import { createUser, createUserWithProfile, updateUser } from '@/Services/userService';
import { Stack, Typography, Button, Avatar, Box, DialogContent, DialogTitle, TextField, Grid } from '@mui/material';
import { User, UserRole } from '@prisma/client';
import {
    MRT_EditActionButtons,
    MaterialReactTable,
    useMaterialReactTable,
    // createRow,
    type MRT_ColumnDef,
    type MRT_Row,
    type MRT_TableOptions,
} from 'material-react-table';
import { MRT_Localization_RU } from 'material-react-table/locales/ru';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import SubmitButton from '../UI/SubmitButton';
const roles = {
    ADMIN: "Админ",
    MEMBER: "Пользователь",
    GUEST: "Гость",
}
const UsersMRT: React.FC<{ users: DTO_User[] }> = ({ users }) => {

    const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});
    const [profile_, setProfile] = useState({ name: "", email: "", pass: "" })
    const mrt_columns = useMemo(() =>

        [

            {
                accessorKey: 'email',
                header: "Email",
                minSize: 150
            },
            {
                accessorKey: 'role',
                header: "Role",
                grow: false,
                size: 80,
                editVariant: 'select',
                editSelectOptions: [UserRole.ADMIN, UserRole.MEMBER, UserRole.GUEST],
                enableColumnActions: false,
                Cell: ({ cell }) => roles[cell.getValue() as UserRole]
            },
            {
                accessorKey: 'profile',
                header: 'Профиль',
                minSize: 100,
                grow: true,
                muiTableBodyCellProps: {
                    align: 'center'
                },
                Cell: ({ cell, row }) => <Link href={ `/admin/users/profile/${row.original.id}` }><Avatar /></Link>,
                enableEditing: false,

            },
            // {
            //     accessorKey: 'name',
            //     header: "Name",
            //     minSize: 140
            // },
            {
                accessorKey: 'password',
                header: "Password",
                grow: false,
                maxSize: 120,
                enableHiding: true,
            },

        ] as MRT_ColumnDef<DTO_User>[], [validationErrors])

    const handleCreateUser: MRT_TableOptions<DTO_User>['onCreatingRowSave'] = async ({ values, table, row }) => {

        const errors = validateUser(values)
        if (Object.values(errors).some((error) => error)) {
            setValidationErrors(errors);
            return;
        }
        const { email, password, role, id, profile } = values;
        setValidationErrors({})
        const name = profile_.name
        const new_user = await createUserWithProfile({ email, password, role }, { name: profile_.name })
        table.setCreatingRow(null)
        return new_user

    }
    const handleUpdateUser: MRT_TableOptions<DTO_User>['onEditingRowSave'] = async ({ values, table, row }) => {
        // const errors = validateUser(values)
        // if (Object.values(errors).some((error) => error)) {
        //     setValidationErrors(errors);
        //     return;
        // }

        setValidationErrors({})
        const { password, profile, role } = values;

        await updateUser({ type: 'id', search: values.id }, values)
        table.setEditingRow(null)
    }
    const table = useMaterialReactTable<DTO_User>({
        columns: mrt_columns,
        data: users,
        layoutMode: 'grid',
        localization: MRT_Localization_RU,
        enableEditing: true,
        createDisplayMode: 'modal',
        editDisplayMode: 'row',
        enableRowNumbers: true,
        muiDetailPanelProps: {
            size: 'small'
        },
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
        onCreatingRowSave: handleCreateUser,
        onCreatingRowCancel({ table }) {
            setValidationErrors({})
            table.setCreatingRow(null)
        },
        onEditingRowSave: handleUpdateUser,
        renderCreateRowDialogContent: ({ row, table, internalEditComponents }) => {
            const [
                Email,
                Role,
                Profile,
                Password,
            ] = internalEditComponents


            return (
                <>
                    <DialogTitle >
                        Create new user
                    </DialogTitle>
                    <Grid container spacing={ 2 } p={ 2 }>
                        <Grid item md={ 12 }>
                            <TextField name='name'
                                value={ profile_.name }
                                onChange={ (e) => setProfile(prev => ({ ...prev, name: e.target.value })) }
                                label="Name"
                                variant='outlined'
                                fullWidth

                                size='small'
                            />
                            { Email }
                            { Password }
                        </Grid>


                    </Grid>

                </>
            )
        },
        renderDetailPanel(props) {
            return (
                <Stack>
                    <Typography variant='body2'>password: { props.row.original.password }</Typography>
                </Stack>
            )
        },

        defaultDisplayColumn: {
            grow: false,
            maxSize: 80,
            muiTableHeadCellProps: {
                align: 'center',
                sx: {
                    borderRight: '1px solid black',
                    bgcolor: 'grey',
                    fontWeight: 'normal'
                }

            },
            muiTableBodyCellProps: {
                align: 'center',
                sx: { borderRight: '1px solid black', },
            }
        },
        defaultColumn: {
            grow: true,
            muiTableHeadCellProps: {
                align: 'center',
                sx: {
                    bgcolor: '#a0e1ff',
                    borderRight: '1px solid black',
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
                'mrt-row-actions',
            ],

        },
        initialState: {
            columnVisibility: {
                password: false
            }
        },
        muiTableContainerProps: {
            sx: {
                maxWidth: 660,
                minWidth: 500,
                border: '2px groove darkgrey',
            }
        },


    })
    return (<MaterialReactTable table={ table } />)
}

export default UsersMRT