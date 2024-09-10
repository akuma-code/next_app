"use client";
import { monthReducer } from "@/Helpers/eventsMonthParser";
import { useToggle } from "@/Hooks/useToggle";
import {
    CreateNewPlayer,
    createPlayer,
    deletePlayer,
    EditPlayer,
    editPlayer,
} from "@/Services/playerService";
import { createTicketForPlayer } from "@/Services/tickets/ticketActions";
import { PrismaPlayer_ } from "@/Types";
import {
    mdiFileCertificateOutline,
    mdiFileRemoveOutline,
    mdiTicketConfirmationOutline,
} from "@mdi/js";
import Icon from "@mdi/react";
import {
    AccountCircleTwoTone,
    DeleteTwoTone,
    EditTwoTone,
    ShareTwoTone,
    Edit,
} from "@mui/icons-material";
import {
    Box,
    Button,
    ButtonGroup,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Grid2,
    IconButton,
    MenuItem,
    Stack,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Tooltip,
} from "@mui/material";
import {
    LiteralUnion,
    MaterialReactTable,
    MRT_ActionMenuItem,
    MRT_EditActionButtons,
    MRT_Row,
    MRT_RowSelectionState,
    MRT_TableInstance,
    MRT_TableOptions,
    useMaterialReactTable,
    // createRow,
    type MRT_ColumnDef,
} from "material-react-table";
import { useState, useTransition } from "react";
import { mrt_players_options } from "../mrt.config.players";
import {
    fetchAndCreatePlayers,
    reSyncPlayers,
} from "@/Services/events/db_event";
import { useTicket } from "@/Hooks/MRT/Ticket/useTicket";
import { useGetAllPlayers } from "@/Hooks/useGetEventPlayers";

type TValues = Record<
    LiteralUnion<
        | "id"
        | "name"
        | "pair"
        | "ticket"
        | "profile"
        | "events"
        | "createdAt"
        | "updatedAt"
        | "_count"
        | "_count.events"
        | "pair.id"
        | "pair.playerId"
        | "pair.firstPlayerId"
        | "pair.secondPlayerId"
        | "events.cost",
        string
    >,
    any
>;
// {
//     info: Prisma.$InfoPayload["scalars"] | null;
//     events: Prisma.$EventPayload["scalars"] | null;
//     profile: Prisma.$ProfilePayload["scalars"] | null;
//     _count?: { events: number };
// };

const player_columns: MRT_ColumnDef<PrismaPlayer_>[] = [
    // {
    //     accessorKey: "id",
    //     header: "ID",
    //     grow: 0,
    //     maxSize: 100,
    //     enableEditing: false,
    // },
    {
        accessorKey: "name",
        header: "Игрок",
        grow: 1,
        minSize: 220,
        editVariant: "text",

        muiTableBodyCellProps: {
            align: "left",
        },

        muiEditTextFieldProps: {
            required: true,
            variant: "outlined",
            helperText: "Player name",
        },
    },
    {
        accessorKey: "_count.events",
        header: "Посещений",
        grow: 1,
        minSize: 100,
        enableEditing: false,

        muiTableBodyCellProps: {
            align: "center",
        },
        muiTableHeadCellProps: {
            align: "center",
        },
        Edit: () => null,
    },

    {
        id: "amount",
        accessorFn(originalRow) {
            return originalRow.ticket?.amount
                ? originalRow.ticket.amount.toString()
                : "";
        },
        header: "Абонемент",
        muiTableBodyCellProps: {
            align: "center",
        },
        muiTableHeadCellProps: {
            align: "center",
        },
        enableEditing: false,
        minSize: 80,
        grow: 1,
        Cell({ row }) {
            // if (!row.original.ticket?.amount) return "";
            const { ticket } = row.original;
            if (!ticket) return null;
            const { amount, limit } = ticket;

            return `${amount}/${limit}`;
        },
        Edit: () => null,
    },
    {
        accessorKey: "ticket",

        id: "status",
        header: "Статус",
        grow: 1,
        minSize: 100,
        Cell: ({ row }) =>
            row.original.ticket?.amount ? `Абонемент` : "Фактический",
        muiEditTextFieldProps: {},
        Edit: () => null,
    },
];
export function MRTPlayers({ players }: { players: PrismaPlayer_[] }) {
    const [open, c] = useToggle();
    const [selected_player, select] = useState<PrismaPlayer_ | null>(null);
    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
    const [qplayers, p_loading] = useGetAllPlayers();
    const [isPending, s] = useTransition();
    const handleReSync = () =>
        s(async () => {
            await reSyncPlayers();
        });

    const handleSavePlayer: MRT_TableOptions<PrismaPlayer_>["onEditingRowSave"] =
        async ({ values, table, row }) => {
            const { name, ticket } = values;
            const {
                original: { id },
            } = row;
            s(async () => {
                await EditPlayer({ where: { id }, data: { name } });
                table.setEditingRow(null); //exit editing mode
            });
        };

    const table = useMaterialReactTable({
        ...mrt_players_options,
        columns: player_columns,
        data: qplayers,
        state: {
            // rowSelection,
            isLoading: p_loading,
            isSaving: isPending,
            columnOrder: [
                "mrt-row-select",
                "mrt-row-expand",
                "mrt-row-numbers",
                "mrt-row-actions",
                "name",
            ],
        },
        enableStickyHeader: true,
        renderDetailPanel: PlayerControlDetail,
        muiExpandButtonProps: ({ row, table }) => ({
            onClick: () =>
                table.setExpanded({ [row.id]: !row.getIsExpanded() }), //set only this row to be expanded
        }),
        renderRowActions({ row, table }) {
            return (
                <Box sx={{ display: "flex", gap: ".5rem" }}>
                    <Tooltip title="Edit">
                        <IconButton onClick={() => table.setEditingRow(row)}>
                            <EditTwoTone />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete">
                        <IconButton
                            color="warning"
                            onClick={() => openDeleteConfirmModal(row)}
                        >
                            <DeleteTwoTone />
                        </IconButton>
                    </Tooltip>
                </Box>
            );
        },
        renderTopToolbarCustomActions(props) {
            const { table } = props;
            return (
                <ButtonGroup
                    color="secondary"
                    sx={{ gap: 1 }}
                    size="small"
                    disabled={isPending}
                >
                    <Button
                        variant="contained"
                        onClick={() => table.setCreatingRow(true)}
                    >
                        Добавить игрока
                    </Button>
                    <Button
                        variant="contained"
                        color={"warning"}
                        onClick={handleReSync}
                    >
                        Синхронизировать
                    </Button>
                </ButtonGroup>
            );
        },
        renderCreateRowDialogContent: ({
            internalEditComponents,
            row,
            table,
        }) => {
            return (
                <>
                    <DialogTitle
                        variant="h5"
                        component={"div"}
                        textAlign={"center"}
                    >
                        Добавить игрока
                    </DialogTitle>
                    <DialogContent
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                        }}
                    >
                        {internalEditComponents}{" "}
                        {/* or render custom edit components here */}
                    </DialogContent>
                    <DialogActions>
                        <MRT_EditActionButtons
                            variant="text"
                            table={table}
                            row={row}
                        />
                    </DialogActions>
                </>
            );
        },
        onCreatingRowSave: async ({ exitCreatingMode, table, values }) => {
            try {
                s(async () => {
                    const { name } = values;
                    const np = await CreateNewPlayer({
                        data: { name },
                        select: { id: true, name: true },
                    });
                    console.table(np);
                });
            } catch (error) {
                console.log(error);
            } finally {
                exitCreatingMode();
            }
        },

        onEditingRowSave: handleSavePlayer,

        // renderRowActionMenuItems: RowActionMenu,
        // renderRowActionMenuItems(props) {
        //     return RowActionMenu(props);
        // },
        enableRowActions: true,
    });

    return <MaterialReactTable table={table} />;
}

