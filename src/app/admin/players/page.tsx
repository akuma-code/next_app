import CreatePlayerForm from "@/ClientComponents/CreatePlayerForm";
import { getPlayers } from "@/Services/playerService";
import { Box, Button, Stack } from "@mui/material";
import Link from "next/link";
import AdminPlayerList from "./AdminPlayerList";

import { MRTPlayers } from "@/ClientComponents/MRT/Avangard/MRTPlayers";
import { fetchAndCreatePlayers } from "@/Services/events/db_event";
import { PageContainer } from "@toolpad/core";

const clone_action = fetchAndCreatePlayers.bind(null);

async function AvPlayers(query: { searchParams: { action: string } }) {
    const players = await getPlayers();

    const showCreate = query?.searchParams?.action === "create";
    const showDel = query?.searchParams?.action === "delete";

    // if (players.length === 0) return <div>No players</div>
    return (
        <Stack
            direction={"row"}
            justifyContent={"space-between"}
            maxWidth={800}
            gap={2}
        >
            <Stack direction={"row"} flexGrow={2}>
                <Box ml={2} pr={4} flexGrow={1}>
                    <AdminPlayerList players={players}></AdminPlayerList>
                </Box>
                {/* <Stack gap={1} flexGrow={1} useFlexGap m={3} minWidth={170}>
                    <ShowCreateFormButton />
                    <Link href={{ query: showDel ? {} : { action: "delete" } }}>
                        <Button variant="contained" fullWidth>
                            Delete mode: {showDel ? "on" : "off"}
                        </Button>
                    </Link>
                    <CloseFormButton />

                    <DescriptionButtonQuery
                        action={clone_action}
                        title="Sync players"
                        description="Синхронизация игроков с сервером"
                    />
                </Stack> */}
            </Stack>
            <Box flexGrow={1} mt={1}>
                {showCreate && <CreatePlayerForm />}
            </Box>
        </Stack>
    );
}

async function AdminPlayersPage() {
    // const p = await getPlayers();

    return <MRTPlayers />;
}

function CloseFormButton() {
    return (
        <Link href="/admin/players">
            <Button variant="contained" color="secondary" fullWidth>
                Close
            </Button>
        </Link>
    );
}

function ShowCreateFormButton() {
    return (
        <Link href={"/admin/players?action=create"}>
            <Button variant="contained" color="primary" fullWidth>
                Добавить игрока
            </Button>
        </Link>
    );
}

export default AdminPlayersPage;
