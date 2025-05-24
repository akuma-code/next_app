import { CalendarEventsShorts } from "@/ClientComponents/UI/Charts/CalenarWithShortcuts";
import { getPlayers } from "@/Services/playerService";
import { Paper, Stack, Typography } from "@mui/material";
import { Suspense } from "react";
import { PlayersListView } from "./PlayersListView";

async function AvPlayers(query: {
    searchParams: { action: string; player_id?: string; view: string };
}) {
    const players = await getPlayers();
    const view = query.searchParams.view;
    const playerId = query.searchParams.player_id;

    // const ep = playerId ? await getPlayerEvents(+playerId) : undefined;

    return (
        <Stack
            direction={ "row" }
            columnGap={ 2 }
            p={ 2 }
        // sx={ { maxHeight: playerId ? '30vh' : '70vh' } }
        >
            <Stack
                justifyContent={ "center" }
                direction={ { sm: "column", md: "row" } }
                gap={ 2 }
            >
                <PlayersListView
                    players={ players }
                    selected={ playerId || null }
                />

                { playerId ? (
                    <Suspense fallback={ "loading..." }>
                        <CalendarEventsShorts playerId={ +playerId } />
                    </Suspense>
                ) : (
                    <Paper>
                        <Typography
                            variant="body1"
                            component={ "div" }
                            p={ 2 }
                            whiteSpace={ "normal" }
                        >
                            <p>
                                Никто не выбран. Для просмотра календаря
                                посещений выберете игрока из списка
                            </p>
                        </Typography>
                    </Paper>
                ) }
            </Stack>
        </Stack>
    );
}

export default AvPlayers;