const RowActionMenu = ({
    closeMenu,
    row,
    table,
}: {
    closeMenu: () => void;
    row: MRT_Row<PrismaPlayer_>;
    table: MRT_TableInstance<PrismaPlayer_>;
}) => [
    // <MenuItem divider key={0}>
    //     <Stack direction={"row"} width={"100%"} gap={2}>
    //         <EditTwoTone className="mx-1" />
    //         <Box flexGrow={1}> Изменить</Box>
    //     </Stack>
    // </MenuItem>,
    // <MRT_ActionMenuItem
    //     table={table}
    //     label="Edit"
    //     icon={<EditTwoTone />}
    //     key={"delete_" + row.original.name}
    // />,
    <MenuItem
        key={"delete_" + row.original.name}
        onClick={async () =>
            await handleDeletePlayer({
                player_id: row.original.id,
            }).then(closeMenu)
        }
    >
        <Stack direction={"row"} width={"100%"} gap={2}>
            <DeleteTwoTone className="mx-1" />
            <Box flexGrow={1}> Удалить</Box>
        </Stack>
    </MenuItem>,

    <MenuItem
        key={"delete_" + row.original.name}
        onClick={() => {
            console.clear();
            console.info("player: ", row.original);
            closeMenu();
        }}
    >
        <Stack direction={"row"} width={"100%"} gap={2}>
            <ShareTwoTone /> Консоль
        </Stack>
    </MenuItem>,
];
const openDeleteConfirmModal = async (row: MRT_Row<PrismaPlayer_>) => {
    if (window.confirm(`Уверены что хотите удалить ${row.original.name}`)) {
        await deletePlayer({ id: row.original.id });
    }
};
async function handleDeletePlayer({ player_id }: { player_id: number }) {
    if (window.confirm(`Уверены что хотите удалить игрока?`)) {
        await deletePlayer({ id: player_id });
    }
}

export function PlayerControlDetail({
    row,
    table,
}: {
    row: MRT_Row<PrismaPlayer_>;
    table: MRT_TableInstance<PrismaPlayer_>;
}) {
    const { original } = row;
    // const { _count, events, profile, ticket, name } = original;
    const tt = useTicket();
    const [limit, setLimit] = useState(10);
    return (
        <Box
            sx={{
                display: "flex",
                gap: ".5rem",
                border: "1px solid",
                width: "100%",
                flexGrow: 1,
                p: 1,
            }}
        >
            <ButtonGroup variant="contained">
                <Button
                    variant="contained"
                    onClick={async () =>
                        await tt.openTicket(original, { limit })
                    }
                    startIcon={
                        <Icon path={mdiFileCertificateOutline} size={1} />
                    }
                >
                    открыть абонемент
                </Button>
                <ToggleButtonGroup
                    value={limit}
                    exclusive
                    onChange={(e, value) => setLimit(value)}
                    sx={{
                        [`& .Mui-selected`]: {
                            bgcolor: "#be470f",
                        },
                    }}
                >
                    <ToggleButton value={2} selected={limit === 2}>
                        2
                    </ToggleButton>
                    <ToggleButton value={5} selected={limit === 5}>
                        5
                    </ToggleButton>
                    <ToggleButton value={10} selected={limit === 10}>
                        10
                    </ToggleButton>
                </ToggleButtonGroup>
            </ButtonGroup>
            <Button
                variant="contained"
                color="error"
                onClick={async () => await tt.removeTicket(original)}
                endIcon={<Icon path={mdiFileRemoveOutline} size={1} />}
            >
                закрыть
            </Button>
        </Box>
    );
}
