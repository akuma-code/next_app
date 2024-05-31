'use server'
import { PlayersEventList } from "@/Components/EventView/PlayersEventList";
import { getPlayerEvents, getPlayers } from "@/Services/playerService";
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Stack } from "@mui/material";
import Link from "next/link";

async function AvPlayers(query: { searchParams: { action: string, event: string } }) {

    const players = await getPlayers()

    // const show = query?.searchParams?.action ? true : false
    // const showEdit = query?.searchParams?.action === 'edit'
    // const showCreate = query?.searchParams?.action === 'create'
    const playerId = query.searchParams.event
    const eid = playerId ? Number(playerId) : 0
    const ep = await getPlayerEvents(eid)

    // if (players.length === 0) return <div>No players</div>
    return (
        <Stack direction={ 'row' } columnGap={ 2 }
        // sx={ { maxHeight: playerId ? '30vh' : '70vh' } }
        >
            <Stack justifyContent={ 'center' } direction={ { sm: "column", md: "row" } } gap={ 1 }>
                { players.length > 0 ?
                    <Box

                        sx={ {
                            borderRadius: 4,

                            border: "2px solid",
                            borderColor: 'primary.dark',
                            boxShadow: "0 2px 6px 0 rgba(0,0,0,0.08)",
                            bgcolor: "background.paper",
                            // maxHeight: 600,


                        } }
                    >


                        <List dense disablePadding sx={ {
                            maxWidth: 350, m: 2,
                            maxHeight: playerId ? '30vh' : '70vh',
                            // maxHeight: 'inherit',
                            overflowY: 'auto',
                            [`& .MuiListItem-root .Mui-selected`]: { border: '2px solid #00b0ea9d', borderRadius: 2 }
                        } }>
                            { players.map((p, idx) =>
                                <ListItem key={ p.id } sx={ { minWidth: 'fit-content', } } >
                                    <ListItemButton
                                        href={ `?event=${p.id}` }
                                        LinkComponent={ Link }
                                        selected={ p.id === eid } >
                                        <ListItemText
                                            primaryTypographyProps={ { variant: 'body2' } }
                                            primary={ <span>{ idx + 1 }. { p.name }</span> }
                                        />

                                        <ListItemAvatar>
                                            <Avatar
                                                variant="rounded"
                                                sizes="small"
                                                sx={ {
                                                    maxHeight: 28, maxWidth: 28, ml: 1, border: "2px solid",
                                                    borderColor: 'primary.dark',
                                                    boxShadow: "0 2px 6px 0 rgba(0,0,0,0.08)",
                                                } }>{ p._count.events || 0 }</Avatar>
                                        </ListItemAvatar>
                                    </ListItemButton>

                                </ListItem>

                            ) }
                        </List>
                    </Box>
                    :
                    <Box>
                        Игроки в базе не найдены! <Link href="/admin/players">Проверить</Link>
                    </Box>
                }

                <PlayersEventList event_info={ ep } />

            </Stack>


        </Stack>
    );
}


export default AvPlayers;