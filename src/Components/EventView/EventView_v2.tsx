'use client'
import React, { Dispatch, SetStateAction, useCallback, useContext, useMemo } from 'react'

import { _dbDateParser } from "@/Helpers/dateFuncs"
import { eventSelect, getPlayersList, syncPlayers, useGetEvent } from "@/Hooks/Queries/Events/useEvents"
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
    master: { id: number, name: string }
    eventId: number

}
export interface EventContextData {
    id?: number
    date_formated?: string,
    title?: string | null
    players?: { id: number, name: string }[]
    masters?: Record<string, { name: string }>

}
export interface EventCtx {
    event?: EventContextData | null
    updater?: Dispatch<SetStateAction<EventContextData | undefined>>
}

export const EventContext = React.createContext<EventCtx | null>(null)

const EventView_v2 = ({ eventId, masters }: EventViewProps) => {
    const { data, error, isSuccess, isLoading, isError } = useGetEvent({ id: eventId })
    // const [state, setState] = useState(data)
    const [context, setContext] = useState<EventContextData | undefined>()

    const event_data = useMemo(() => {


        const res = eventSelect(data, masters)

        return res


    }, [data])

    console.log(event_data)
    // {
    // id: eventId,
    // players: data?.players,
    // masters: masters,
    // date_formated: data?.date_formated,
    // title: data?.title
    // }
    // );



    // const list_players: SyncedPlayer[] = useMemo(() => {
    //     if (!data) return []
    //     const list = syncPlayers(data ?? undefined)
    //         .map(p => p.pair
    //             ? ({
    //                 id: p.id,
    //                 player: p.name,
    //                 eventId: data.id,
    //                 master: masters[p.pair.masterId.toString()].name,
    //                 pairId: p.pair.id,
    //                 masterId: p.pair.masterId,
    //             })
    //             : {
    //                 player: p.name,
    //                 id: p.id,
    //                 eventId: data.id
    //             })
    //     return list
    // }, [data, masters])

    if (error) return (<Alert><p>{ error?.message }</p></Alert>)
    // const mastersArray = Object.entries(masters).map(([id, { name }]) => ({ id: Number(id), name }))
    // if (isLoading || !data) return <CircularProgress />
    // const { dd_mm_yyyy } = _dbDateParser(data?.date_formated ?? "");
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

                {/* { isLoading &&
                <CircularProgress />
            } */}
                <Typography variant="h5" component={ 'div' } textAlign={ 'center' }>
                    { context?.title || "No title" }
                </Typography>
                <List dense sx={ { maxWidth: 300 } } >

                    {
                        // isSuccess && state?.map(s =>
                        //     <ListItem key={ s.player.id } dense >
                        //         <ListItemText
                        //             primary={ s.player.name }
                        //             secondary={ s.master ? masters[s.master.id].name : "" } />
                        //         <IconButton>
                        //             <Icon path={ mdiDotsHorizontalCircleOutline } size={ 1.3 } />
                        //         </IconButton>
                        //     </ListItem>
                        // )
                    }

                    {/* {
                        data ?
                            data.player_pairs.map(row =>

                                <EventListItem player_data={ {...row, eventId:data.eventId} } masters={ masters } key={ row.player.id } />
                            )
                            : <CircularProgress />
                    } */}
                    {
                        // list_players.map(p =>
                        //     <ListItem key={ p.id }
                        //         divider
                        //         // alignItems='center'
                        //         sx={ {
                        //             display: "flex",
                        //             flexDirection: "row",
                        //             justifyContent: "space-between",

                        //         } }
                        //     >

                        //         <ListItemText
                        //             primary={ p.player }
                        //             secondary={ p.master }
                        //         />

                        //         <AddMenuButton data={ p } masters={ mastersArray } />
                        //         {/* <ButtonGroup >                        </ButtonGroup> */ }
                        //     </ListItem>
                        // )
                    }


                </List>
            </Box>
        </EventContext.Provider>
    )
}
async function removePlayer(eventId: number, playerId: number) {
    await editOneEvent({ id: eventId }, { players: { disconnect: { id: playerId } } })
}

const EventListItem = ({ player_data, masters }: { player_data: EventListItem, masters: Record<string, { name: string }> }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const ctx = useContext(EventContext)
    // if (!ctx || !ctx.event) return null
    // const { event, updater } = ctx;
    const open = Boolean(anchorEl);
    const handleOpen = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
        console.clear()
        // console.log(ctx.event)
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
                        secondary={ player_data.master ? masters[player_data.master.id].name : "" } />
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
                            // onClick={ () => updater(prev => ({ ...prev, title: player_data.player.name })) }
                            >1</MenuItem>
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
        // onMutate({ id, playerId, masterId }) {
        //     queryClient.setQueryData(["event"], (prevEvs: any[]) => {

        //     })
        // }
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