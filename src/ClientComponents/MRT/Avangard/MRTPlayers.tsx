"use client";
import { EVResponse, PLResponse } from "@/Services/utils";
import { Prisma, UserRole } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import {
    MaterialReactTable,
    MRT_Row,
    useMaterialReactTable,
    // createRow,
    type MRT_ColumnDef,
    type MRT_TableOptions,
} from "material-react-table";
import { Suspense, useMemo } from "react";
import { RowProfileCard } from "../Profile/UserProfileCard";
import { Box, Button, Grid, MenuItem, Stack, Typography } from "@mui/material";
import {
    DeleteTwoTone,
    AccountCircleTwoTone,
    ShareTwoTone,
    EditTwoTone,
} from "@mui/icons-material";
import router from "next/router";
import { deletePlayer } from "@/Services/playerService";
import { MRT_Localization_RU } from "material-react-table/locales/ru";
import dayjs from "dayjs";
import Icon from "@mdi/react";
import { mdiAccountSync, mdiSigma } from "@mdi/js";
import { MonthMiniTable } from "./MonthMiniTable";
import {
    getMonthNumberFromDate,
    handleEventOfPlayer,
    Month,
} from "@/Helpers/dateFuncs";
import { monthReducer } from "@/Helpers/eventsMonthParser";
import { _log } from "@/Helpers/helpersFns";
import { useToggle } from "@/Hooks/useToggle";

export type PLAYER = Prisma.$PlayerPayload["scalars"];
type EVENT = Prisma.$EventPayload["scalars"];

// {
//     info: Prisma.$InfoPayload["scalars"] | null;
//     events: Prisma.$EventPayload["scalars"] | null;
//     profile: Prisma.$ProfilePayload["scalars"] | null;
//     _count?: { events: number };
// };
type PrismaPlayer = {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    profileId: number | null;
    events?:
        | {
              id: number;
              date_formated: string;
              //   isDraft: boolean | null;
              //   title: string | null;
          }[]
        | [];
    info?: { uuid: string; rttf_score: number | null; playerId: number } | null;
    profile: {
        id: number;
        name: string | null;
        playerId: number | null;
        userId: number;
    } | null;
    _count: {
        events: number;
    };
};
const player_columns: MRT_ColumnDef<PrismaPlayer>[] = [
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
        grow: 1,
        minSize: 220,
        editVariant: "text",
        Cell({ row }) {
            const { id, name } = row.original;
            return (
                <Stack
                    direction={"row"}
                    // gap={2}
                    flexGrow={1}
                    justifyContent={"space-between"}
                    flexWrap={"nowrap"}
                >
                    <div>{name}</div>
                    <div>
                        <code>[id: {id}]</code>
                    </div>
                </Stack>
            );
        },
        muiTableBodyCellProps: {
            align: "left",
        },
    },
    {
        accessorKey: "_count.events",
        header: "Посещений",
        grow: 0,
        maxSize: 150,
        Header: () => (
            <Icon path={mdiSigma} size={1} title={"Посещений всего"} />
        ),
        muiTableBodyCellProps: {
            align: "center",
        },
        muiTableHeadCellProps: {
            align: "center",
        },
    },
];
export function MRTPlayers({ players }: { players: PrismaPlayer[] }) {
    const data = players.map((p) => ({ ...p, eventCount: p._count.events }));

    const table = useMaterialReactTable({
        columns: player_columns,
        data: players,
        muiTableContainerProps: {
            sx: { maxHeight: "60vh" },
        },
        defaultColumn: {
            muiTableBodyCellProps: {
                align: "left",
            },
        },
        defaultDisplayColumn: {
            muiTableBodyCellProps: {
                align: "left",
            },
        },
        displayColumnDefOptions: {
            "mrt-row-actions": {
                muiTableHeadCellProps: {
                    align: "left",
                },
                muiTableBodyCellProps: {
                    align: "left",
                },
                size: 100,
            },
        },
        layoutMode: "grid",
        enableMultiRowSelection: true,
        enableRowSelection: false,
        enableCellActions: true,
        enableRowActions: true,
        editDisplayMode: "row",
        enableRowNumbers: true,
        localization: MRT_Localization_RU,
        initialState: {
            columnVisibility: { id: false },
            pagination: {
                pageIndex: 0,
                pageSize: 50,
            },
            density: "compact",
        },
        state: {
            columnOrder: [
                "mrt-row-select",
                "mrt-row-expand",
                "mrt-row-numbers",
                // "mrt-row-actions",
            ],
        },
        // renderDetailPanel: ({ row }) => {
        //     const { original } = row;
        //     // const mnames = original?.events?.map(e => getMonthNumberFromDate(e.date_formated).month).map(n => Month[n]) ?? []
        //     // mnames.length > 0 && console.log(mnames)

        //     return (
        //         <Box
        //             width={"full"}
        //             flexGrow={1}
        //             textAlign={"right"}
        //             justifyContent={"space-around"}
        //             display={"flex"}
        //             flexDirection={"column"}
        //             gap={1}
        //         >
        //             <Typography textAlign={"right"}>
        //                 Создан:{" "}
        //                 {dayjs(original.createdAt.toString()).format(
        //                     "DD/MM/YYYY"
        //                 )}
        //             </Typography>
        //             <Typography textAlign={"right"}>
        //                 Посещений: {original._count.events}
        //             </Typography>
        //         </Box>
        //     );
        // },
        renderDetailPanel: PlayerDetail,
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
            <MenuItem
                key={2}
                // onClick={() => {
                //     router.push(pathname + `/profile/${row.original.id}`);
                //     closeMenu();
                // }}
            >
                <Stack direction={"row"} width={"100%"} gap={2}>
                    <AccountCircleTwoTone />{" "}
                    <span className="mp-1"> Профиль</span>
                </Stack>
            </MenuItem>,
            <MenuItem
                key={3}
                onClick={() => {
                    console.clear();
                    console.info("user: ", monthReducer(row.original.events));
                    closeMenu();
                }}
            >
                <Stack direction={"row"} width={"100%"} gap={2}>
                    <ShareTwoTone /> Консоль
                </Stack>
            </MenuItem>,
        ],
    });

    return <MaterialReactTable table={table} />;
}
async function handleDeletePlayer({ player_id }: { player_id: number }) {
    await deletePlayer({ id: player_id });
}

export function PlayerDetail({ row }: { row: MRT_Row<PrismaPlayer> }) {
    const [open, { toggle }] = useToggle(false);
    const { original } = row;
    const { _count, events, profile } = original;
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
    console.log(days_array);
    return (
        <Grid
            container
            gridRow={4}
            columnGap={0}
            rowGap={1}
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

            <Grid ml={1}>
                <Grid item justifyContent={"end"}>
                    <b>{year}</b>
                </Grid>
                <Grid item>
                    <b> Итого: {_count.events}</b>
                </Grid>
            </Grid>
            <Grid item>
                <Button onClick={toggle} variant="outlined">
                    Даты / Кол-во
                </Button>
            </Grid>
        </Grid>
    );
}
