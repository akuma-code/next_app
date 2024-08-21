import CreatePlayerForm from "@/ClientComponents/CreatePlayerForm";
import EditPlayerForm from "@/ClientComponents/EditPlayerForm";
import { getPlayers } from "@/Services/playerService";
import { Box, Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import AdminPlayerList from "./AdminPlayerList";
import { _log } from "@/Helpers/helpersFns";

async function AvPlayers(query: { searchParams: { action: string } }) {
    const players = await getPlayers();

    const showEdit = query?.searchParams?.action === "edit";
    const showCreate = query?.searchParams?.action === "create";
    const showDel = query?.searchParams?.action === "delete";

    // if (players.length === 0) return <div>No players</div>
    return (
        <Stack
            direction={"row"}
            justifyContent={"space-between"}
            // maxWidth={800}
            gap={2}
        >
            <Box p={1}>
                <Button variant="contained" fullWidth>
                    <Link
                        href={{ query: showDel ? null : { action: "delete" } }}
                    >
                        Delete mode: {showDel ? "on" : "off"}
                    </Link>
                </Button>
                <AdminPlayerList players={players} />
            </Box>

            <Box flexGrow={1} mt={1}>
                {showCreate && <CreatePlayerForm />}
                {showEdit && <EditPlayerForm />}
            </Box>
        </Stack>
    );
}

function CloseFormButton() {
    return (
        <Button
            variant="contained"
            color="secondary"
            fullWidth
            LinkComponent={Link}
            href="/admin/players"
        >
            Close
        </Button>
    );
}

function ShowCreateFormButton() {
    return (
        <Button
            variant="contained"
            color="primary"
            href={"/admin/players?action=create"}
            LinkComponent={Link}
        >
            <Typography variant="body2">Добавить игрока</Typography>
        </Button>
    );
}

export default AvPlayers;
