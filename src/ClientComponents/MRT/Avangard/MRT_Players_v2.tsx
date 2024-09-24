"use client";
import { useTicket } from "@/Hooks/MRT/Ticket/useTicket";
import {
    MRT_Player,
    useMRTPlayers,
    useMRTPlayersSelect,
} from "@/Hooks/useGetEventPlayers";
import { reSyncPlayers } from "@/Services/events/db_event";
import {
    CreateNewPlayer,
    deletePlayer,
    EditPlayer,
} from "@/Services/playerService";
import { PrismaPlayer_ } from "@/Types";
import {
    LiteralUnion,
    MaterialReactTable,
    MRT_EditActionButtons,
    MRT_Row,
    MRT_TableInstance,
    MRT_TableOptions,
    useMaterialReactTable,
    // createRow,
    type MRT_ColumnDef,
} from "material-react-table";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
    mrt_players_options,
    mrt_players_options_v2,
} from "../mrt.config.players";
import Icon from "@mdi/react";
import {
    mdiAccountPlusOutline,
    mdiDatabaseSyncOutline,
    mdiStickerCheck,
    mdiStickerRemove,
    mdiStickerRemoveOutline,
    mdiTicketPercentOutline,
} from "@mdi/js";
import { Alert, Button, ButtonGroup } from "@mui/material";

async function update_database() {
    return await reSyncPlayers();
}

const MRT_Players_v2 = () => {
    const {
        data = [],
        isLoading,
        error,
        isSuccess,
        isError,
    } = useMRTPlayersSelect();
    const [errors, setErrors] = useState<Record<string, string | undefined>>(
        {}
    );

    const COLS: MRT_ColumnDef<MRT_Player>[] = useMemo(
        () =>
            [
                {
                    header: "Имя игрока",
                    accessorKey: "name",
                    grow: 1,
                    minSize: 250,
                    muiTableHeadCellProps: {
                        align: "center",
                    },
                },
                {
                    header: "Кол-во тренировок",
                    accessorKey: "events_count",
                    Edit: () => null,
                    // minSize: 150,
                    grow: 1,
                    muiTableHeadCellProps: {
                        align: "center",
                    },
                    muiTableBodyCellProps: {
                        align: "center",
                    },
                },
                {
                    Header: () => (
                        <Icon
                            path={mdiTicketPercentOutline}
                            size={1.5}
                            className="m-1"
                        />
                    ),
                    accessorKey: "hasTicket",
                    columnDefType: "display",
                    maxSize: 100,
                    grow: 0,
                    muiTableHeadCellProps: {
                        align: "center",

                        // diplay: "flex",
                        sx: {
                            justifyItems: "center",
                            // border: "1px solid",
                            alignItems: "end",
                            alignSelf: "center",
                        },
                    },
                    muiTableBodyCellProps: {
                        align: "center",
                    },
                    Cell(props) {
                        return props.row.original.hasTicket ? (
                            <Icon
                                path={mdiStickerCheck}
                                size={1}
                                color={"#0b4210"}
                            />
                        ) : (
                            <Icon
                                path={mdiStickerRemove}
                                size={1}
                                color={"#f7910d"}
                            />
                        );
                    },
                    Edit: () => null,
                },
            ] as MRT_ColumnDef<MRT_Player>[],
        []
    );

    const table = useMaterialReactTable({
        ...mrt_players_options_v2,
        layoutMode: "grid",
        columns: COLS,
        data,
        enableColumnResizing: true,
        enableStickyHeader: true,
        muiTableContainerProps: {
            sx: {
                maxHeight: "65vh",
                // maxWidth: 700,
            },
        },
        state: {
            // rowSelection,
            isLoading: isLoading,
            isSaving: isLoading,
            showAlertBanner: isError,
            columnOrder: [
                "mrt-row-select",
                "mrt-row-expand",
                "mrt-row-numbers",
                "mrt-row-actions",
                "name",
                "events_count",
                "hasTicket",
            ],
        },
        muiToolbarAlertBannerProps: isError
            ? {
                  color: "error",
                  children: "Ошибка загрузки данных!",
              }
            : undefined,

        renderTopToolbarCustomActions(props) {
            const { table } = props;
            return (
                <ButtonGroup color="secondary" sx={{ m: 2 }} size="small">
                    <Button
                        variant="contained"
                        onClick={() => table.setCreatingRow(true)}
                        startIcon={
                            <Icon path={mdiAccountPlusOutline} size={1} />
                        }
                    >
                        Добавить игрока
                    </Button>
                    <Button
                        variant="contained"
                        color={"warning"}
                        onClick={update_database}
                        startIcon={
                            <Icon path={mdiDatabaseSyncOutline} size={1} />
                        }
                    >
                        Sync
                    </Button>
                </ButtonGroup>
            );
        },
    });
    useEffect(() => {
        if (isError) setErrors({ message: error.message });
        return () => setErrors({});
    }, [error, isError]);
    return <MaterialReactTable table={table} />;
};

export default MRT_Players_v2;
