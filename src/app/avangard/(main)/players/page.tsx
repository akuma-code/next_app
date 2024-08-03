import { PlayersEventList } from "@/Components/EventView/PlayersEventList";
import { getPlayerEvents, getPlayers } from "@/Services/playerService";
import { Box, Stack } from "@mui/material";
import Link from "next/link";
import { PlayersListView } from "./PlayersListView";
import { MRTPlayers } from "@/ClientComponents/MRT/Avangard/MRTPlayers";

async function AvPlayers(query: {
    searchParams: { action: string; player_id: string; view: string };
}) {
    const players = await getPlayers({
        events: true,
        info: true,
        profile: true,
    });
    const view = query.searchParams.view;
    const playerId = query.searchParams.player_id;
    const eid = playerId ? Number(playerId) : 0;
    const ep = await getPlayerEvents(eid);

    return (
        <Stack
            direction={"row"}
            columnGap={2}
            // sx={ { maxHeight: playerId ? '30vh' : '70vh' } }
        >
            <Stack
                justifyContent={"center"}
                direction={{ sm: "column", md: "row" }}
                gap={1}
            >
                {!view || view === "list" ? (
                    <>
                        <PlayersListView
                            players={players}
                            selected={playerId}
                        />
                        <PlayersEventList event_info={ep} />
                    </>
                ) : null}

                {view === "table" ? <MRTPlayers players={players} /> : null}
            </Stack>
        </Stack>
    );
}

export default AvPlayers;
