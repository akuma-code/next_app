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
    MRT_PaginationState,
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
    mdiHumanEdit,
    mdiInformationVariantCircleOutline,
    mdiStickerCheck,
    mdiStickerRemove,
    mdiStickerRemoveOutline,
    mdiTicketPercentOutline,
} from "@mdi/js";
import { Alert, Button, ButtonGroup, IconButton } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import TicketInfo from "@/Components/Modals/TicketInfo";

async function update_database() {
    return await reSyncPlayers();
}
//!           _______________________________
const MRT_Players_v2 = ({ preload }: { preload?: PrismaPlayer_[] }) => {
    //!  _______________________________
    const [pagination, setPage] = useState<MRT_PaginationState>({
        pageIndex: 0,
        pageSize: 30,
    });
    const {
        data = [],
        isLoading,
        error,
        isSuccess,
        isError,
    } = useMRTPlayersSelect(preload);

    const {
        data: updated_player,
        mutate: update_player,
        isError: isUpdateError,
        error: updateError,
        isPending,
    } = useUpdatePlayerMrt();
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
                    muiTableBodyCellProps: {
                        align: "right",
                    },
                    muiEditTextFieldProps: {
                        error: errors.name !== undefined,
                        helperText: errors.name,
                        onChange: (e) => {
                            const v = e.target.value;
                            if (v.length < 1) {
                                setErrors((e) => ({
                                    ...e,
                                    name: "Поле не должно быть пустым!",
                                }));
                            } else {
                                setErrors((prev) => ({
                                    ...prev,
                                    name: undefined,
                                }));
                            }
                        },
                        // onBlur: () => setErrors((prev) => ({})),
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
                    Header: (p) => (
                        <Icon
                            path={mdiTicketPercentOutline}
                            size={1.2}
                            {...p}
                            // className="m-1"
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
                        // return props.row.original.hasTicket ? (
                        return (
                            <Icon
                                path={
                                    props.row.original.hasTicket
                                        ? mdiStickerCheck
                                        : mdiStickerRemove
                                }
                                size={0.9}
                                color={
                                    props.row.original.hasTicket
                                        ? "#0b4210"
                                        : "#f7910d"
                                }
                            />
                        );
                    },
                    Edit: () => null,
                },
            ] as MRT_ColumnDef<MRT_Player>[],
        [errors]
    );

    const table = useMaterialReactTable({
        ...mrt_players_options_v2,
        layoutMode: "grid",
        columns: COLS,
        data,
        enableColumnResizing: true,
        enableStickyHeader: true,
        positionPagination: "top",
        positionToolbarAlertBanner: "head-overlay",
        muiTableContainerProps: {
            sx: {
                maxHeight: "60vh",
                // maxWidth: 700,
            },
        },
        muiTopToolbarProps: {
            justifyContent: "start",
        },
        initialState: {
            density: "compact",
            // pagination: { pageSize: 50, pageIndex: 0 },
        },
        onPaginationChange: setPage,

        state: {
            // rowSelection,
            pagination,
            isLoading: isLoading,
            isSaving: isPending,
            showAlertBanner: isError || isUpdateError,
            showSkeletons: isLoading,
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
                  children: errors.query,
              }
            : undefined,

        // manualPagination: true,
        onEditingRowSave: (props) => {
            const { exitEditingMode, row, values } = props;
            const { name } = values;
            update_player({ id: row.original.id, name });
            exitEditingMode();
        },
        onEditingRowCancel(props) {
            setErrors({});
        },
        renderBottomToolbarCustomActions(props) {
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
                        Создать
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
        renderRowActions(props) {
            const { row, table } = props;
            return [
                // <MRT_EditActionButtons row={row} table={table} key={"edit"} />,

                <IconButton
                    key={"edit_" + row.id}
                    onClick={() => table.setEditingRow(row)}
                >
                    <Icon path={mdiHumanEdit} size={1} />
                </IconButton>,
                row.original.hasTicket ? (
                    <TicketInfo row={row} key="info" />
                ) : null,
            ];
        },
    });
    useEffect(() => {
        if (isError) setErrors({ query: error.message });
        if (isUpdateError) setErrors({ update: updateError.message });
        return () => setErrors({});
    }, [error, isError, isUpdateError, updateError]);
    return <MaterialReactTable table={table} />;
};

export function useUpdatePlayerMrt() {
    return useMutation({
        mutationKey: ["player", "update"],
        mutationFn: (payload: Partial<MRT_Player>) =>
            EditPlayer({
                where: { id: payload.id },
                data: { name: payload.name },
                select: { id: true, name: true },
            }),
        gcTime: 60 * 1000,
    });
}

export default MRT_Players_v2;
