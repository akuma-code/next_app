'use server'
import CreatePlayerForm from "@/ClientComponents/CreatePlayerForm";
import EditPlayerForm from "@/ClientComponents/EditPlayerForm";
import DeleteButton from "@/ClientComponents/UI/DeleteButton";
import { createPlayer, getPlayers } from "@/Services/playerService";
import { DeleteTwoTone, EditNotificationsTwoTone, EditTwoTone } from "@mui/icons-material";
import { Box, Button, IconButton, List, ListItem, ListItemButton, ListItemText, Paper, Stack, Typography } from "@mui/material";
import { PlayerInfo } from "@prisma/client";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { deletePlayerAction } from "./actions";

async function AvPlayers(query?: { searchParams?: { action: string } }) {

    const players = await getPlayers("info")
    // if (players.length === 0) return <div>No players</div>
    return (
        <Stack direction={ 'row' } columnGap={ 2 }>
            <Stack >

                { players.length > 0 ?
                    <List dense disablePadding>
                        { players.map((p, idx) =>

                            <ListItem key={ p.id }>
                                <ListItemText>
                                    <Typography variant="body1">
                                        <Link href={ {
                                            pathname: 'players/' + p.id.toString(),
                                        } }
                                            className="hover:underline"
                                        >

                                            { idx + 1 }. { p.name }
                                        </Link>
                                    </Typography>
                                    {
                                        p.PlayerInfo?.rttf_score &&
                                        <Typography variant="body2" ml={ 2 }>
                                            рейтинг: { p.PlayerInfo?.rttf_score }
                                        </Typography>
                                    }
                                </ListItemText>


                                <ListItemButton color="red">
                                    <Link href={ {
                                        pathname: '/avangard/players',
                                        query: { action: 'delete', id: p.id }
                                    } }>

                                        <DeleteButton deleteId={ p.id } formAction={ deletePlayerAction }>
                                            <DeleteTwoTone />
                                        </DeleteButton>
                                    </Link>
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
                        query?.searchParams?.action ?

                            <CloseFormButton />
                            :
                            <ShowCreateFormButton />
                    }
                </Box>
            </Stack>


            <CreatePlayerForm faction={ createPlayerAction } />
            <EditPlayerForm />
        </Stack>
    );
}

async function createPlayerAction(formdata: FormData) {
    'use server'
    const data = Object.fromEntries(formdata.entries()) as { name?: string, info?: Partial<PlayerInfo> }
    const { name, info } = data;
    if (!name) return
    const p = await createPlayer(name, info)
    return
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