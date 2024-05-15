'use client'

import { PlayerWithInfo, getPlayers } from "@/Services/playerService"
import { PlayersList } from "@/app/avangard/PlayersList"
import { Box, List, ListItem, ListItemButton, Stack } from "@mui/material"
import { Player, PlayerInfo } from "@prisma/client"
import dayjs from "dayjs"
import { useCallback, useEffect, useState } from "react"


type PlayersTransferProps = {
    dbPlayers: PlayerWithInfo[]
}
export const PlayersEventTranfer: React.FC<PlayersTransferProps> = ({ dbPlayers }) => {
    const [players, setPlayers] = useState<PlayerWithInfo[]>(() => dbPlayers)
    const [eventPlayers, setEventPlayers] = useState<PlayerWithInfo[]>([])
    const [eventDate, setEventDate] = useState(() => dayjs().format('DD/MM/YYYY'))

    const handleSelect = useCallback((player: PlayerWithInfo) => {

        setEventPlayers(prev => prev.includes(player)
            ? prev.filter(p => p.id !== player.id)
            : [...prev, player])
    }, [eventPlayers])
    return (
        <>
            <Stack direction={ 'row' } gap={ 2 }>
                <Box border={ 2 } borderRadius={ 1 }>

                    <List >
                        { players.length > 0 ?
                            players.map(p =>
                                <ListItem key={ p.id }
                                    disablePadding
                                    dense
                                    sx={ {
                                        // bgcolor: isInGroup(p.id) ? "beige" : 'inherit'
                                    } }
                                >
                                    <ListItemButton
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


                { eventPlayers.length > 0 ?
                    <Box border={ 2 } borderRadius={ 1 }>
                        <List >
                            { eventPlayers.map(p =>
                                <ListItem key={ p.id }
                                    disablePadding
                                    dense
                                    sx={ {
                                        // bgcolor: isInGroup(p.id) ? "beige" : 'inherit'
                                    } }
                                >
                                    <ListItemButton

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


            </Stack>

        </>
    )
}

PlayersEventTranfer.displayName = '_____PlayersTransferList'