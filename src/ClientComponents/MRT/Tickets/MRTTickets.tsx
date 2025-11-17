'use client'

import { _dbDateParser, _formated_date } from "@/Helpers/dateFuncs";
import { DTO_PwT, useEditTicket, useGetPlayersWithTickets, useTicketActions } from "@/Hooks/MRT/Ticket/useTicket";
import { useToggle } from "@/Hooks/useToggle";
import { deleteTicket } from "@/Services/tickets/ticketService";
import { mdiCheck, mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import { Delete, EditTwoTone, ExtensionOutlined } from "@mui/icons-material";
import { Box, Button, ButtonGroup, darken, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormLabel, ListItemIcon, MenuItem, TextField, useTheme } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Prisma } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import dayjs, { Dayjs } from "dayjs";
import { MaterialReactTable, MRT_ColumnDef, MRT_TableOptions, MRT_VisibilityState, useMaterialReactTable } from "material-react-table";
import { MRT_Localization_RU } from "material-react-table/locales/ru";
import { useMemo, useState } from "react";
import OpenTicketDialog from "./OpenTicketDialog";
export type Prisma_PlayerWithTicket = Prisma.PlayerGetPayload<{
    select: {
        id: true,
        name: true,
        ticket: true,
        events: { select: { date_formated: true } },
    }
}>



