import { PlayersEventList } from "@/Components/EventView/PlayersEventList";
import { getPlayerEvents, getPlayers } from "@/Services/playerService";
import { Stack } from "@mui/material";
import { PlayersListView } from "./PlayersListView";

async function AvPlayers(query: {
    searchParams: { action: string; player_id?: string; view: string };
}) {
    const players = await getPlayers();
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
            </Stack>
        </Stack>
    );
}

export default AvPlayers;
