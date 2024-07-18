'use server'
import CreatePlayerForm from "@/ClientComponents/CreatePlayerForm";
import EditPlayerForm from "@/ClientComponents/EditPlayerForm";
import { getPlayers } from "@/Services/playerService";
import { Box, Button, Stack } from "@mui/material";
import Link from "next/link";
import AdminPlayerList from "./AdminPlayerList";


async function AvPlayers(query: { searchParams: { action: string } }) {

    const players = await getPlayers()

    const show = query?.searchParams?.action ? true : false
    const showEdit = query?.searchParams?.action === 'edit'
    const showCreate = query?.searchParams?.action === 'create'
    const showDel = query?.searchParams?.action === 'delete'
    // if (players.length === 0) return <div>No players</div>
    return (
        <Stack direction={ 'row' } justifyContent={ 'space-between' } width={ 800 } gap={ 2 } >
            <Stack direction={ 'row' } >

                <Box ml={ 2 } pr={ 4 } flexGrow={ 1 }>

                    { players.length > 0 ?
                        <AdminPlayerList players={ players }></AdminPlayerList>
                        : <div>
                            No players found
                        </div>
                    }
                </Box>
                <Stack gap={ 1 } flexGrow={ 1 } useFlexGap ml={ 3 } >

                    {
                        showCreate ?

                            <CloseFormButton />
                            :
                            <ShowCreateFormButton />
                    }
                    <Link href={ { query: showDel ? { action: "" } : { action: 'delete' } } }>
                        <Button variant="contained">
                            Delete mode: { showDel ? 'on' : "off" }
                        </Button>
                    </Link>
                </Stack>
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
        <Button variant="contained" color="secondary" fullWidth>
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