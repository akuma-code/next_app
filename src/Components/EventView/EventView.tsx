'use client'
import React, { useMemo } from 'react'

import { IEvent_Front, avatarColor } from "@/ClientComponents/EventsList"
import { _dbDateParser } from "@/Helpers/dateFuncs"
import { name_letters } from "@/Helpers/stringFns"
import { addPair, removePair, updatePair } from '@/Services/eventActions'
import { FastRewindTwoTone, SettingsTwoTone } from "@mui/icons-material"
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'
import { Avatar, Box, BoxProps, Button, ButtonGroup, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Menu, MenuItem, Tooltip, Typography } from "@mui/material"
import { Event, Player } from '@prisma/client'
import Link from 'next/link'
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { _log } from '@/Helpers/helpersFns'
import { useSession } from 'next-auth/react'

interface Pair {
    id: number
    eventId: number
    firstPlayerId: number
    secondPlayerId: number
}
type TEvent = IEvent_Front & { pairs: Pair[] }
interface Eventinfo {
    boxProps?: BoxProps
    event: TEvent
    masters: { id: number, name: string }[]

}

function parseEvent(event: TEvent, masters: { id: number, name: string }[]) {
    const { pairs, players } = event
    const withPair = pairs.map(p => {
        const pl = players.find(pl => pl.id === p.secondPlayerId)
        const m = masters.find(ma => ma.id === p.firstPlayerId)!
        return pl ? { ...p, player: pl.name, master: m?.name } : { ...p, player: "", master: "" }
    }
    )
    return withPair
}
export const EventView: React.FC<Eventinfo> = ({ boxProps, event, masters }) => {
    const router = useRouter()
    const pathname = usePathname()
    const { data } = useSession()
    const { players, date_formated, title, _count, id, pairs } = event
    const { dd_mmmm, dd_mm_yyyy } = _dbDateParser(date_formated);
    const pairPlayerIdx = (id: number) => pairs.findIndex(p => p.secondPlayerId === id)
    const pairMasterIdx = (id: number) => pairs.findIndex(p => p.firstPlayerId === id)
    const handlePairChange = async (master: { id: number, name: string }, playerId: number, pair: Pair | null) => {
        _log({ eventId: event.id, playerId, masterId: master.id, pair })
        if (!pair) {
            return await addPair({ eventId: event.id, playerId, masterId: master.id })

        } else {
            return await updatePair(pair.id, { masterId: master.id, playerId })

        }
    }

    const player_ = (secondPlayerId: number) => event.players.find(p => p.id === secondPlayerId)
    const master_ = (firstPlayerId: number) => masters.find(m => m.id === firstPlayerId)
    const name_pairs = (pairs: Pair[]) => {
        return pairs.map(pair => ({ id: pair.id, master: master_(pair.firstPlayerId), player: player_(pair.secondPlayerId) }))
    }

    const extendPairs = useMemo(() => name_pairs(event.pairs), [event])

    const handleDeletePair = async (pair: Pair | null) => {
        if (!pair) return
        await removePair(pair.id)
    }
    // const menuOptions = useMemo(() => masters ?? [], [])
    const parsedPlayers = useMemo(() => parseEvent(event, masters), [event, masters])
    const player_pairs = useMemo(() => {

        const _players = players.map(p => {
            const idx = pairPlayerIdx(p.id)
            const withpair = idx >= 0 ? { ...p, pair: pairs[idx] } : { ...p, pair: null }
            return withpair

        })
        return _players

        // const master = (id: number) => masters?.find(m => m.id === id)?.name

        // const withPair = players.map(p => {
        //     const pair = pairs.find(pp => pp.secondPlayerId === p.id)
        //     return pair
        //         ? ({ ...p, pair: master(pair.firstPlayerId) })
        //         : ({ ...p, pair: null })
        // })
        // return withPair
    }, [pairs, players])
    const pairText = (name?: string | null) => name ? `тренер: ${name}` : null
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
            m={ 2 }
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
                        color='error'
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
                    player_pairs.map((p, index) => (
                        <ListItem key={ index } sx={ { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' } } dense divider>
                            <ListItemAvatar >
                                <Avatar variant='rounded'
                                    sx={ { width: 32, height: 32, bgColor: 'primary.light', p: 0.5, color: 'primary.main', fontSize: 15 } }
                                >

                                    { name_letters(p.name) }
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={ p.name }
                                primaryTypographyProps={ { textAlign: 'left' } }
                                secondary={ p.pair && master_(p.pair.firstPlayerId)?.name }
                                secondaryTypographyProps={ {
                                    fontWeight: 'normal', marginInlineStart: 0, color: 'primary.light'
                                } }
                            />


                            <SelectPairButton>
                                <MenuItem
                                    sx={ { justifyContent: 'right' } }
                                    onClick={ () => handleDeletePair(p.pair) } >
                                    <Avatar sx={ { bgcolor: 'warning.light', } }>X</Avatar>
                                </MenuItem>
                                { masters.map(m =>

                                    <MenuItem key={ m.name } onClick={ () => handlePairChange(m, p.id, p.pair) }>

                                        <Avatar />{ m.name }

                                    </MenuItem>
                                ) }
                            </SelectPairButton>
                        </ListItem>
                    ))
                }
            </List>
        </Box>
    )
}



interface MenuButtonProps {

    children?: React.ReactNode

}

const SelectPairButton: React.FC<MenuButtonProps> = ({ children }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);

    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <Tooltip title="Занятия с тренером">
                <IconButton
                    onClick={ handleOpen }
                    size="small"
                    sx={ { mx: 1 } }
                    aria-controls={ open ? 'account-menu' : undefined }
                    aria-haspopup="true"
                    aria-expanded={ open ? 'true' : undefined }
                    color='primary'
                >
                    <Avatar sx={ { bgcolor: 'primary.dark', width: 32, height: 32 } } variant='rounded'>
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

                { children }
            </Menu>

        </React.Fragment>)

}

SelectPairButton.displayName = "_________Pair Select"


const RadioSelector = () => {

}



EventView.displayName = "______EventIdView"