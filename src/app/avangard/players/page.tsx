'use server'
import CreatePlayerForm from "@/ClientComponents/CreatePlayerForm";
import EditPlayerForm from "@/ClientComponents/EditPlayerForm";
import DeleteButton from "@/ClientComponents/UI/DeleteButton";
import { PlayersEventList } from "@/Components/EventView/PlayersEventList";
import { getPlayerEvents, getPlayers } from "@/Services/playerService";
import { DeleteTwoTone, EditTwoTone, InfoTwoTone } from "@mui/icons-material";
import { Avatar, Box, Button, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Stack } from "@mui/material";
import { wrap } from "module";
import Link from "next/link";

async function AvPlayers(query: { searchParams: { action: string, event: string } }) {

    const players = await getPlayers()

    const show = query?.searchParams?.action ? true : false
    const showEdit = query?.searchParams?.action === 'edit'
    const showCreate = query?.searchParams?.action === 'create'
    const playerId = query.searchParams.event
    const eid = playerId ? Number(playerId) : 0
    const ep = await getPlayerEvents(eid)
    const isSelected = (id: number) => +id === eid
    // if (players.length === 0) return <div>No players</div>
    return (
        <Stack direction={ 'row' } columnGap={ 2 }>
            <Stack justifyContent={ 'center' } direction={ { sm: "column", md: "row" } } gap={ 1 }>
                { players.length > 0 ?
                    <Box

                        sx={ {
                            borderRadius: 4,

                            border: "1px solid",
                            borderColor: 'lightgray',
                            bgcolor: "background.paper",
                            boxShadow: "0 2px 6px 0 rgba(0,0,0,0.08)",
                            // maxHeight: 600,

                        } }
                    >


                        <List dense disablePadding sx={ { maxWidth: 350, p: 2, maxHeight: playerId ? '30vh' : '70vh', overflowY: 'auto' } }>
                            { players.map((p, idx) =>
                                <ListItem key={ p.id } sx={ { minWidth: 'fit-content', } } >
                                    <ListItemText
                                        primaryTypographyProps={ { variant: 'body2' } }
                                        secondaryTypographyProps={ { ml: 2 } }
                                        primary={
                                            <Link href={ {
                                                pathname: 'players/' + p.id.toString(),
                                            } }
                                                className="hover:underline"
                                            >
                                                { idx + 1 }. { p.name }
                                            </Link>
                                        }
                                        secondary={
                                            p.info?.rttf_score &&
                                            <span> рейтинг: { p.info?.rttf_score }</span>
                                        }
                                    />
                                    <Box display={ "flex" } justifyContent={ 'center' } gap={ 0 } pl={ 2 }>

                                        <ListItemAvatar>
                                            <Avatar variant="rounded" sizes="small" sx={ { maxHeight: 28, maxWidth: 28, } }>{ p._count.events || 0 }</Avatar>
                                        </ListItemAvatar>
                                        <ListItemButton disableGutters href={ `?event=${p.id}` } LinkComponent={ Link } selected={ isSelected(p.id) }>
                                            <InfoTwoTone />
                                        </ListItemButton>
                                    </Box>
                                    {/* <ListItemButton LinkComponent={ Link } href={ `players/${p.id}?action=edit&id=${p.id}` }>
                                        <EditTwoTone />
                                    </ListItemButton>
                                    <ListItemButton color="red">
                                        <DeleteButton deleteId={ +p.id }>
                                            <DeleteTwoTone />
                                        </DeleteButton>
                                    </ListItemButton> */}
                                </ListItem>

                            ) }
                        </List>
                    </Box>
                    : <div>
                        No players found
                    </div>
                }

                <PlayersEventList event_info={ ep } />

            </Stack>

            {
                showCreate &&
                <CreatePlayerForm />
            }
            {
                showEdit &&
                <EditPlayerForm />
            }
        </Stack>
    );
}


function CloseFormButton() {

    return <Link href='/avangard/players'>
        <Button variant="contained" color="secondary">
            Close
        </Button>
    </Link>;
}

function ShowCreateFormButton() {

    return (
        <Link href={ '/avangard/players?action=create' } >
            <Button variant="contained" color="primary" >

                Добавить игрока
            </Button>
        </Link>
    )
}



export default AvPlayers;