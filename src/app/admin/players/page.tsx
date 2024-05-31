'use server'
import CreatePlayerForm from "@/ClientComponents/CreatePlayerForm";
import EditPlayerForm from "@/ClientComponents/EditPlayerForm";
import DeleteButton from "@/ClientComponents/UI/DeleteButton";
import { getPlayers } from "@/Services/playerService";
import { DeleteTwoTone, EditTwoTone } from "@mui/icons-material";
import { Box, Button, List, ListItem, ListItemButton, ListItemText, Stack } from "@mui/material";
import Link from "next/link";

async function AvPlayers(query: { searchParams: { action: string } }) {

    const players = await getPlayers()

    const show = query?.searchParams?.action ? true : false
    const showEdit = query?.searchParams?.action === 'edit'
    const showCreate = query?.searchParams?.action === 'create'
    // if (players.length === 0) return <div>No players</div>
    return (
        <Stack direction={ 'row' } columnGap={ 2 }>
            <Stack >
                <Box ml={ 2 }>

                    {
                        show ?

                            <CloseFormButton />
                            :
                            <ShowCreateFormButton />
                    }
                </Box>
                { players.length > 0 ?
                    <List dense disablePadding>
                        { players.map((p, idx) =>

                            <ListItem key={ p.id }>
                                <ListItemButton LinkComponent={ Link } href={ `players/${p.id}?action=edit` }>
                                    <ListItemText
                                        secondaryTypographyProps={ { ml: 2 } }
                                        primary={ p.name }

                                        secondary={
                                            p.info?.rttf_score &&
                                            <span> рейтинг: { p.info?.rttf_score }</span>
                                        }
                                    />
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

    return <Link href='/admin/players'>
        <Button variant="contained" color="secondary">
            Close
        </Button>
    </Link>;
}

function ShowCreateFormButton() {

    return (
        <Link href={ '/admin/players?action=create' } >
            <Button variant="contained" color="primary" >

                Добавить игрока
            </Button>
        </Link>
    )
}



export default AvPlayers;