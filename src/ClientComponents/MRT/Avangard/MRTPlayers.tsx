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
import { mdiTicketConfirmationOutline } from "@mdi/js";
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
    Tooltip,
} from "@mui/material";
import {
    LiteralUnion,
    MaterialReactTable,
    MRT_EditActionButtons,
    MRT_Row,
    MRT_RowSelectionState,
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
        enableEditing: false,
        minSize: 100,
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
        // accessorFn(originalRow) {
        //     return originalRow.ticket
        //         ? originalRow.ticket.amount.toString()
        //         : "";
        // },
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
    const openDeleteConfirmModal = async (row: MRT_Row<PrismaPlayer_>) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            await deletePlayer({ id: row.original.id });
        }
    };
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
            await EditPlayer({ where: { id }, data: { name } });
            table.setEditingRow(null); //exit editing mode
        };

    const table = useMaterialReactTable({
        columns: player_columns,
        data: players,
        ...mrt_players_options,
        state: {
            // rowSelection,

            columnOrder: [
                "mrt-row-select",
                "mrt-row-numbers",
                "mrt-row-expand",
                "mrt-row-actions",
                "name",
            ],
        },
        renderDetailPanel: PlayerControlDetail,
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
                            color="error"
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
                <ButtonGroup color="secondary" sx={{ gap: 1 }} size="small">
                    <Button
                        variant="contained"
                        onClick={() => table.setCreatingRow(true)}
                        disabled={isPending}
                    >
                        Добавить игрока
                    </Button>
                    <Button variant="contained">Дабавить абонемент</Button>
                    <Button
                        variant="contained"
                        color={"info"}
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
        // getRowId: (row) => `${row.id}`,

        // renderRowActionMenuItems: RowActionMenu,
    });

    return (
        <>
            <EditTicketDialog
                open={open}
                onClose={c.off}
                selected_player={selected_player}
            />
            <MaterialReactTable table={table} />
        </>
    );
}

const RowActionMenu = ({
    closeMenu,
    row,
}: {
    closeMenu: () => void;
    row: MRT_Row<PrismaPlayer_>;
}) => [
    <MenuItem divider key={0}>
        <Stack direction={"row"} width={"100%"} gap={2}>
            <EditTwoTone className="mx-1" />
            <Box flexGrow={1}> Изменить</Box>
        </Stack>
    </MenuItem>,

    <MenuItem
        divider
        key={1}
        onClick={async () =>
            await handleDeletePlayer({
                player_id: row.original.id,
            }).finally(() => closeMenu())
        }
    >
        <Stack direction={"row"} width={"100%"} gap={2}>
            <DeleteTwoTone className="mx-1" />
            <Box flexGrow={1}> Удалить</Box>
        </Stack>
    </MenuItem>,

    <MenuItem key={2}>
        <Stack direction={"row"} width={"100%"} gap={2}>
            <AccountCircleTwoTone /> <span className="mp-1"> Профиль</span>
        </Stack>
    </MenuItem>,

    <MenuItem
        key={3}
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

    <MenuItem
        key={4}
        onClick={async () => {
            closeMenu();
        }}
    >
        <Stack direction={"row"} width={"100%"} gap={2}>
            <Icon path={mdiTicketConfirmationOutline} size={1} />
            Абонемент
        </Stack>
    </MenuItem>,
];

async function handleDeletePlayer({ player_id }: { player_id: number }) {
    await deletePlayer({ id: player_id });
}
async function addTicket(id: number, limit = 10) {
    const t = await createTicketForPlayer({
        playerId: id,
        new_ticket: { amount: 10, limit, eAt: "2024-12-31" },
    });
    console.table(t);
    return t;
}
export function EditTicketDialog({
    open,
    onClose,
    selected_player,
}: {
    open: boolean;
    onClose: () => void;
    selected_player: PrismaPlayer_ | null;
}) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogContent>{selected_player?.name}</DialogContent>
        </Dialog>
    );
}

export function PlayerControlDetail({ row }: { row: MRT_Row<PrismaPlayer_> }) {
    const { original } = row;
    const { _count, events, profile, ticket, name } = original;

    return (
        <Box border={"1px solid"} key={row.id}>
            <Grid2 container columns={12} spacing={1}></Grid2>
        </Box>
    );
}

export function PlayerEventsDetail({ row }: { row: MRT_Row<PrismaPlayer_> }) {
    const [open, { toggle }] = useToggle(true);
    const { original } = row;
    const { _count, events, profile, ticket, name } = original;
    const _det = monthReducer(events);
    if (!_det) return null;
    const { year, months, days } = _det;

    const months_array = Object.entries(months).map(([m, c]) => ({
        month: m,
        count: c,
    }));
    const days_array = Object.entries(days).map(([m, c]) => ({
        month: m,
        dates: c,
    }));
    // console.log(days_array);
    return (
        <Grid container>
            <Grid
                item
                container
                gridRow={4}
                columnGap={0}
                gap={1}
                sx={{
                    [`& .MuiGrid-item`]: {
                        border: "1px solid grey",
                        p: 1,
                        alignItems: "center",
                        display: "flex",
                        // justifyContent: "space-between",
                        gap: 1,
                    },
                }}
            >
                {months_array.map((d, idx) => (
                    <Grid key={idx * 0.3} textAlign={"center"}>
                        <Grid item justifyContent={"center"}>
                            {d.month}
                        </Grid>
                        <Grid item justifyContent={"center"}>
                            {open ? d.count : days_array[idx].dates.join(", ")}
                        </Grid>
                    </Grid>
                ))}

                <Grid item direction={"column"}>
                    {/* <Grid ml={1} item> */}
                    <Grid justifyContent={"end"}>
                        <b>{year}</b>
                    </Grid>
                    <Grid>
                        <b> Итого: {_count.events}</b>
                    </Grid>
                </Grid>
                {/* </Grid> */}
            </Grid>

            <Grid item>
                <Button onClick={toggle} variant="outlined">
                    Даты / Кол-во
                </Button>
            </Grid>
        </Grid>
    );
}
