'use client'
import React, { useMemo } from 'react'

import { IEvent_Front, avatarColor } from "@/ClientComponents/EventsList"
import { _dbDateParser } from "@/Helpers/dateFuncs"
import { name_letters } from "@/Helpers/stringFns"
import { FastRewindTwoTone, SettingsTwoTone } from "@mui/icons-material"
import AddIcon from '@mui/icons-material/Add'
import { Avatar, Box, BoxProps, Button, ButtonGroup, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Menu, MenuItem, Tooltip, Typography } from "@mui/material"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import Link from 'next/link'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { Event, Player } from '@prisma/client'
import { addInfo, event_UpsertInfo } from '@/Services/eventActions'
import { _log } from '@/Helpers/helpersFns'

interface Eventinfo {
    boxProps?: BoxProps
    event: IEvent_Front
    masters?: { id: number, name?: string | null }[]

}

export const EventView: React.FC<Eventinfo> = ({ boxProps, event, masters }) => {
    const router = useRouter()
    const pathname = usePathname()
    const { players, date_formated, title, _count, id } = event
    const { dd_mmmm, dd_mm_yyyy } = _dbDateParser(date_formated);

    const menuOptions = useMemo(() => masters ?? [{ id: 1, name: "Алан" }, { id: 2, name: "Антон" }], [])
    async function handleAddCoach(event: Event, trener: string, player: Player) {

        // const connect = await connectCoachToPlayer(pId, cId, eId)
        // _log(connect)
        // return connect
    }
    return (
        <Box
            { ...boxProps }
            sx={ {
                borderRadius: 4,
                minWidth: 280,
                border: "2px solid",
                borderColor: 'primary.dark',
                bgcolor: "background.paper",
                boxShadow: "0 2px 6px 0 rgba(0,0,0,0.08)",
                ...boxProps?.sx,
            } }
        >
            <Box sx={ { display: "flex", p: 1.5, alignItems: "center", columnGap: 1, justifyContent: 'space-evenly' } }>

                <Box>

                    <Typography variant="h5" component={ 'div' }>{ title }</Typography>
                    <Typography variant="body1" fontSize={ 18 } >{ dd_mm_yyyy }</Typography>
                </Box>
                <Avatar variant="rounded"
                    sx={ { mt: 0.5, mb: 0, bgcolor: avatarColor(_count?.players || 0) } }
                >
                    { _count?.players }
                </Avatar>
            </Box>
            <Divider flexItem>
                <ButtonGroup variant='contained' fullWidth>
                    <Button
                        color='warning'
                        LinkComponent={ Link }
                        size="small"
                        href={ '/avangard/events' }
                        startIcon={ <FastRewindTwoTone /> }>
                        Назад
                    </Button>
                    <Button
                        color='warning'
                        LinkComponent={ Link }
                        size="small"
                        onClick={ () => router.push(pathname + '/edit') }
                        startIcon={ <SettingsTwoTone /> }
                        sx={ { px: 2 } }
                    >


                        Изменить

                    </Button>

                </ButtonGroup>
            </Divider>
            <List>
                {
                    players.map((p, index) => (
                        <ListItem key={ index } sx={ { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' } } dense divider>
                            <ListItemAvatar >
                                <Avatar
                                    sx={ { width: 32, height: 32, bgColor: 'primary.dark', p: 0.5 } }
                                >

                                    { name_letters(p.name) }
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={ p.name }
                                primaryTypographyProps={ { textAlign: 'left' } }
                            />


                            <MenuButton options={ menuOptions } eventId={ id } playerId={ p.id } />
                        </ListItem>
                    ))
                }
            </List>
        </Box>
    )
}



interface MenuButtonProps {
    options: { id: number, name?: string | null }[]
    playerId: number
    eventId: number


}
const MenuButton = ({ options, eventId, playerId, }: MenuButtonProps) => {

    const [masterId, setMaster] = useState<null | number>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);

    };
    const handleClose = () => {
        setAnchorEl(null);

    };
    const handleSubmit = (masterId: number) => async () => {
        _log({ masterId, playerId, eventId })


    }
    return (
        <React.Fragment>
            <Tooltip title="Занятия с тренером">
                <IconButton
                    onClick={ handleClick }
                    size="small"
                    sx={ { mx: 1 } }
                    aria-controls={ open ? 'account-menu' : undefined }
                    aria-haspopup="true"
                    aria-expanded={ open ? 'true' : undefined }
                    color='primary'
                >
                    <Avatar sx={ { bgcolor: (theme) => theme.palette.primary.dark, width: 32, height: 32 } } variant='rounded'>
                        <SupervisorAccountIcon sx={ { color: 'primary' } } />
                    </Avatar>
                </IconButton>
            </Tooltip>

            <Menu
                anchorEl={ anchorEl }
                id="account-menu"
                open={ open }
                onClose={ handleClose }
                onClick={ handleClose }
                slotProps={ {
                    paper: {
                        elevation: 1,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        }
                    },
                } }
                transformOrigin={ { horizontal: 'right', vertical: 'top' } }
                anchorOrigin={ { horizontal: 'right', vertical: 'bottom' } }
            >
                { options && options?.map((o, idx) =>

                    <MenuItem onClick={ handleSubmit(o.id) } key={ idx }>
                        <Avatar
                            sx={ { width: 32, height: 32 } }
                        /> { o.name }
                    </MenuItem>
                ) }

            </Menu>

        </React.Fragment>)

}


EventView.displayName = "______EventIdView"