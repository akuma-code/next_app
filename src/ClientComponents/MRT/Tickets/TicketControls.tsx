'use client'


import { useTicketActions } from '@/Hooks/MRT/Ticket/useTicket';
import { useToggle } from '@/Hooks/useToggle';
import { Button, ButtonGroup } from '@mui/material'
import React from 'react'
import OpenTicketDialog from './OpenTicketDialog';
import ExtendTicketDialog from './ExtendTicketDialog';
import RemoveTicketDialog from './RemoveTicketDialog';
import EditTicketDialog from './EditTicketDialog';

function TicketControls() {

    const [ticket_open, to_control] = useToggle(false);
    const [ticket_extend, ext_control] = useToggle(false);
    const [ticket_close, close_control] = useToggle(false);
    const [ticket_edit, edit_control] = useToggle(false);

    return (
        <>
            <ButtonGroup>
                <Button onClick={ to_control.toggle }>Добавить</Button>
                <Button onClick={ ext_control.toggle }>Продлить</Button>
                <Button onClick={ edit_control.toggle }>Редактировать</Button>
                <Button onClick={ close_control.toggle }>Удалить</Button>
            </ButtonGroup>
            {/* <OpenTicketDialog show={ ticket_open } off={ to_control.off } /> */ }
            {/* <ExtendTicketDialog show={ ticket_extend } off={ ext_control.off } /> */ }
            <RemoveTicketDialog show={ ticket_close } off={ close_control.off } />
            <EditTicketDialog show={ ticket_edit } off={ edit_control.off } />
        </>
    )
}

export default TicketControls
