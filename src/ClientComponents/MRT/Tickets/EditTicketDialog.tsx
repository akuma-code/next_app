'use client'
import { _formated_date } from '@/Helpers/dateFuncs';
import { useEditTicket, useTicketActions } from '@/Hooks/MRT/Ticket/useTicket';
import { useGetAllPlayers } from '@/Hooks/useGetEventPlayers';
import { useToggle } from '@/Hooks/useToggle';
import { Button, ButtonGroup, Dialog, DialogContent, FormControl, FormLabel, Input, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react'

function EditTicketDialog({ show, off }: { show: boolean, off: () => void }) {
    // const [list, setList] = useState(() => players.map(p => ({ name: p.name, id: p.id })));
    const { editTicket, players_with_tickets: pwt } = useTicketActions();
    const [selected, setSelected] = useState("")

    const { data, mutate } = useEditTicket();

    const [player, setPlayer] = useState<typeof pwt[number] | undefined>();
    const [amount, setAmount] = useState(player?.ticket?.amount || 0)
    const [price, setPrice] = useState(player?.ticket?.price || 0);
    const [date, setDate] = useState<Dayjs | null>(null);
    const handleEdit = async () => {
        if (!player) return
        mutate({
            player_id: +selected,
            payload: { amount, countFromDate: _formated_date(date), price }
        })
        // await editTicket(player, { amount, price, date: _formated_date(date) })
        off()
    }
    useEffect(() => {
        setPlayer(pwt.find(p => p.id === +selected))
        if (!player || !player.ticket) return
        setAmount(player.ticket.amount)
        setPrice(player.ticket.price)
        setDate(dayjs(player.ticket.countFromDate))

    }, [selected, player]);
    return (
        <Dialog open={ show } onClose={ off }>
            <DialogContent>
                <FormControl sx={ { display: 'flex', gap: 2, minWidth: 300 } }>
                    <FormLabel sx={ { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 } }>
                        Игрок
                        <TextField select
                            fullWidth
                            value={ selected } onChange={ (e) => setSelected(prev => e.target.value) }

                            variant='filled'
                        >
                            <MenuItem disabled>Выбрать игрока</MenuItem>
                            { pwt.map(p =>
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
                        <Button type='submit' onClick={ handleEdit }>Подтвердить</Button>
                        <Button onClick={ off } color='error'>Отмена</Button>
                    </ButtonGroup>
                </FormControl>
            </DialogContent>
        </Dialog>
    )
}

export default EditTicketDialog
