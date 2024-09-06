"use client";
import { MRT_TableOptions } from "material-react-table";
import { EventDto, EventDto2 } from "./Avangard/MRTEvents";
import { PrismaPlayer, PrismaPlayer_ } from "@/Types";
import { MRT_Localization_RU } from "material-react-table/locales/ru";
import { mdiCodeTags, mdiCog, mdiFileSettings } from "@mdi/js";
import { Icon } from "@mdi/react";
import { Box } from "@mui/material";
export const mrt_event_options: Partial<MRT_TableOptions<EventDto2>> = {
    layoutMode: "grid",
    enableColumnFilters: true,
    enableGlobalFilter: true,
    enablePagination: false,
    enableRowNumbers: true,
    localization: MRT_Localization_RU,
    initialState: {
        density: "compact",
    },
    state: {
        columnOrder: [
            "mrt-row-select",
            "mrt-row-expand",
            "mrt-row-numbers",
            "date_formated",
            "players",
            "title",
            "id",
            "mrt-row-actions",
        ],
    },
    muiTableContainerProps: {
        sx: { maxHeight: "60vh", maxWidth: 900 },
    },
    // muiTableBodyProps: { sx: { border: "1px solid whitesmoke" } },
    muiTablePaperProps: {
        elevation: 4,
        variant: "elevation",
    },
    muiTableHeadCellProps: {
        align: "left",
        sx: { border: "1px solid whitesmoke", borderCollapse: "collapse" },
    },

    // muiTableBodyRowProps: {
    //     hover: true,
    //     sx: {},
    // },
    defaultColumn: {
        muiTableBodyCellProps: {
            align: "left",
            sx: { border: "1px solid whitesmoke", borderCollapse: "collapse" },
        },
        muiTableHeadCellProps: {
            align: "left",
            sx: {
                border: "1px solid whitesmoke",
                borderCollapse: "collapse",
            },
        },
    },
    defaultDisplayColumn: {
        muiTableBodyCellProps: {
            align: "center",
            sx: { border: "1px solid whitesmoke" },
        },
        muiTableHeadCellProps: {
            align: "center",
            sx: { border: "1px solid whitesmoke" },
        },
    },
    displayColumnDefOptions: {
        "mrt-row-actions": {
            muiTableHeadCellProps: {
                align: "center",
                sx: { border: "1px solid whitesmoke" },
            },
            muiTableBodyCellProps: {
                align: "left",
                sx: { border: "1px solid whitesmoke" },
            },
            size: 80,
            Header: (props) => {
                return (
                    <Icon path={mdiCodeTags} size={1} aria-label="actions" />
                );
            },
            grow: 0,

            enableColumnActions: true,
        },
        "mrt-row-expand": {
            muiTableHeadCellProps: {
                align: "center",
                sx: { border: "1px solid whitesmoke", fontSize: 15 },
            },

            minSize: 100,
        },
    },
};

export const mrt_players_options: Partial<MRT_TableOptions<PrismaPlayer_>> = {
    muiTableContainerProps: {
        sx: {
            maxHeight: "62vh",
            maxWidth: "fit-content",
            border: "2px solid #00008b36",
        },
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
            size: 150,
            grow: 1,
        },
        "mrt-row-numbers": {
            muiTableHeadCellProps: {
                align: "center",
                sx: { borderRight: "1px solid", borderLeft: "1px solid" },
            },
            muiTableBodyCellProps: {
                align: "center",
                sx: { borderRight: "1px solid", borderLeft: "1px solid" },
            },
            size: 50,
        },
        "mrt-row-expand": {
            grow: 0,
        },
    },
    layoutMode: "grid",
    enablePagination: true,
    enableMultiRowSelection: true,
    enableRowSelection: true,
    enableCellActions: true,
    enableRowActions: true,
    editDisplayMode: "modal",
    enableRowNumbers: true,
    enableEditing: true,
    localization: MRT_Localization_RU,
    initialState: {
        columnVisibility: { id: false },
        pagination: {
            pageIndex: 0,
            pageSize: 10,
        },
        density: "comfortable",
    },
    state: {
        columnOrder: [
            "mrt-row-select",
            "mrt-row-numbers",
            "mrt-row-expand",
            "name",
            // "mrt-row-actions",
        ],
    },
};
