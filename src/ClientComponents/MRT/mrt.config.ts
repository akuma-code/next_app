'use client'
import { MRT_TableOptions } from "material-react-table";
import { EventDto } from "./Avangard/MRTEvents";

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