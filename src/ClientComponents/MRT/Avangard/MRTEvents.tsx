"use client";

import MonthPicker from "@/ClientComponents/UI/Filters/MonthPicker";
import { _date } from "@/Helpers/dateFuncs";
import { Box, Button, Grid, MenuItem, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import {
    MaterialReactTable,
    MRT_ColumnDef,
    MRT_Row,
    MRT_TableInstance,
    useMaterialReactTable,
} from "material-react-table";
import { mrt_event_options } from "../mrt.config";
import { EditTwoTone } from "@mui/icons-material";
import { useSearchParams } from "next/navigation";
import Icon from "@mdi/react";
import { mdiPaletteAdvanced, mdiSetSquare } from "@mdi/js";
import { getOnePlayer } from "@/Services/playerService";
import { getMasters } from "@/Services/masterService";
import { useMemo } from "react";
import { useMasters } from "@/Hooks/Queries/useMasters";
export interface EventDto {
    id: number;
    date_formated: string;
    title?: string | null;
    players: { id: number; name: string }[];
    pairs?: {
        firstPlayerId: number;
        secondPlayerId: number;
    }[];
    isDraft?: boolean;
}
export interface EventDto2 {
    id: number;
    date_formated: string;
    title?: string | null;
    players: { id: number; name: string }[];
    pairs?: {
        master: string;
        player: string;
    }[];
    isDraft?: boolean;
}
const event_columns: MRT_ColumnDef<EventDto2>[] = [
    {
        accessorKey: "id",
        header: "ID",
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
                "DD_MM_YYYY",
                "ru"
            ).format("DD MMMM");
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
    },
] as const;

export function MRTEvent({ events }: { events: EventDto2[] }) {
    const q = useSearchParams();
    const current = q.get("month");
    const _month = dayjs(current, "MM", "ru");
    // .format("MMMM");

    const table = useMaterialReactTable({
        ...mrt_event_options,
        columns: event_columns,
        data: events,
        enableRowActions: true,
        enableExpanding: true,
        enableExpandAll: false,
        mrtTheme(theme) {
            return {
                baseBackgroundColor: theme.palette.secondary.light,
                selectedRowBackgroundColor: theme.palette.primary.main,
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
                <Button
                    color="info"
                    variant="contained"
                    size="small"
                    onClick={() => table.setCreatingRow(true)}
                >
                    Новая тренировка
                </Button>
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
                onClick={async () => alert(await showInfo(row.original))}
            >
                <Stack direction={"row"} width={"100%"} gap={2}>
                    <Icon path={mdiPaletteAdvanced} size={1} />
                    Инфо
                </Stack>
            </MenuItem>,
        ],
        muiExpandButtonProps: ({ row, table }) => ({
            onClick: () =>
                table.setExpanded({ [row.id]: !row.getIsExpanded() }), //set only this row to be expanded
        }),
        renderDetailPanel: EventDetailInfo,
        muiDetailPanelProps: {
            sx: { bgcolor: "#ff7a7a", pl: 4 },
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
    // const masters = useMasters();
    // masters.then(r=>r);
    const _pairs = e.pairs ?? [];
    // const master = (id: number) =>
    //     masters.then((r) => r.find((m) => m.id === id)?.name);
    // const player = (id: number) =>
    //     e.players.find((p) => p.id === id) || { name: "Not found" };
    // const pairs = _pairs.map((p) => ({
    //     master: master(p.firstPlayerId),
    //     player: player(p.secondPlayerId).name,
    // }));

    return {
        total,
        names,
        // pairs: _pairs.map((pa) => ({
        //     masterId: pa.firstPlayerId,
        //     playerId: pa.secondPlayerId,
        // })),
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
    let info = parseEvent(e as EventDto);
    return JSON.stringify(info, null, 2);
}

function EventDetailInfo({
    row,
    table,
}: {
    row: MRT_Row<EventDto2>;
    table: MRT_TableInstance<EventDto2>;
}) {
    const event = row.original;
    const info = useMemo(() => parseEvent(event as EventDto), [event]);
    const _pairs = info?.pairs as EventDto2["pairs"];
    return (
        <Box>
            Всего: <br /> {info?.total} + с тренером {info?.pairs?.length}{" "}
            <br />
            Игроки: <br />
            {info?.names.join(", ")} <br />
            Пары:{" "}
            {_pairs?.map((p) => {
                return (
                    <Box fontFamily={"Fira Code"}>
                        {p.master} =&gt; {p.player}
                        <br />
                    </Box>
                );
            })}
        </Box>
    );
}
