'use client'
import React from 'react'

import { IEvent_Front, avatarColor } from "@/ClientComponents/EventsList"
import { _dbDateParser } from "@/Helpers/dateFuncs"
import { name_letters } from "@/Helpers/stringFns"
import { FastRewindTwoTone, SettingsTwoTone } from "@mui/icons-material"
import AddIcon from '@mui/icons-material/Add'
import { Avatar, Box, BoxProps, Button, ButtonGroup, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Menu, MenuItem, Tooltip, Typography } from "@mui/material"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
interface Eventinfo {
    boxProps?: BoxProps
    event: IEvent_Front
    readonly?: boolean
}
export const EventView: React.FC<Eventinfo> = ({ boxProps, event, readonly = false }) => {
    const router = useRouter()
    const pathname = usePathname()
    const { players, date_formated, title, _count, id } = event
    const { dd_mmmm, dd_mm_yyyy } = _dbDateParser(date_formated);

    async function handleAddCoach(eId: number, pId: number, cId: number) {
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
                border: "1px solid",
                borderColor: 'lightgray',
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
            <Divider sx={ { justifyContent: 'left' } } flexItem>
                <ButtonGroup>
                    <Button
                        variant="outlined"
                        size="small"
                        href={ '/avangard/events' }
                        startIcon={ <FastRewindTwoTone /> }>
                        Назад
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={ () => router.push(pathname + '/edit') }

                        startIcon={ <SettingsTwoTone /> }>
                        Изменить
                    </Button>

                </ButtonGroup>
            </Divider>
            <List>
                {
                    players.map((p, index) => (
                        <ListItem key={ index } sx={ { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' } } >
                            <ListItemAvatar >
                                <Avatar >
                                    { name_letters(p.name) }

                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={ p.name } />


                            <ListMenu />
                        </ListItem>
                    ))
                }
            </List>
        </Box>
    )
}

const ListMenu = () => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <Tooltip title="Занятия с тренером">
                <IconButton
                    onClick={ handleClick }
                    size="small"
                    sx={ { ml: 2 } }
                    aria-controls={ open ? 'account-menu' : undefined }
                    aria-haspopup="true"
                    aria-expanded={ open ? 'true' : undefined }
                    color='primary'
                >
                    <Avatar sx={ { bgcolor: (theme) => theme.palette.primary.light } }><AddIcon /></Avatar>
                </IconButton>
            </Tooltip>

            <Menu
                anchorEl={ anchorEl }
                id="account-menu"
                open={ open }
                onClose={ handleClose }
                onClick={ handleClose }
                PaperProps={ {
                    elevation: 0,
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
                    },
                } }
                transformOrigin={ { horizontal: 'right', vertical: 'top' } }
                anchorOrigin={ { horizontal: 'right', vertical: 'bottom' } }
            >

                <MenuItem onClick={ handleClose }>
                    <Avatar /> Profile
                </MenuItem>
                <MenuItem onClick={ handleClose }>
                    <Avatar /> My account
                </MenuItem>
            </Menu>

        </React.Fragment>)

}


EventView.displayName = "______EventIdView"