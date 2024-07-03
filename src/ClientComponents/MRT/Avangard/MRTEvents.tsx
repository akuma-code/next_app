"use client";

import MonthPicker from "@/ClientComponents/UI/Filters/MonthPicker";
import { _date } from "@/Helpers/dateFuncs";
import { Box, Button, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import {
    MaterialReactTable,
    MRT_ColumnDef,
    useMaterialReactTable,
} from "material-react-table";
import { mrt_event_options } from "../mrt.config";
export interface EventDto {
    id: number;
    date_formated: string;
    title?: string;
    players: { id: number; name: string }[];
    pairs?: {
        firstPlayerId: number;
        secondPlayerId: number;
    }[];
    isDraft?: boolean;
}
const event_columns: MRT_ColumnDef<EventDto>[] = [
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
];

export function MRTEvent({ events }: { events: EventDto[] }) {
    const table = useMaterialReactTable({
        ...mrt_event_options,
        columns: event_columns,
        data: events,

        mrtTheme(theme) {
            return {
                baseBackgroundColor: theme.palette.secondary.light,
                selectedRowBackgroundColor: theme.palette.primary.main,
                menuBackgroundColor: "#569ef1",
            };
        },
        renderBottomToolbar() {
            return (
                <Box p={1} justifyContent={"right"} display={"flex"}>
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
                    New Event
                </Button>
            );
        },
    });

    return <MaterialReactTable table={table} />;
}

function playersMap(props: { players: EventDto["players"] }) {
    const { players } = props;

    const names = players.map((p) => p.name);
    const total = players.length;

    return { total, names };
}
