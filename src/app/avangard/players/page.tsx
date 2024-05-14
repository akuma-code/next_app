'use server'
import CreatePlayerForm from "@/ClientComponents/CreatePlayerForm";
import EditPlayerForm from "@/ClientComponents/EditPlayerForm";
import DeleteButton from "@/ClientComponents/UI/DeleteButton";
import { createPlayer, getOnePlayer, getPlayers } from "@/Services/playerService";
import { DeleteTwoTone, EditTwoTone } from "@mui/icons-material";
import { Box, Button, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from "@mui/material";
import { PlayerInfo } from "@prisma/client";
import Link from "next/link";

async function AvPlayers(query?: { searchParams?: { action: string } }) {

    const players = await getPlayers("info")

    const show = query?.searchParams?.action ? true : false
    const showEdit = query?.searchParams?.action === 'edit'
    const showCreate = query?.searchParams?.action === 'create'
    // if (players.length === 0) return <div>No players</div>
    return (
        <Stack direction={ 'row' } columnGap={ 2 }>
            <Stack >

                { players.length > 0 ?
                    <List dense disablePadding>
                        { players.map((p, idx) =>

                            <ListItem key={ p.id }>
                                <ListItemText
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
                                        p.PlayerInfo?.rttf_score &&
                                        <span> рейтинг: { p.PlayerInfo?.rttf_score }</span>
                                    }
                                />
                                <ListItemButton LinkComponent={ Link } href={ `players/${p.id}?action=edit&id=${p.id}` }>
                                    <EditTwoTone />
                                </ListItemButton>
                                <ListItemButton color="red">
                                    <DeleteButton deleteId={ +p.id }>
                                        <DeleteTwoTone />
                                    </DeleteButton>
                                </ListItemButton>
                            </ListItem>
                        ) }
                    </List>
                    : <div>
                        No players found
                    </div>
                }
                <Box ml={ 2 }>

                    {
                        show ?

                            <CloseFormButton />
                            :
                            <ShowCreateFormButton />
                    }
                </Box>
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