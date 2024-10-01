"use client";
import { mdiCodeTags } from "@mdi/js";
import { Icon } from "@mdi/react";
import { MRT_TableOptions } from "material-react-table";
import { MRT_Localization_RU } from "material-react-table/locales/ru";
import { EventDto2 } from "./Avangard/MRTEvents";
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