export function MRT_PlayersWithTicket({ preload }: { preload: Prisma_PlayerWithTicket[] }) {
    const [showExtend, ext] = useToggle(false)
    const [ticket_open, to_control] = useToggle(false);
    const [columnVisibility, setColumnVisibility] = useState<MRT_VisibilityState>({
        name: true,
        status: false,
        rest: true,
        countFrom: true,
        deposit: false,
        events_count: false,
        price: false,
    });
    const [player, setPlayer] = useState<DTO_PwT | null>(null);
    const query = useGetPlayersWithTickets()
    const { mutate: remove } = useDeleteTicket()
    const { mutateAsync: edit } = useEditTicket();

    const handleEditPlayer: MRT_TableOptions<DTO_PwT>['onEditingRowSave'] = async ({ row, values }) => {
        const { countFrom, price, deposit } = values
        await edit({ player_id: row.original.id, payload: { amount: +deposit, price: +price, countFromDate: countFrom } })

    }
    // const { mutate: extend } = useExtendTicket()
    const theme = useTheme();

    //light or dark green
    const baseBackgroundColor =
        theme.palette.mode === 'dark'
            ? 'rgba(3, 44, 43, 1)'
            : 'rgba(163, 238, 166, 1)';
    const COLS: MRT_ColumnDef<DTO_PwT>[] = useMemo(
        () => [
            // {
            //     id: 'actions',
            //     header: 'Действия',
            //     columnDefType: 'display', //turns off data column features like sorting, filtering, etc.
            //     enableColumnOrdering: true, //but you can turn back any of those features on if you want like this
            //     Cell: ({ row }) => (
            //         <Button onClick={ () => { } }>Send Email</Button>
            //     ),
            // },
            {
                // id: '1',
                header: 'Имя',
                accessorKey: "name",
                grow: 1,
                maxSize: 200,
                enableEditing: false,
                Cell({ row }) {
                    return row.original.status === 'open'
                        ? <Box sx={ { display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' } }>
                            { row.original.name }
                            <Icon path={ mdiCheck } size={ 1 } color={ 'green' } />
                        </Box>
                        : <Box sx={ { display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' } }>
                            { row.original.name }
                            <Icon path={ mdiClose } size={ 1 } color={ 'white' } />
                        </Box>
                }
            },
            {
                // id: '2',
                header: 'Статус',
                accessorKey: "status",
                grow: 1,
                Cell({ row }) {
                    return row.original.status === 'open'
                        ? <Icon path={ mdiCheck } size={ 1 } color={ 'green' } />
                        : <Icon path={ mdiClose } size={ 1 } color={ 'white' } />
                },
                enableEditing: false,
                muiTableBodyCellProps: {
                    align: 'center',
                    sx: {
                        borderRight: '1px solid black'
                    }
                },
                muiTableHeadCellProps: {
                    align: 'center',
                    sx: {
                        borderRight: '1px solid black'
                    }
                },
                // maxSize: 60,
                size: 40
            },
            {
                // id: '3',
                header: 'Осталось',
                accessorKey: "rest",
                maxSize: 100,
                enableEditing: false,
                grow: 1
            },
            {
                // id: '4',
                header: 'Дата начала',
                accessorKey: "countFrom",
                grow: 2,
                Cell({ row }) {
                    return _dbDateParser(row.original.countFrom).dd_mmmm
                },
            },
            {
                // id: '5',
                header: 'Депозит',
                accessorKey: "deposit",
                grow: 0,
                maxSize: 100
            },
            {
                // id: '6',
                header: 'Кол-во',
                accessorKey: "events_count",
                maxSize: 50,
                grow: 0,
                enableEditing: false,

            },
            {
                // id: '7',
                header: 'Цена',
                accessorKey: "price",
                grow: 0,
                maxSize: 100,

            },






        ] as MRT_ColumnDef<DTO_PwT>[], []
    )


    const table = useMaterialReactTable(
        {
            data: query.data || [],
            columns: COLS,
            layoutMode: 'grid',
            initialState: {

            },

            state: {
                isLoading: query.isLoading,
                columnVisibility

            },
            onColumnVisibilityChange: setColumnVisibility,
            localization: MRT_Localization_RU,
            enableRowActions: true,
            editDisplayMode: 'modal',

            defaultColumn: {
                muiTableBodyCellProps: {
                    align: 'left',
                    sx: {
                        fontWeight: 'bold',
                        borderRight: '1px solid black'
                        // color: 'white',
                    }
                },
                muiTableHeadCellProps: {
                    align: 'left',
                    sx: {
                        borderRight: '1px solid black'
                    }
                },
                maxSize: 100
            },
            defaultDisplayColumn: {
                muiTableBodyCellProps: {
                    align: 'right',
                    sx: {
                        fontWeight: 'bold',
                        color: 'white',
                        backgroundColor: baseBackgroundColor,
                        borderRight: '1px solid black'
                    }
                },
                maxSize: 100,
                grow: true
            },
            muiTableContainerProps: {

                sx: { backgroundColor: '#323233' }
            },
            muiTableBodyRowProps: ({ row }) => ({
                sx: (theme) => ({
                    backgroundColor: row.original.status === 'closed' ? '#d46422c5' : 'inherit',
                    color: 'white'

                }),


            }),
            muiTableBodyProps: {

                sx: {
                    backgroundColor: darken(baseBackgroundColor, 0.1),
                    color: darken(baseBackgroundColor, 1),

                }
                // sx: (theme) => ({
                //     '& tr > td':
                //     {
                //         backgroundColor: darken(baseBackgroundColor, 0.1),
                //         color: darken(baseBackgroundColor, 1),
                //     },
                // '& tr:nth-of-type(odd):not([data-selected="true"]):not([data-pinned="true"]):hover > td':
                // {
                //     backgroundColor: darken(baseBackgroundColor, 0.2),
                //     color: darken(baseBackgroundColor, .5),
                // },
                // '& tr:nth-of-type(even):not([data-selected="true"]):not([data-pinned="true"]) > td':
                // {
                //     backgroundColor: lighten(baseBackgroundColor, 0.1),
                //     color: lighten(baseBackgroundColor, 1),
                // },
                // '& tr:nth-of-type(even):not([data-selected="true"]):not([data-pinned="true"]):hover > td':
                // {
                //     backgroundColor: darken(baseBackgroundColor, 0.2),
                // },
                // }),
            },
            mrtTheme: (theme) => ({
                baseBackgroundColor: baseBackgroundColor,
                draggingBorderColor: theme.palette.secondary.main,
                menuBackgroundColor: theme.palette.info.light
            }),
            // icons:{},
            muiTablePaperProps: {
                elevation: 3,
                color: 'secondary',
                sx: { color: 'secondary', borderWidth: 2, borderColor: 'black' }
            },

            renderTopToolbarCustomActions: ({ table }) => (
                <ButtonGroup>
                    <Button
                        color='warning'
                        variant="contained"
                        onClick={ () => {
                            to_control.toggle()

                        } }
                    >
                        Добавить абонемент
                    </Button>

                </ButtonGroup>
            ),
            onEditingRowSave: handleEditPlayer,
            renderRowActionMenuItems: ({ closeMenu, row, table }) => [
                <MenuItem
                    key={ 0 }
                    onClick={ () => {
                        // edit_control.toggle()
                        table.setEditingRow(row)
                        closeMenu();
                    } }
                    sx={ { m: 0 } }
                >
                    <ListItemIcon>
                        <EditTwoTone />
                    </ListItemIcon>
                    Редактировать
                </MenuItem>,

                <MenuItem
                    key={ 1 }
                    onClick={ () => {
                        setPlayer(row.original)
                        ext.toggle()
                        closeMenu();
                    } }
                    sx={ { m: 0 } }
                >
                    <ListItemIcon>
                        <ExtensionOutlined />
                    </ListItemIcon>
                    Продлить
                </MenuItem>,
                <MenuItem
                    key={ 1 }
                    onClick={ () => {
                        remove(row.original)
                        closeMenu();
                    } }
                    sx={ { m: 0 } }
                >
                    <ListItemIcon>
                        <Delete />
                    </ListItemIcon>
                    Удалить
                </MenuItem>,
            ],

            renderEditRowDialogContent(props) {

                const { name, price, deposit } = props.row.original;
                const { table, row, internalEditComponents } = props;
                const [] = internalEditComponents

                return <>
                    <DialogTitle variant="h4"> { name }</DialogTitle>
                    <CustomEditDialog init={ row.original } onClose={ () => table.setEditingRow(null) } />

                </>
            },

        }
    )

    return (
        <>
            <MaterialReactTable table={ table } />
            {/* <ExtendTicketDialog show={ showExtend } off={ ext.off } /> */ }
            <CustomExtendDialog player={ player } show={ showExtend } onClose={ ext.off } />
            <OpenTicketDialog show={ ticket_open } off={ to_control.off } />
        </>

    )
}


function useDeleteTicket() {
    return useMutation({
        mutationKey: ['ticket', 'delete',],
        mutationFn: (payload: DTO_PwT) => deleteTicket({ where: { playerId: payload.id } }),
    })
}


function CustomEditDialog({ init, onClose }: { init: DTO_PwT, onClose: () => void }) {
    const [player, setPlayer] = useState(init);
    const [date, setDate] = useState<Dayjs | null>(dayjs(init.countFrom));
    const { mutate } = useEditTicket()
    const handleEdit = () => {
        mutate({ player_id: player.id, payload: { amount: player.deposit, price: player.price, countFromDate: _formated_date(date) } })
        onClose()
    }
    return (<DialogContent
        sx={ { display: 'flex', flexDirection: 'column', gap: '1.5rem' } }
    >


        <FormLabel sx={ { display: 'flex', flexDirection: 'row', gap: '1.5rem', alignItems: 'center', justifyContent: 'space-between' } }>
            Депозит

            <TextField
                value={ player.deposit }
                onChange={ (e) => setPlayer(prev => ({ ...prev, deposit: +e.target.value })) }
                size='small' sx={ { maxWidth: 120 } } />
        </FormLabel>
        <FormLabel sx={ { display: 'flex', flexDirection: 'row', gap: '1.5rem', alignItems: 'center', justifyContent: 'space-between' } }>
            Цена

            <TextField
                value={ player.price }
                onChange={ (e) => setPlayer(prev => ({ ...prev, price: +e.target.value })) }
                size='small' sx={ { maxWidth: 120 } } />
        </FormLabel>
        <FormLabel sx={ { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 3 } }  >
            Дата открытия
            <DatePicker value={ date } onChange={ (v) => setDate(v) } sx={ { width: 200 } } />
        </FormLabel>
        <DialogActions>
            <Button variant='contained' color='success' type='submit' onClick={ handleEdit }>Подтвердить</Button>
            <Button variant='contained' color="warning" onClick={ onClose }>Отмена</Button>
        </DialogActions>

    </DialogContent>)
}

function CustomExtendDialog({ player, show, onClose }: { player: DTO_PwT | null, show: boolean, onClose: () => void }) {

    const [amount, setAmount] = useState(0)
    const [date, setDate] = useState<Dayjs | null>(null);
    const { extendTicketForPlayer, players_with_tickets: pwt } = useTicketActions();
    const cfd = date ? _formated_date(date) : _formated_date(dayjs())

    const handleExtend = async () => {
        if (!player) return
        const selectedPlayer = pwt.find(p => p.id === +player.id)
        if (!selectedPlayer) return
        await extendTicketForPlayer(selectedPlayer, amount, cfd)
        onClose()
    }
    return (
        <Dialog open={ show } onClose={ onClose }>
            <DialogTitle variant="h4"> { player?.name || "Никто не выбран" }</DialogTitle>
            <DialogContent>
                <FormControl sx={ { display: 'flex', gap: 2, minWidth: 300 } }>

                    <FormLabel sx={ { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }>
                        Сумма
                        <TextField value={ amount } onChange={ (e) => setAmount(+e.target.value) } size='small' sx={ { maxWidth: 120 } } />
                    </FormLabel>


                    <FormLabel sx={ { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 3 } }  >
                        Дата продления
                        <DatePicker value={ date } onChange={ (v) => setDate(v) } sx={ { width: 200 } } />
                    </FormLabel>

                    <ButtonGroup fullWidth variant='contained'>
                        <Button type='submit' onClick={ handleExtend }>Подтвердить</Button>
                        <Button onClick={ onClose } color='error'>Отмена</Button>
                    </ButtonGroup>
                </FormControl>
            </DialogContent>
        </Dialog>
    )
}
