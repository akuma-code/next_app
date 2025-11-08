'use client'
import { _formated_date } from '@/Helpers/dateFuncs';
import { useTicketActions } from '@/Hooks/MRT/Ticket/useTicket';
import { Button, ButtonGroup, Dialog, DialogContent, FormControl, FormLabel, MenuItem, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

function ExtendTicketDialog({ show, off }: { show: boolean, off: () => void }) {

    const [selected, setSelected] = useState("")
    const [amount, setAmount] = useState(0)
    const [date, setDate] = useState<Dayjs | null>(null);
    const { extendTicketForPlayer, players_with_tickets: pwt } = useTicketActions();
    const cfd = date ? _formated_date(date) : _formated_date(dayjs())

    const handleExtend = async () => {
        const selectedPlayer = pwt.find(p => p.id === +selected)
        if (!selectedPlayer) return
        await extendTicketForPlayer(selectedPlayer, amount, cfd)
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
                            { pwt.map(p =>
                                <MenuItem value={ p.id } key={ p.id }>{ p.name }</MenuItem>
                            ) }
                        </TextField>
                    </FormLabel>
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
                        <Button onClick={ off } color='error'>Отмена</Button>
                    </ButtonGroup>
                </FormControl>
            </DialogContent>
        </Dialog>
    )
}

export default ExtendTicketDialog
