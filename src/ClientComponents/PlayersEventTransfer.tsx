'use client'

import { useItemStore } from "@/Hooks/useItemStore"
import { PlayerWithInfo, getPlayers } from "@/Services/playerService"
import { PlayersList } from "@/app/avangard/PlayersList"
import { Box, Button, List, ListItem, ListItemButton, Stack, Typography } from "@mui/material"
import { Player, PlayerInfo } from "@prisma/client"
import dayjs from "dayjs"
import { useCallback, useEffect, useMemo, useState } from "react"


type PlayersTransferProps = {
    dbPlayers: PlayerWithInfo[]
}
export const PlayersEventTranfer: React.FC<PlayersTransferProps> = ({ dbPlayers }) => {
    const [init] = dbPlayers.map(p => p.id).flat()
    const [players, setPlayers] = useState<PlayerWithInfo[]>(() => dbPlayers)
    const [store, dispatch] = useItemStore(init)

    const inQueue = (id: number) => store.includes(id)
    // const [eventPlayers, setEventPlayers] = useState<PlayerWithInfo[]>([])
    const [eventDate, setEventDate] = useState(() => dayjs().format('DD-MM-YYYY'))
    const selected = useMemo(() => dbPlayers.filter(i => inQueue(i.id)), [store])


    const handleSelect = useCallback((player: PlayerWithInfo) => {
        inQueue(player.id) ? dispatch.remove(player.id) : dispatch.add(player.id)


    }, [selected, dispatch])


    return (
        <>
            <Stack direction={ 'row' } gap={ 2 } p={ 3 } justifyContent={ 'space-between' } width={ '100%' }>
                <Box border={ 2 } borderRadius={ 1 }>

                    <List >
                        { players.length > 0 ?
                            players.map(p =>
                                <ListItem key={ p.id }
                                    disablePadding
                                    dense

                                    sx={ {
                                        bgcolor: inQueue(p.id) ? "#e79703" : 'inherit'
                                    } }
                                >
                                    <ListItemButton
                                        selected={ inQueue(p.id) }
                                        onClick={ () => handleSelect(p) }

                                    >
                                        { p.name }
                                    </ListItemButton>
                                </ListItem>
                            )
                            :
                            <ListItem>
                                List is empty
                            </ListItem>
                        }
                    </List>
                </Box>
                <Stack spacing={ 2 }>

                    <Button variant="outlined"
                        sx={ { flexGrow: 0, alignSelf: 'flex-start' } }>Create Event</Button>
                    <Button variant="contained" color="secondary"
                        sx={ { flexGrow: 0, alignSelf: 'flex-start' } }
                        onClick={ dispatch.clear }>Clear</Button>
                </Stack>
                <Box >

                    <Typography>

                        Всего: { selected.length }
                    </Typography>
                    { selected.length > 0 ?
                        <Box border={ 2 } borderRadius={ 1 }>
                            <List >

                                { selected.map(p =>
                                    <ListItem key={ p.id }
                                        disablePadding
                                        dense
                                    // sx={ {
                                    //     bgcolor: inQueue(p.id) ? "#fcf7f5" : 'inherit'
                                    // } }
                                    >
                                        <ListItemButton
                                            onClick={ () => dispatch.remove(p.id) }
                                        >
                                            { p.name }
                                        </ListItemButton>
                                    </ListItem>
                                )
                                }
                            </List>
                        </Box>
                        : null
                    }

                </Box>


            </Stack>

        </>
    )
}

PlayersEventTranfer.displayName = '_____PlayersTransferList'