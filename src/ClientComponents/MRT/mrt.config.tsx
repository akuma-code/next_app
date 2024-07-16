"use client";
import { MRT_TableOptions } from "material-react-table";
import { EventDto, EventDto2 } from "./Avangard/MRTEvents";
import { PrismaPlayer } from "@/Types";
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
                return <Icon path={ mdiCodeTags } size={ 1 } aria-label="actions" />;
            },

            enableColumnActions: false
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

export const mrt_players_options: Partial<MRT_TableOptions<PrismaPlayer>> = {
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
};
