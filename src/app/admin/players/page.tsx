import CreatePlayerForm from "@/ClientComponents/CreatePlayerForm";
import EditPlayerForm from "@/ClientComponents/EditPlayerForm";
import { getPlayers } from "@/Services/playerService";
import { Box, Button, Stack } from "@mui/material";
import Link from "next/link";
import AdminPlayerList from "./AdminPlayerList";
import { _log } from "@/Helpers/helpersFns";




async function AvPlayers(query: { searchParams: { action: string } }) {

    const players = await getPlayers()

    const showEdit = query?.searchParams?.action === 'edit'
    const showCreate = query?.searchParams?.action === 'create'
    const showDel = query?.searchParams?.action === 'delete'

    // if (players.length === 0) return <div>No players</div>
    return (
        <Stack direction={ 'row' } justifyContent={ 'space-between' } maxWidth={ 800 } gap={ 2 } >
            <Stack direction={ 'row' } flexGrow={ 2 }>

                <Box ml={ 2 } pr={ 4 } flexGrow={ 1 }>

                    <AdminPlayerList players={ players }></AdminPlayerList>

                </Box>
                <Stack gap={ 1 } flexGrow={ 1 } useFlexGap m={ 3 } minWidth={ 170 }>
                    <ShowCreateFormButton />
                    <Link href={ { query: showDel ? null : { action: 'delete' } } }>
                        <Button variant="contained">
                            Delete mode: { showDel ? 'on' : "off" }
                        </Button>
                    </Link>
                    <CloseFormButton />

                </Stack>
            </Stack>
            <Box flexGrow={ 1 } mt={ 1 }>

                {
                    showCreate &&
                    <CreatePlayerForm />
                }
                {
                    showEdit &&
                    <EditPlayerForm />
                }
            </Box>
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