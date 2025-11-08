'use client'
import { useTicketActions } from '@/Hooks/MRT/Ticket/useTicket';
import { Button, ButtonGroup, Dialog, DialogContent, FormControl, FormLabel, MenuItem, TextField } from '@mui/material';
import { useState } from 'react';

function RemoveTicketDialog({ show, off }: { show: boolean, off: () => void }) {


    const { players_with_tickets: pwt, removeTicket } = useTicketActions();
    // const [list, setList] = useState(() => players.map(p => ({ name: p.name, id: p.id })));
    const [selected, setSelected] = useState("")

    const handleRemove = async () => {
        const selectedPlayer = pwt.find(p => p.id === +selected)
        if (!selectedPlayer) return
        await removeTicket(selectedPlayer)
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


                    <ButtonGroup fullWidth variant='contained'>
                        <Button type='submit' onClick={ handleRemove }>Подтвердить</Button>
                        <Button onClick={ off } color='error'>Отмена</Button>
                    </ButtonGroup>
                </FormControl>
            </DialogContent>
        </Dialog>
    )
}

export default RemoveTicketDialog
