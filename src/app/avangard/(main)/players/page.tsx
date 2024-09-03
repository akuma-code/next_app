import { PlayersEventList } from "@/Components/EventView/PlayersEventList";
import { getPlayerEvents, getPlayers } from "@/Services/playerService";
import { Box, Stack } from "@mui/material";
import Link from "next/link";
import { PlayersListView } from "./PlayersListView";
import { MRTPlayers } from "@/ClientComponents/MRT/Avangard/MRTPlayers";

async function AvPlayers(query: {
    searchParams: { action: string; player_id?: string; view: string };
}) {
    const players = await getPlayers({
        ticket: true,
        pair: true,
        events: true,
    });
    const view = query.searchParams.view;
    const playerId = query.searchParams.player_id;

    const ep = playerId ? await getPlayerEvents(+playerId) : undefined;

    return (
        <Stack
            direction={"row"}
            columnGap={2}
            // sx={ { maxHeight: playerId ? '30vh' : '70vh' } }
        >
            <Stack
                justifyContent={"center"}
                direction={{ sm: "column", md: "row" }}
                gap={2}
            >
                {(view === "list" || !view) && (
                    <>
                        <PlayersListView
                            players={players}
                            selected={playerId || null}
                        />
                        {ep && <PlayersEventList event_info={ep} />}
                    </>
                )}

                {view === "table" ? <MRTPlayers players={players} /> : null}
            </Stack>
        </Stack>
    );
}

export default AvPlayers;
