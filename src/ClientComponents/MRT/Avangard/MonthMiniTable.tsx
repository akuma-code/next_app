"use client";

import dayjs from "dayjs";
import {
    MaterialReactTable,
    MRT_ColumnDef,
    useMaterialReactTable,
} from "material-react-table";

interface MonthTableData {
    mn: number;
    count: number;
}

const monthNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const monthColumns: MRT_ColumnDef<MonthTableData>[] = monthNumbers.map((n) => ({
    accessorFn: ({ mn }) => dayjs(mn).month().toString(),
    header: "M",
}));

export const MonthMiniTable = () => {
    const table = useMaterialReactTable({
        columns: monthColumns,
        data: [
            { mn: 0, count: 4 },
            { mn: 1, count: 3 },
        ],
        muiTableContainerProps: {
            sx: { maxWidth: 400 },
        },
    });

    return <MaterialReactTable table={table} />;
};
