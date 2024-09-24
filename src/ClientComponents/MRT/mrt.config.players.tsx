import { MRT_Player } from "@/Hooks/useGetEventPlayers";
import { PrismaPlayer_ } from "@/Types";
import { MRT_TableOptions } from "material-react-table";
import { MRT_Localization_RU } from "material-react-table/locales/ru";

export const mrt_players_options: Partial<MRT_TableOptions<PrismaPlayer_>> = {
    muiTableContainerProps: {
        sx: {
            // display: "flex",
            maxHeight: "65vh",
            // maxWidth: "md",
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
            minSize: 100,
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
            size: 10,
        },
        "mrt-row-expand": {
            grow: 0,
        },
    },
    layoutMode: "grid",
    enablePagination: true,
    enableMultiRowSelection: true,
    enableRowSelection: false,
    enableCellActions: true,
    enableRowActions: true,
    editDisplayMode: "row",
    enableRowNumbers: true,
    enableEditing: true,
    localization: MRT_Localization_RU,
    initialState: {
        // columnVisibility: { id: false },
        pagination: {
            pageIndex: 0,
            pageSize: 100,
        },
        density: "comfortable",
    },
};
export const mrt_players_options_v2: Partial<MRT_TableOptions<MRT_Player>> = {
    // muiTableProps: { width: 500 },
    defaultColumn: {
        muiTableBodyCellProps: {
            align: "left",
        },
        muiTableHeadCellProps: {
            align: "center",
            // sx: { border: "1px solid" },
        },
    },
    defaultDisplayColumn: {
        muiTableBodyCellProps: {
            align: "left",
        },
        muiTableHeadCellProps: {
            align: "center",
            // sx: { border: "1px solid" },
        },
    },
    displayColumnDefOptions: {
        "mrt-row-actions": {
            muiTableHeadCellProps: {
                align: "center",
            },
            muiTableBodyCellProps: {
                align: "left",
            },
            minSize: 100,
            // maxSize: 300,
            grow: 1,
        },
        "mrt-row-numbers": {
            muiTableHeadCellProps: {
                align: "center",
                // sx: { borderRight: "1px solid", borderLeft: "1px solid" },
            },
            muiTableBodyCellProps: {
                align: "center",
                // sx: { borderRight: "1px solid", borderLeft: "1px solid" },
            },
            size: 50,
        },
        "mrt-row-expand": {
            grow: 0,
        },
    },
    rowNumberDisplayMode: "original",
    enablePagination: true,
    enableMultiRowSelection: true,
    enableRowSelection: false,
    enableCellActions: true,
    enableRowActions: true,
    editDisplayMode: "modal",
    enableRowNumbers: true,
    enableEditing: true,
    localization: MRT_Localization_RU,
};
