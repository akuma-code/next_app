'use client'
import { MRT_TableOptions } from "material-react-table";
import { EventDto } from "./Avangard/MRTEvents";
import { PrismaPlayer } from "@/Types";
import { MRT_Localization_RU } from "material-react-table/locales/ru";

export const mrt_event_options: Partial<MRT_TableOptions<EventDto>> = {
    layoutMode: "grid",
    enableColumnFilters: true,
    enableGlobalFilter: true,
    enablePagination: false,
    enableRowNumbers: true,
    initialState: {
        density: "compact",
        columnVisibility: {
            id: false,
        },
    },
    state: {
        columnOrder: [
            "mrt-row-select",
            "mrt-row-expand",
            "mrt-row-numbers",
            // "mrt-row-actions",
        ],
    },
    muiTableContainerProps: {
        sx: { maxHeight: "60vh", },
    },
    muiTableBodyProps: { sx: { border: '1px solid whitesmoke' } },
    muiTablePaperProps: {
        elevation: 4,
        variant: "elevation"
    },
    muiTableHeadCellProps: {
        align: 'left',

    },

    muiTableBodyRowProps: {
        hover: true,
        sx: { borderTop: '1px solid whitesmoke' }

    },
    defaultColumn: {
        muiTableBodyCellProps: {
            align: "left",
        },
        muiTableHeadCellProps: {
            align: "left",
            sx: {

                border: '1px solid whitesmoke',
                display: 'flex',
                justifyContent: 'space-between'
            }
        },
    },
    defaultDisplayColumn: {
        muiTableBodyCellProps: {
            align: "center",
        },
        muiTableHeadCellProps: {
            align: 'center',
            sx: { border: '1px solid whitesmoke', }
        }
    },

}

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
}