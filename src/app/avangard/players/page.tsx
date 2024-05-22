'use server'
import CreatePlayerForm from "@/ClientComponents/CreatePlayerForm";
import EditPlayerForm from "@/ClientComponents/EditPlayerForm";
import DeleteButton from "@/ClientComponents/UI/DeleteButton";
import { getPlayers } from "@/Services/playerService";
import { DeleteTwoTone, EditTwoTone } from "@mui/icons-material";
import { Avatar, Box, Button, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Stack } from "@mui/material";
import { wrap } from "module";
import Link from "next/link";

async function AvPlayers(query: { searchParams: { action: string } }) {

    const players = await getPlayers()

    const show = query?.searchParams?.action ? true : false
    const showEdit = query?.searchParams?.action === 'edit'
    const showCreate = query?.searchParams?.action === 'create'
    // if (players.length === 0) return <div>No players</div>
    return (
        <Stack direction={ 'row' } columnGap={ 2 }>
            <Stack justifyContent={ 'center' }>
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


                        <List dense disablePadding sx={ { maxWidth: 300 } }>
                            { players.map((p, idx) =>
                                <ListItem key={ p.id } sx={ { minWidth: 'fit-content', } }>
                                    <ListItemText
                                        primaryTypographyProps={ { variant: 'body1' } }
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
                                    <ListItemAvatar>
                                        <Avatar variant="rounded">{ p._count.events || 0 }</Avatar>
                                    </ListItemAvatar>
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