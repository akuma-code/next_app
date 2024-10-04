import { PlayersEventList } from "@/Components/EventView/PlayersEventList";
import { getPlayerEvents, getPlayers } from "@/Services/playerService";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { PlayersListView } from "./PlayersListView";
import { CalendarEventsShorts } from "@/ClientComponents/UI/Charts/CalenarWithShortcuts";
import { Suspense } from "react";

async function AvPlayers(query: {
    searchParams: { action: string; player_id?: string; view: string };
}) {
    const players = await getPlayers();
    const view = query.searchParams.view;
    const playerId = query.searchParams.player_id;

    // const ep = playerId ? await getPlayerEvents(+playerId) : undefined;

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
                        {/* {ep && <PlayersEventList event_info={ep} />} */}
                        {playerId ? (
                            <Suspense fallback={"loading..."}>
                                <CalendarEventsShorts playerId={+playerId} />
                            </Suspense>
                        ) : (
                            <Paper>
                                <Typography
                                    variant="body1"
                                    component={"div"}
                                    p={2}
                                >
                                    <p>
                                        Никто не выбран. Для просмотра календаря
                                        посещений выберете игрока из списка
                                    </p>
                                </Typography>
                            </Paper>
                        )}
                    </>
                )}
            </Stack>
        </Stack>
    );
}

export default AvPlayers;
