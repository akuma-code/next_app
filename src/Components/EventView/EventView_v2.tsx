'use client'
import React, { useCallback, useMemo } from 'react'

import { _dbDateParser } from "@/Helpers/dateFuncs"
import { syncPlayers, useGetEvent } from "@/Hooks/Queries/Events/useEvents"
import { mdiAdjust, mdiDotsHorizontalCircleOutline, mdiMinusBox, mdiPlusBox } from "@mdi/js"
import Icon from "@mdi/react"
import { Alert, Box, ButtonGroup, CircularProgress, Dialog, DialogContent, IconButton, List, ListItem, ListItemButton, ListItemText, Menu, MenuItem, Typography } from "@mui/material"
import { useState } from "react"
import {
    addPair,
    editOneEvent,
    removePair,
    updatePair,
} from "@/Services/events/eventActions";
import { useMutation } from '@tanstack/react-query'
interface EventViewProps {
    eventId?: number
    masters: Record<string, { name: string }>
    event?: ReturnType<typeof useGetEvent>['data']
}

interface SyncedPlayer {
    id: number;
    player: string;
    eventId: number
    master?: string;
    pairId?: number;
    masterId?: number;
}
const EventView_v2 = ({ eventId, masters }: EventViewProps) => {
    const { data, error, isSuccess, isLoading, isError } = useGetEvent({ id: eventId })




    const list_players: SyncedPlayer[] = useMemo(() => {
        if (!data) return []
        const list = syncPlayers(data ?? undefined)
            .map(p => p.pair
                ? ({
                    id: p.id,
                    player: p.name,
                    eventId: data.id,
                    master: masters[p.pair.masterId.toString()].name,
                    pairId: p.pair.id,
                    masterId: p.pair.masterId,
                })
                : {
                    player: p.name,
                    id: p.id,
                    eventId: data.id
                })
        return list
    }, [data, masters])

    if (error) return (<Alert><p>{ error?.message }</p></Alert>)
    const { dd_mm_yyyy } = _dbDateParser(data?.date_formated ?? "");
    const mastersArray = Object.entries(masters).map(([id, { name }]) => ({ id: Number(id), name }))
    if (isLoading || !data) return <CircularProgress />
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
                        {
                            //  p.master
                            //     ?
                            //     <RemoveMenuButton data={ p } />
                            //     :
                            //     <AddMenuButton data={ p } masters={ mastersArray } />
                        }
                        <AddMenuButton data={ p } masters={ mastersArray } />
                        {/* <ButtonGroup >                        </ButtonGroup> */ }
                    </ListItem>
                ) }
            </List>
        </Box>
    )
}
async function removePlayer(eventId: number, playerId: number) {
    await editOneEvent({ id: eventId }, { players: { disconnect: { id: playerId } } })
}

const AddMenuButton = ({ data, masters }: {
    data: SyncedPlayer
    masters: { id: number, name: string }[]
}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [subAnchorEl, setSub] = useState<null | HTMLElement>(null);
    const sub_open = Boolean(subAnchorEl);
    const { id: playerId, player, master, pairId, masterId, eventId } = data
    const { data: updatedPair, mutateAsync: updatePairAsync, isPending: isPendingUpdate } = useMutation({
        mutationKey: ['pair', pairId, masterId, playerId],
        mutationFn: async (pair_data: { pairId?: number, masterId?: number, playerId?: number }) =>
            updatePair(pair_data.pairId, { masterId: pair_data.masterId, playerId: pair_data.playerId! }),
        onSuccess({ id }) {
            console.log("Pair updated", { id })
        }
    })
    const { data: removedPair, mutateAsync: removePairAsync, isPending: isPendingRemove } = useMutation({
        mutationKey: ['pair', pairId],
        mutationFn: async (pairId: number) => await removePair(pairId),
        onSuccess({ id }) {
            console.log("Pair deleted", { id })
        },

    })


    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        // setSub(null)
    };
    const handleOpenSub = (event: React.MouseEvent<HTMLElement>) => {
        setSub(event.currentTarget);
    };

    const handleCloseSub = () => {
        setSub(null);
    };
    const handleRemovePlayer = useCallback(async () => {
        await removePlayer(eventId, playerId)
        console.log("removed player: ", player)
    }, [eventId, playerId, player])
    const handleUpdateMaster = useCallback(async (mid?: number) => {
        if (!mid) return console.log("MasterId not found!", { masterId: mid })
        if (pairId) await updatePairAsync({ pairId, masterId: mid, playerId })
        else await addPair({ masterId: mid, eventId, playerId })
    }, [eventId, pairId, playerId, updatePairAsync]
    )
    return (
        <React.Fragment>
            <IconButton onClick={ handleOpen } edge={ 'start' } color='secondary' disabled={ isPendingUpdate }>
                <Icon path={ mdiDotsHorizontalCircleOutline } size={ 1.5 } />


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
                <MenuItem onClick={ handleRemovePlayer }>
                    удалить { player.split(" ")[1] }
                </MenuItem>
                <MenuItem onClick={ handleOpenSub } >
                    Add Pair
                </MenuItem>
                <MenuItem onClick={ () => pairId && removePairAsync(pairId) }>
                    remove master
                </MenuItem>

            </Menu>

            <Dialog open={ sub_open } onClose={ handleCloseSub }>
                <DialogContent>
                    <List dense>

                        { masters.map((m, idx) =>
                            <ListItemButton
                                divider
                                disableGutters
                                key={ m.id }
                                alignItems='center'
                                onClick={ () => handleUpdateMaster(m.id) }>
                                { idx + 1 }) { m.name }
                            </ListItemButton>
                        ) }
                    </List>

                </DialogContent>
            </Dialog>
        </React.Fragment>
    )
}
const RemoveMenuButton = ({ data }: {
    data: SyncedPlayer
}) => {
    const { id: playerId, player, master, pairId, masterId, eventId } = data
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { data: removedPair, mutateAsync: removePairAsync, isPending: isPendingRemove } = useMutation({
        mutationKey: ['pair', pairId],
        mutationFn: async (pairId: number) => await removePair(pairId),
        onSuccess({ id }) {
            console.log("Pair deleted", { id })
        },

    })
    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const deletePair = async (pairId?: number) => {
        if (!pairId) return console.error("Pair id invalid: ", pairId)
        await removePair(pairId)

    }

    const handleDeletePair = useCallback(async () => await deletePair(pairId), [pairId])
    const handleRemovePlayer = useCallback(async () => {
        await removePlayer(eventId, playerId)
        console.log("removed player: ", player)
    }, [eventId, playerId, player])
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
                <MenuItem onClick={ handleRemovePlayer }>
                    remove player
                </MenuItem>

                <MenuItem onClick={ () => pairId && removePairAsync(pairId) }>
                    remove master
                </MenuItem>

            </Menu>


        </React.Fragment>
    )
}

export default EventView_v2