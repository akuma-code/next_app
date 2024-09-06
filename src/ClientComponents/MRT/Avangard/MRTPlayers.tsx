"use client";
import { monthReducer } from "@/Helpers/eventsMonthParser";
import { useToggle } from "@/Hooks/useToggle";
import { deletePlayer } from "@/Services/playerService";
import { PrismaPlayer, PrismaPlayer_ } from "@/Types";
import { mdiSigma, mdiTicketConfirmationOutline } from "@mdi/js";
import Icon from "@mdi/react";
import {
    AccountCircleTwoTone,
    DeleteTwoTone,
    EditTwoTone,
    ShareTwoTone,
} from "@mui/icons-material";
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    Grid,
    MenuItem,
    Stack,
    TextField,
} from "@mui/material";
import { Prisma } from "@prisma/client";
import {
    MaterialReactTable,
    MRT_Row,
    MRT_RowSelectionState,
    useMaterialReactTable,
    // createRow,
    type MRT_ColumnDef,
} from "material-react-table";
import { mrt_players_options } from "../mrt.config";
import { TicketGauge } from "@/ClientComponents/UI/Charts/Gauge/TicketGauge";
import { Gauge, gaugeClasses } from "@mui/x-charts";
import { CGauge } from "@/app/admin/players/_gauge";
import { useState } from "react";
import { createTicketForPlayer } from "@/Services/tickets/ticketActions";

export type PLAYER = Prisma.$PlayerPayload["scalars"];
type EVENT = Prisma.$EventPayload["scalars"];

// {
//     info: Prisma.$InfoPayload["scalars"] | null;
//     events: Prisma.$EventPayload["scalars"] | null;
//     profile: Prisma.$ProfilePayload["scalars"] | null;
//     _count?: { events: number };
// };

const player_columns: MRT_ColumnDef<PrismaPlayer_>[] = [
    {
        accessorKey: "id",
        header: "ID",
        grow: 0,
        maxSize: 100,
        enableEditing: false,
    },
    {
        accessorKey: "name",
        header: "Игрок",
        grow: 0,
        minSize: 220,
        editVariant: "text",
        // Cell({ row }) {
        //     const { id, name } = row.original;
        //     return (
        //         <Stack
        //             direction={"row"}
        //             // gap={2}
        //             flexGrow={1}
        //             justifyContent={"space-between"}
        //             flexWrap={"nowrap"}
        //         >
        //             <div>{name}</div>
        //             <div>
        //                 <code>[id: {id}]</code>
        //             </div>
        //         </Stack>
        //     );
        // },
        muiTableBodyCellProps: {
            align: "left",
        },
    },
    {
        accessorKey: "_count.events",
        header: "Посещений",
        grow: 0,
        maxSize: 150,
        // Header: ({ column }) => (
        //     <Icon
        //         path={mdiSigma}
        //         size={1}
        //         title={"Посещений всего"}
        //         id={column.id}
        //     />
        // ),
        muiTableBodyCellProps: {
            align: "center",
        },
        muiTableHeadCellProps: {
            align: "center",
        },
    },

    {
        accessorKey: "ticket",
        header: "rest",
        muiTableBodyCellProps: {
            align: "center",
        },
        size: 100,
        Cell({ row }) {
            if (!row.original.ticket) return null;
            const { amount, limit } = row.original.ticket;

            return `${amount}/${limit}`;
            // <CGauge
            //     height={80}
            //     width={80}
            //     value={amount}
            //     valueMax={limit}
            //     startAngle={0}
            //     endAngle={(360 / limit) * amount}
            //     sx={{
            //         p: 0,
            //         m: 0,
            //         [`& .${gaugeClasses.valueText}`]: {
            //             fontSize: 12,
            //             transform: "translate(0px, 0px)",
            //         },
            //     }}
            //     text={({ value, valueMax }) =>
            //         `${value?.toString()} / ${valueMax?.toString()}`
            //     }
            // />
        },
    },
    {
        accessorKey: "ticket.amount",
        header: "Статус",
        Cell: ({ row }) => (row.original.ticket ? `Абонемент` : "Фактический"),
    },
];
export function MRTPlayers({ players }: { players: PrismaPlayer_[] }) {
    const [open, c] = useToggle();
    const [selected_player, select] = useState<PrismaPlayer_ | null>(null);
    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
    const table = useMaterialReactTable({
        columns: player_columns,
        data: players,
        ...mrt_players_options,
        renderDetailPanel: PlayerDetail,
        renderEditRowDialogContent(props) {
            const { row, internalEditComponents, table } = props;

            return internalEditComponents[1];
        },
        getRowId: (row) => row.id.toString(),
        onRowSelectionChange: setRowSelection,
        state: {
            rowSelection,
            columnOrder: [
                "mrt-row-select",
                "mrt-row-numbers",
                "mrt-row-expand",
                "name",
                // "mrt-row-actions",
            ],
        },
        renderRowActionMenuItems: ({ closeMenu, row }) => [
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
                    <AccountCircleTwoTone />{" "}
                    <span className="mp-1"> Профиль</span>
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
                    await addTicket(row.original.id, 10);
                    // c.toggle();
                    closeMenu();
                }}
            >
                <Stack direction={"row"} width={"100%"} gap={2}>
                    <Icon path={mdiTicketConfirmationOutline} size={1} />
                    Абонемент
                </Stack>
            </MenuItem>,
        ],
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
            <DialogContent></DialogContent>
        </Dialog>
    );
}

export function PlayerDetail({ row }: { row: MRT_Row<PrismaPlayer_> }) {
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
