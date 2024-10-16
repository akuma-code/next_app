"use client";

import MonthPicker from "@/ClientComponents/UI/Filters/MonthPicker";
import { mdiHuman, mdiPaletteAdvanced, mdiTableTennis } from "@mdi/js";
import Icon from "@mdi/react";
import { EditTwoTone } from "@mui/icons-material";
import { alpha, Box, Button, Chip, Grid, MenuItem, Stack } from "@mui/material";
import dayjs from "dayjs";
import {
    MaterialReactTable,
    MRT_ColumnDef,
    MRT_Row,
    MRT_TableInstance,
    useMaterialReactTable,
} from "material-react-table";
import { useRouter, useSearchParams } from "next/navigation";
import { mrt_event_options } from "../mrt.config";
// import { getOnePlayer } from "@/";
import { EventCreateCard } from "@/Components/EventView/EventCreateCard";
import { memo, useMemo, useState } from "react";
import DoubleChip from "./DoubleChip";
import { Prisma } from "@prisma/client";
import { updateEventTitle } from "@/Services/events/utils";

export interface EventDto_ {
    id: number;
    date_formated: string;
    title?: string | null;
    players: { id: number; name: string }[];
    pairs?: {
        id: number;
        firstPlayerId: number;
        secondPlayerId: number;
    }[];
    isDraft?: boolean;
}
export type EventDto = Prisma.EventGetPayload<{
    select: {
        id: true;
        date_formated: true;
        players: { select: { id: true; name: true; ticket: true } };
        pairs: true;
        cost: true;
        title: true;
        _count: { select: { players: true } };
    };
}>;
export type EventDto2_ = Prisma.EventGetPayload<{
    select: {
        id: true;
        date_formated: true;
        players: { select: { id: true; name: true; ticket: true } };
        pairs: true;
        cost: true;
        title: true;
        _count: { select: { players: true } };
        isDraft: true;
    };
}>;
export interface EventDto2 {
    id: number;
    date_formated: string;
    title?: string | null;
    cost?: number | null;
    players: { id: number; name: string }[];
    pairs?: {
        id?: number;
        master: string;
        player: string;
        firstPlayerId?: number;
        secondPlayerId?: number;
        masterId?: number;
        playerId?: number;
    }[];
    isDraft?: boolean;
}
const event_columns: MRT_ColumnDef<EventDto2>[] = [
    {
        accessorKey: "id",
        header: "ID",
        size: 100,
        muiTableBodyCellProps: {
            align: "center",
            sx: { border: "1px solid whitesmoke" },
        },
    },
    {
        accessorKey: "title",
        header: "Название",
    },
    {
        accessorKey: "date_formated",
        header: "Дата",
        Cell({ renderedCellValue }) {
            return dayjs(
                renderedCellValue?.toString(),
                "YYYY-MM-DD",
                "ru"
            ).format("DD.MM.YYYY");
        },
        muiTableHeadCellProps: { align: "center" },
        size: 150,
        muiTableBodyCellProps: {
            align: "center",
            sx: {
                border: "1px solid whitesmoke",
                bgcolor: alpha("#569ef1", 0.7),
            },
        },
    },

    {
        accessorKey: "players",
        header: "Всего",
        maxSize: 200,
        grow: 1,
        Cell({ row }) {
            const { original } = row;
            const _p = playersMap(original);

            return (
                <Grid
                    container
                    gridTemplateColumns={5}
                    direction={"row"}
                    md={15}
                    spacing={0.5}
                >
                    {/* {_p.names.map((n) => (
                        <Grid item key={n} md={3}>
                            <Typography variant="caption">{n} </Typography>
                        </Grid>
                    ))} */}
                    <Grid
                        item
                        md={18}
                        textAlign={"center"}
                        // sx={{ bgcolor: "secondary.dark" }}
                    >
                        {_p.total}
                    </Grid>
                </Grid>
            );
        },
        muiTableHeadCellProps: {
            align: "center",
            sx: { border: "1px solid whitesmoke" },
        },
        muiTableBodyCellProps: {
            sx: {
                border: "1px solid whitesmoke",
                bgcolor: alpha("#569ef1", 0.9),
            },
        },
    },
] as const;

