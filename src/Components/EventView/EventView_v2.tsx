'use client'
import React, { Dispatch, SetStateAction, useCallback, useContext, useMemo } from 'react'

import { _dbDateParser } from "@/Helpers/dateFuncs"
import { getPlayersList, syncPlayers, useGetEvent } from "@/Hooks/Queries/Events/useEvents"
import {
    addPair,
    editOneEvent,
    removePair,
    upsertPair
} from "@/Services/events/eventActions"
import { mdiDotsHorizontalCircleOutline, mdiMinusBox } from "@mdi/js"
import Icon from "@mdi/react"
import { Alert, Box, CircularProgress, Dialog, DialogContent, IconButton, List, ListItem, ListItemButton, ListItemText, Menu, MenuItem, Typography } from "@mui/material"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from "react"
import { _log } from '@/Helpers/helpersFns'
import { reduceArrayToObject } from '@/Helpers/reduceToObject'
interface EventViewProps {
    eventId?: number
    masters: { name: string, id: number }[]
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

interface EventListItem {
    player: { id: number, name: string }
    master: { id: number, name: string } | null
    eventId: number

}
export interface EventContextData {
    id?: number
    date_formated?: string,
    title?: string | null
    players?: { id: number, name: string }[]

}
export interface EventCtx {
    event?: EventContextData | null
    updater?: Dispatch<SetStateAction<EventContextData | undefined>>
}

export const EventContext = React.createContext<EventCtx | null>(null)

const EventView_v2 = ({ eventId }: EventViewProps) => {
    const { data, error, isSuccess, isLoading, isError } = useGetEvent({ id: eventId })
    const [context, setContext] = useState<EventContextData | undefined>()



    const list_players = useMemo(() => {

        if (!isSuccess || !eventId) return
        const _pairs = data.pairs.map(pp => ({ master: pp.master, player: pp.player, id: pp.id, eventId: pp.eventId }))

        const RecPairs = _pairs.reduce((acc, { player, ...rest }) => player ? ({ ...acc, [player?.id]: rest }) : acc, {} as Record<string, typeof _pairs[number]>)

        const withPairIds = (id: number) => _pairs.map(pp => pp?.player?.id ?? -1).includes(id)

        const list = data.players.map(p =>
            withPairIds(p.id)
                ? { player: p, eventId, master: RecPairs[p.id].master, }
                : { player: p, master: null, eventId }
        )

        return list
    }, [data?.pairs, data?.players, eventId, isSuccess])



    if (error) return (<Alert color='error'><p>{ error?.message }</p></Alert>)

    return (
        <EventContext.Provider
            value={ {
                event: context,
                updater: setContext
            } }
        >

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


                <Typography variant="h5" component={ 'div' } textAlign={ 'center' }>
                    { context?.title || "No title" }
                </Typography>
                <List dense sx={ { maxWidth: 300 } } >
                    {
                        list_players ? list_players.map(p =>

                            <EventListItem key={ p.player.id } player_data={ p } />
                        )
                            :
                            <Box>Loading...</Box>
                    }
                </List>
            </Box>
        </EventContext.Provider>
    )
}
async function removePlayer(eventId: number, playerId: number) {
    await editOneEvent({ id: eventId }, { players: { disconnect: { id: playerId } } })
}

const EventListItem = ({ player_data }: { player_data: EventListItem }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);
    const handleOpen = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);


    };

    const handleClose = () => {
        setAnchorEl(null);

    };


    return (

        <>
            {

                <ListItem key={ player_data.player.id } dense >
                    <ListItemText
                        primary={ player_data.player.name }
                        secondary={ player_data?.master?.name ?? "" } />
                    <>
                        <IconButton onClick={ handleOpen }>
                            <Icon path={ mdiDotsHorizontalCircleOutline } size={ 1.3 } />
                        </IconButton>
                        <Menu
                            anchorEl={ anchorEl }
                            open={ open }
                            onClose={ handleClose }
                            onClick={ handleClose }
                            transformOrigin={ { horizontal: "right", vertical: "top" } }
                            anchorOrigin={ { horizontal: "right", vertical: "bottom" } }
                        >
                            <MenuItem

                            >
                                1
                            </MenuItem>
                        </Menu>
                    </>
                </ListItem>
            }

        </>
        // </List>
    )
}
EventListItem.displayName = "__EventListItem__"

const AddMenuButton = ({ data, masters }: {
    data: SyncedPlayer
    masters: { id: number, name: string }[]
}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [subAnchorEl, setSub] = useState<null | HTMLElement>(null);
    const sub_open = Boolean(subAnchorEl);
    const queryClient = useQueryClient()
    const { id: playerId, player, master, pairId, masterId, eventId } = data


    const upsert_pair = useCallback(async ({ pairId, playerId, masterId }: { playerId: number, masterId?: number | null, pairId?: number }) =>
        await upsertPair({ id: pairId }, { eventId, playerId, masterId: masterId ?? null, pairId: pairId ?? null }), [eventId])



    const { mutateAsync: updatePairAsync, isPending: isPendingUpdate } = useMutation({
        mutationKey: ['event', 'pair', { pairId, masterId, playerId }],
        mutationFn: async (pair_data: { playerId: number, masterId?: number | null, pairId: number }) =>
            upsert_pair({ ...pair_data }),

    })


    const { mutateAsync: removePairAsync, isPending: isPendingRemove } = useMutation({
        mutationKey: ['event', 'pair', pairId],
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
        handleCloseSub()
    }, [eventId, pairId, playerId, updatePairAsync]
    )
    return (
        <React.Fragment>
            <IconButton onClick={ handleOpen } edge={ 'start' } color='secondary' disabled={ isPendingUpdate }>
                { isPendingUpdate || isPendingRemove
                    ? <CircularProgress />
                    : <Icon path={ mdiDotsHorizontalCircleOutline } size={ 1.5 } />
                }

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
                                onClick={ async () => await handleUpdateMaster(m.id) }>
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