'use client'
import React from 'react'

import { _dbDateParser } from "@/Helpers/dateFuncs"
import { syncPlayers, useGetEvent } from "@/Hooks/Queries/Events/useEvents"
import { mdiAdjust, mdiMinusBox, mdiPlusBox } from "@mdi/js"
import Icon from "@mdi/react"
import { Alert, Box, ButtonGroup, CircularProgress, IconButton, List, ListItem, ListItemButton, ListItemText, Menu, MenuItem, Typography } from "@mui/material"
import { useState } from "react"
import {
    addPair,
    removePair,
    updatePair,
} from "@/Services/events/eventActions";
interface EventViewProps {
    eventId?: number
    masters: Record<string, { name: string }>
}

interface SyncedPlayer {
    id: number;
    player: string;
    master?: string;
    pairId?: number;
    masterId?: number;
}
const EventView_v2 = ({ eventId, masters }: EventViewProps) => {
    const { data, error, isSuccess, isLoading, isError } = useGetEvent({ id: eventId })
    if (error) return (<Alert><p>{ error?.message }</p></Alert>)
    if (isLoading || !data) return <CircularProgress />
    const { dd_mm_yyyy } = _dbDateParser(data.date_formated);



    const list_players: SyncedPlayer[] = syncPlayers(data ?? undefined)
        .map(p => p.pair
            ? ({ player: p.name, master: masters[p.pair.masterId.toString()].name, id: p.id, pairId: p.pair.id, masterId: p.pair.masterId })
            : { player: p.name, id: p.id })



    return (
        <Box

            sx={ {
                borderRadius: 4,
                minWidth: 280,
                maxWidth: 'max-content',
                border: "2px solid",
                borderColor: "primary.dark",
                bgcolor: "background.paper",
                boxShadow: "0 2px 6px 0 rgba(0,0,0,0.08)",

            } }
            m={ 2 }
            p={ 1 }
        >
            {
                // error &&
                // <Alert>
                //     <p>
                //         { error.message }
                //     </p>
                // </Alert>
            }
            { isLoading &&
                <CircularProgress />
            }
            <Typography variant="h5" component={ 'div' } textAlign={ 'center' }>
                { dd_mm_yyyy }
            </Typography>
            <List dense sx={ { maxWidth: 300 } } >
                { list_players.map(p =>
                    <ListItem key={ p.id }
                        divider
                        // alignItems='center'
                        sx={ {
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",

                        } }
                    >

                        <ListItemText
                            primary={ p.player }
                            secondary={ p.master }
                        />
                        { p.master
                            ?
                            <ButtonPlayerMenu data={ p } />
                            :
                            <ButtonMasterMenu data={ p } />
                        }
                        {/* <ButtonGroup >                        </ButtonGroup> */ }
                    </ListItem>
                ) }
            </List>
        </Box>
    )
}


const ButtonMasterMenu = ({ data }: {
    data: SyncedPlayer
}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const { id: playerId, player, master, pairId, masterId } = data

    return (
        <React.Fragment>
            <IconButton onClick={ handleOpen } edge={ 'start' } color='secondary'>
                <Icon path={ mdiPlusBox } size={ 1.5 } />
            </IconButton>
            <Menu
                anchorEl={ anchorEl }
                id="account-menu"
                open={ open }
                onClose={ handleClose }
                onClick={ handleClose }
                transformOrigin={ { horizontal: "right", vertical: "top" } }
                anchorOrigin={ { horizontal: "right", vertical: "bottom" } }
            >
                {/* <MenuItem onClick={ () => console.log({ playerId, player }) }>
                    remove player
                </MenuItem> */}
                <MenuItem onClick={ () => console.log(data) }>
                    Add Master
                </MenuItem>
                {/* <MenuItem onClick={ () => console.log({ master, masterId }) }>
                    remove master
                </MenuItem> */}

            </Menu>


        </React.Fragment>
    )
}
const ButtonPlayerMenu = ({ data }: {
    data: SyncedPlayer
}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const { id: playerId, player, master, pairId, masterId } = data

    return (
        <React.Fragment>
            <IconButton onClick={ handleOpen } edge={ 'start' } color='warning' >
                <Icon path={ mdiMinusBox } size={ 1.5 } />
            </IconButton>
            <Menu
                anchorEl={ anchorEl }
                id="account-menu"
                open={ open }
                onClose={ handleClose }
                onClick={ handleClose }
                transformOrigin={ { horizontal: "right", vertical: "top" } }
                anchorOrigin={ { horizontal: "right", vertical: "bottom" } }
            >
                <MenuItem onClick={ () => console.log({ playerId, player }) }>
                    remove player
                </MenuItem>

                <MenuItem onClick={ () => console.log({ master, masterId }) }>
                    remove master
                </MenuItem>

            </Menu>


        </React.Fragment>
    )
}

export default EventView_v2