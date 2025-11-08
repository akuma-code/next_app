'use client'
import { _formated_date } from '@/Helpers/dateFuncs';
import { useOpenTicket, useTicketActions } from '@/Hooks/MRT/Ticket/useTicket';
import { useGetAllPlayers } from '@/Hooks/useGetEventPlayers';
import { useToggle } from '@/Hooks/useToggle';
import { Button, ButtonGroup, Dialog, DialogContent, FormControl, FormLabel, Input, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import React, { useState } from 'react'

function OpenTicketDialog({ show, off }: { show: boolean, off: () => void }) {
    const [players] = useGetAllPlayers()

    const { data, mutate, isPending } = useOpenTicket()

    // const [list, setList] = useState(() => players.map(p => ({ name: p.name, id: p.id })));
    const [selected, setSelected] = useState("")
    const [amount, setAmount] = useState(0)
    const [price, setPrice] = useState(0);
    const [date, setDate] = useState<Dayjs | null>(dayjs());
    const { openTicket } = useTicketActions();
    const handleOpen = () => {
        mutate({ id: +selected, amount, price, date: _formated_date(date) })
        // await openTicket(+selected, amount, price, _formated_date(date))
        off()
    }

    return (
        <Dialog open={ show } onClose={ off }>
            <DialogContent>
                <FormControl sx={ { display: 'flex', gap: 2, minWidth: 300 } }>
                    <FormLabel sx={ { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 } }>
                        Игрок
                        <TextField select
                            fullWidth
                            value={ selected } onChange={ (e) => setSelected(e.target.value) }

                            variant='filled'
                        >
                            <MenuItem disabled>Выбрать игрока</MenuItem>
                            { players.map(p =>
                                <MenuItem value={ p.id } key={ p.id }>{ p.name }</MenuItem>
                            ) }
                        </TextField>
                    </FormLabel>
                    <FormLabel sx={ { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }>
                        Депозит
                        <TextField value={ amount } onChange={ (e) => setAmount(+e.target.value) } size='small' sx={ { maxWidth: 120 } } />
                    </FormLabel>
                    <FormLabel sx={ { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }  >
                        Цена
                        <TextField value={ price } onChange={ (e) => setPrice(+e.target.value) } size='small' sx={ { maxWidth: 120 } } />
                    </FormLabel>

                    <FormLabel sx={ { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 3 } }  >
                        Дата открытия
                        <DatePicker value={ date } onChange={ (v) => setDate(v) } sx={ { width: 200 } } />
                    </FormLabel>

                    <ButtonGroup fullWidth variant='contained'>
                        <Button type='submit' onClick={ handleOpen }>Подтвердить</Button>
                        <Button onClick={ off } color='error'>Отмена</Button>
                    </ButtonGroup>
                </FormControl>
            </DialogContent>
        </Dialog>
    )
}

export default OpenTicketDialog
