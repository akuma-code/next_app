"use client";

import { DTO_User } from "@/ClientComponents/userList";
import { validateUserCreate, validateUserUpdate } from "@/auth/validator";
import {
    createUserWithProfile,
    deleteUser,
    editUser,
} from "@/Services/userService";
import {
    AccountCircleTwoTone,
    DeleteTwoTone,
    ShareTwoTone,
} from "@mui/icons-material";
import {
    Stack,
    Typography,
    Button,
    Avatar,
    Box,
    DialogContent,
    DialogTitle,
    TextField,
    Grid,
    DialogActions,
    IconButton,
    MenuItem,
} from "@mui/material";
import { User, UserRole } from "@prisma/client";
import {
    MRT_ActionMenuItem,
    MRT_EditActionButtons,
    MaterialReactTable,
    useMaterialReactTable,
    // createRow,
    type MRT_ColumnDef,
    type MRT_Row,
    type MRT_TableOptions,
} from "material-react-table";
import { MRT_Localization_RU } from "material-react-table/locales/ru";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const roles = {
    ADMIN: "Админ",
    MEMBER: "Пользователь",
    GUEST: "Гость",
};
const UsersMRT: React.FC<{ users: DTO_User[] }> = ({ users }) => {
    const [validationErrors, setValidationErrors] = useState<
        Record<string, string | undefined>
    >({});

    // const [profile_, setProfile] = useState({ name: "", email: "", pass: "", role: "" })
    const router = useRouter();
    const pathname = usePathname();
    const mrt_columns = useMemo(
        () =>
            [
                {
                    accessorKey: "email",
                    header: "Email",
                    minSize: 150,
                    muiEditTextFieldProps: {
                        type: "email",
                        required: true,
                        error: !!validationErrors?.email,
                        helperText: validationErrors?.email,
                        variant: "filled",
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
                    accessorKey: "name",
                    header: "Имя",
                    minSize: 100,
                    muiEditTextFieldProps: {
                        type: "text",
                        required: false,
                        error: !!validationErrors?.name,
                        helperText: validationErrors?.name,
                        variant: "filled",
                        onFocus: () =>
                            setValidationErrors({
                                ...validationErrors,
                                name: undefined,
                            }),
                        // onChange: (e) =>
                        //     setProfile(prev => ({ ...prev, name: e.target.value }))
                    },

                    // Cell: ({ row }) => row.original?.name
                },
                {
                    accessorKey: "role",
                    header: "Доступ",
                    grow: 1,
                    minSize: 80,
                    editVariant: "select",
                    editSelectOptions: [
                        UserRole.ADMIN,
                        UserRole.MEMBER,
                        UserRole.GUEST,
                    ],
                    enableColumnActions: false,
                    Cell: ({ cell }) => roles[cell.getValue() as UserRole],
                    muiEditTextFieldProps: {
                        variant: "outlined",
                        error: !!validationErrors?.role,
                        helperText: validationErrors?.role,
                        defaultValue: UserRole.GUEST,
                    },
                },

                {
                    accessorKey: "password",
                    header: "Пароль",
                    grow: 1,
                    minSize: 120,
                    enableHiding: true,
                    enableEditing: true,
                    muiEditTextFieldProps: {
                        type: "password",
                        required: false,
                        error: !!validationErrors?.password,
                        helperText: validationErrors?.password,
                        variant: "filled",
                        onFocus: () =>
                            setValidationErrors({
                                ...validationErrors,
                                password: undefined,
                            }),
                        // onChange: (e) =>
                        //     setProfile(prev => ({ ...prev, pass: e.target.value }))
                    },
                    Cell: ({ cell }) => `${cell.getValue()}`,
                },
            ] as MRT_ColumnDef<DTO_User>[],
        [validationErrors]
    );

    const handleCreateUser: MRT_TableOptions<DTO_User>["onCreatingRowSave"] =
        async ({ values, table, row, exitCreatingMode }) => {
            const errors = validateUserCreate(values);
            if (Object.values(errors).some((error) => error)) {
                setValidationErrors(errors);
                return;
            }

            setValidationErrors({});
            // const name = profile_.name
            await createUserWithProfile(values);
            table.setCreatingRow(null);
            // exitCreatingMode()
        };
    const handleUpdateUser: MRT_TableOptions<DTO_User>["onEditingRowSave"] =
        async ({ exitEditingMode, values, table, row }) => {
            const errors = validateUserUpdate(values);
            if (Object.values(errors).some((error) => error)) {
                setValidationErrors(errors);
                console.table(errors);
                return;
            }
            setValidationErrors({});
            // _log({ values })
            const userId = row.original.id;
            // const name = values['profile.name']
            const { email, password, role, name } = values;
            await editUser({ id: userId }, { email, password, role, name });
            table.setEditingRow(null);
            // exitEditingMode()
        };

    const handleDeleteUser = async (id: number) => {
        confirm("Delete user? ") && (await deleteUser(id));
    };
    const table = useMaterialReactTable<DTO_User>({
        columns: mrt_columns,
        data: users,
        layoutMode: "grid",
        localization: MRT_Localization_RU,
        enableEditing: true,
        createDisplayMode: "modal",
        editDisplayMode: "modal",
        enableRowNumbers: true,
        muiDetailPanelProps: {
            size: "small",
        },

        enableHiding: true,
        positionActionsColumn: "last",
        renderTopToolbarCustomActions: ({ table }) => (
            <Button
                variant="contained"
                size="small"
                onClick={() => {
                    table.setCreatingRow(true);
                }}
            >
                Добавить пользователя
            </Button>
        ),
        onCreatingRowSave: handleCreateUser,
        onCreatingRowCancel({ table }) {
            setValidationErrors({});
            table.setCreatingRow(null);
        },

        onEditingRowSave: handleUpdateUser,
        onEditingRowCancel: ({ table }) => {
            setValidationErrors({});
            table.setEditingRow(null);
        },
        renderCreateRowDialogContent: ({
            row,
            table,
            internalEditComponents,
        }) => {
            return (
                <Box>
                    <DialogTitle>Создать нового пользователя</DialogTitle>
                    <Grid container spacing={2} p={2}>
                        <Grid item md={12}>
                            {/* <TextField name='name'
                                value={ profile_.name }
                                onChange={ (e) => setProfile(prev => ({ ...prev, name: e.target.value })) }
                                label="Name"
                                variant='outlined'
                                fullWidth>
                                Добавить нового пользователя
                            </TextField> */}
                        </Grid>
                        <Grid container spacing={2} p={2}>
                            {internalEditComponents.map((c, idx) => (
                                <Grid item key={idx / 3} md={12}>
                                    {c}
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                    <DialogActions
                        sx={{ display: "flex", justifyContent: "start" }}
                    >
                        <MRT_EditActionButtons
                            variant="text"
                            color={"warning"}
                            table={table}
                            row={row}
                        />
                    </DialogActions>
                </Box>
            );
        },

        renderEditRowDialogContent: ({
            row,
            table,
            internalEditComponents,
        }) => {
            return (
                <>
                    <DialogTitle>Изменить данные</DialogTitle>
                    <Grid container spacing={2} p={2}>
                        {internalEditComponents.map((c, idx) => (
                            <Grid item key={idx / 3} md={12}>
                                {c}
                            </Grid>
                        ))}
                    </Grid>
                    <DialogActions
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <MRT_EditActionButtons
                            variant="text"
                            table={table}
                            row={row}
                        />
                    </DialogActions>
                </>
            );
        },
        renderDetailPanel(props) {
            const { row, table } = props;

            return (
                <Grid
                    gridTemplateRows={"1fr 1fr"}
                    container
                    spacing={2}
                    direction={"column"}
                >
                    <Grid item>
                        <Typography variant="body2" fontWeight={"bold"}>
                            name: {row.original.profile?.name}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2">
                            Дополнительная информация:
                        </Typography>
                        <Typography variant="subtitle1">
                            {row.original.password}
                        </Typography>
                    </Grid>
                </Grid>
            );
        },

        displayColumnDefOptions: {
            "mrt-row-actions": {
                header: "Меню", //change header text
                size: 100, //make actions column wider
            },
        },

        renderRowActionMenuItems: ({ closeMenu, row }) => [
            <MenuItem
                divider
                key={1}
                onClick={async () =>
                    await handleDeleteUser(row.original.id).finally(() =>
                        closeMenu()
                    )
                }
            >
                <Stack direction={"row"} width={"100%"} gap={2}>
                    <DeleteTwoTone className="mx-1" />
                    <Box flexGrow={1}> Удалить</Box>
                </Stack>
            </MenuItem>,
            <MenuItem
                key={2}
                onClick={() => {
                    router.push(pathname + `/profile/${row.original.id}`);
                    closeMenu();
                }}
            >
                <Stack direction={"row"} width={"100%"} gap={2}>
                    <AccountCircleTwoTone />{" "}
                    <span className="mp-1"> Профиль</span>
                </Stack>
            </MenuItem>,
            <MenuItem
                key={3}
                onClick={() => {
                    console.info("user: ", row.original);
                    closeMenu();
                }}
            >
                <Stack direction={"row"} width={"100%"} gap={2}>
                    <ShareTwoTone /> Консоль
                </Stack>
            </MenuItem>,
        ],
        defaultDisplayColumn: {
            grow: 1,
            // maxSize: 120,
            muiTableHeadCellProps: {
                align: "center",
                sx: {
                    border: "1px solid black",
                    bgcolor: "secondary.light",
                    color: "primary.main",
                    fontWeight: "normal",
                },
            },
            muiTableBodyCellProps: {
                align: "center",
                sx: { borderRight: "1px solid black" },
            },
        },
        defaultColumn: {
            grow: 1,
            muiTableHeadCellProps: {
                align: "center",
                sx: {
                    bgcolor: "secondary.light",
                    color: "primary.main",
                    border: "1px solid black",
                    fontSize: {
                        xs: "10px",
                        sm: "11px",
                        md: "12px",
                        lg: "13px",
                        xl: "14px",
                    },
                    fontWeight: "bold",
                },
            },
            muiTableBodyCellProps: {
                align: "left",
                sx: {
                    borderRight: "1px solid black",
                    fontSize: {
                        xs: "10px",
                        sm: "11px",
                        md: "12px",
                        lg: "13px",
                        xl: "14px",
                    },
                    fontWeight: "normal",
                },
            },
        },
        state: {
            density: "compact",
            columnOrder: [
                "mrt-row-numbers",
                "mrt-row-expand",
                "email",
                "name",
                "role",
                "password",
                "mrt-row-actions",
            ],
        },
        initialState: {},
        muiTableContainerProps: {
            sx: {
                minWidth: 700,
                // minWidth: 500,
                border: "2px groove darkgrey",
            },
        },
    });
    return <MaterialReactTable table={table} />;
};

export default UsersMRT;
