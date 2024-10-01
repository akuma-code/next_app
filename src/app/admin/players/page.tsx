import CreatePlayerForm from "@/ClientComponents/CreatePlayerForm";
import { GET_PLAYERS, getPlayers } from "@/Services/playerService";
import { Box, Stack } from "@mui/material";
import AdminPlayerList from "./AdminPlayerList";

import MRT_Players_v2 from "@/ClientComponents/MRT/Avangard/MRT_Players_v2";
import { PrismaPlayer_ } from "@/Types";

// const clone_action = fetchAndCreatePlayers.bind(null);

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
    const p = (await GET_PLAYERS({})) as PrismaPlayer_[];

    return (
        <Box
            maxWidth={{ lg: "fit-content", xs: "90vw" }}
            minWidth={{ lg: 700, xs: 300 }}
            border="1px solid orange"
            // p={1}
        >
            <MRT_Players_v2 preload={p} />
        </Box>
    );
}

export default AdminPlayersPage;