export function MRTEvent({ events }: { events: EventDto2[] }) {
    const q = useSearchParams();
    const current = q.get("month");
    const _month = dayjs(current, "MM", "ru");
    const router = useRouter();
    const cols = useMemo(() => event_columns, []);
    // .format("MMMM");
    // const Pairs = eventsCache().then((res) => res.pairs);

    // console.log("🚀 ~ MRTEvent ~ Pairs:", Pairs);
    const rename = updateEventTitle.bind(null);
    const table = useMaterialReactTable({
        ...mrt_event_options,
        columns: cols,
        data: events,
        enableRowActions: true,
        enableExpanding: true,
        enableExpandAll: false,
        enableRowSelection: false,
        muiTableBodyRowProps: ({ row, staticRowIndex, table }) => ({
            onClick: (event) =>
                !row.getIsExpanded() &&
                table.setExpanded({ [row.id]: !row.getIsExpanded() }),

            sx: {
                // cursor: row.getIsExpanded() ? "pointer" : "default",
                bgcolor: row.getIsExpanded() ? "warning.main" : "inherit",
            },
        }),
        mrtTheme(theme) {
            return {
                baseBackgroundColor: theme.palette.secondary.light,
                selectedRowBackgroundColor: theme.palette.primary.light,
                menuBackgroundColor: "#569ef1",
            };
        },
        renderBottomToolbar() {
            return (
                <Box
                    p={1}
                    justifyContent={"space-around"}
                    display={"flex"}
                    gap={2}
                    alignItems={"center"}
                >
                    {current ? (
                        `Выбран:  ${dayjs(_month, "ru").format("MMMM")}`
                    ) : (
                        <div></div>
                    )}
                    <MonthPicker />
                </Box>
            );
        },
        renderTopToolbarCustomActions({ table }) {
            return (
                <>
                    <Button
                        color="info"
                        variant="contained"
                        size="small"
                        onClick={() => table.setCreatingRow(true)}
                    >
                        Новая тренировка
                    </Button>
                    <Button
                        color="info"
                        variant="contained"
                        size="small"
                        onClick={async () => rename()}
                    >
                        Переименовать
                    </Button>
                </>
            );
        },
        renderRowActionMenuItems: ({ closeMenu, row }) => [
            <MenuItem divider key={0} onClick={closeMenu}>
                <Stack direction={"row"} width={"100%"} gap={2}>
                    <EditTwoTone className="mx-1" />
                    <Box flexGrow={1}> Изменить</Box>
                </Stack>
            </MenuItem>,
            <MenuItem
                key={1}
                onClick={async () =>
                    alert(await showInfo(row.original).finally(closeMenu))
                }
            >
                <Stack direction={"row"} width={"100%"} gap={2}>
                    <Icon path={mdiPaletteAdvanced} size={1} />
                    Инфо
                </Stack>
            </MenuItem>,
            <MenuItem
                key={2}
                onClick={() => {
                    router.push(`/avangard/events/${row.original.id}`);
                    closeMenu();
                }}
            >
                <Stack direction={"row"} width={"100%"} gap={2}>
                    <Icon path={mdiTableTennis} size={1} />
                    Перейти
                </Stack>
            </MenuItem>,
        ],
        muiExpandButtonProps: ({ row, table }) => ({
            onClick: () =>
                table.setExpanded({ [row.id]: !row.getIsExpanded() }), //set only this row to be expanded
        }),
        renderDetailPanel: EventDetailInfo,
        renderCreateRowDialogContent(props) {
            return <EventCreateCard />;
        },
        muiDetailPanelProps: {
            sx: { bgcolor: "secondary.light", pl: 2 },
        },
    });

    return <MaterialReactTable table={table} />;
}

function playersMap(props: { players: EventDto2["players"] }) {
    const { players } = props;

    const names = players.map((p) => p.name);
    const total = players.length;

    return { total, names };
}

function parseEvent(e?: EventDto) {
    if (!e) return null;
    const { total, names } = playersMap(e);

    return {
        total,
        names,
        pairs: e.pairs,
    };
}

interface EventParsedInfo {
    total: number;
    names: string[];
    pairs:
        | {
              masterId: number;
              playerId: number;
          }[]
        | undefined;
}
async function showInfo(e: EventDto2) {
    let info = parseEvent(e as unknown as EventDto);
    return JSON.stringify(info, null, 2);
}

function EventDetailInfo({
    row,
    table,
}: {
    row: MRT_Row<EventDto2>;
    table: MRT_TableInstance<EventDto2>;
}) {
    const enabled = row.getIsExpanded();
    const event = row.original;
    const info = useMemo(
        () => parseEvent(event as unknown as EventDto),
        [event]
    );
    // const pp = usePairs(event.id, enabled);
    const _pairs = info?.pairs as EventDto2["pairs"];
    const hasPair = (name: string) =>
        _pairs ? _pairs.map((p) => p.player).includes(name) : false;

    const pairId = (PP: string) =>
        _pairs?.find((p) => p.player === PP)?.id ?? null;
    return (
        <Box>
            <Grid container columns={12}>
                <Grid item md={6}>
                    {" "}
                    Всего: {info?.total}, (C тренером: {info?.pairs?.length})
                </Grid>

                <Grid
                    // md={12}
                    container
                    item
                    wrap={"wrap"}
                    columnGap={1}
                    rowGap={2}
                    direction={"row"}
                    columns={10}
                >
                    {event.players
                        .sort((a, b) => (hasPair(a.name) ? 1 : -1))
                        .map((p) => (
                            <Grid
                                item
                                key={p.name}
                                md={1}
                                alignItems={"center"}
                                flexGrow={1}
                                // border={"1px solid"}
                            >
                                {hasPair(p.name) ? (
                                    <DoubleChip
                                        player={p}
                                        master={{
                                            name: _pairs?.find(
                                                (pp) => pp.player === p.name
                                            )?.master!,
                                        }}
                                        pairId={pairId(p.name) ?? undefined}
                                    />
                                ) : (
                                    <DoubleChip player={p} />
                                )}
                            </Grid>
                        ))}
                </Grid>
            </Grid>
        </Box>
    );
}

function PlayerChip(props: { name: string; variant?: "outlined" | "filled" }) {
    const [v, setV] = useState(props.variant || "outlined");
    return (
        <Chip
            variant={v}
            color="primary"
            label={props.name}
            icon={<Icon path={mdiHuman} size={0.8} />}
            size="small"
            clickable
            onClick={() =>
                setV((prev) => (prev === "outlined" ? "filled" : "outlined"))
            }
        />
    );
}
