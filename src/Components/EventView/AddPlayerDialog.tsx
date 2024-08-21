"use client";

import LoadSpinner from "@/app/avangard/loading";
import { _log } from "@/Helpers/helpersFns";
import { useToggle } from "@/Hooks/useToggle";
import { connectOnePlayer } from "@/Services/eventService";
import { getPlayers, loadPlayers } from "@/Services/playerService";
import { mdiDebian } from "@mdi/js";
import { Add } from "@mui/icons-material";
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    LinearProgress,
    Stack,
} from "@mui/material";
import { Prisma } from "@prisma/client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import CreatePlayerBtn from "./CreatePlayerButton";

interface AddPlayerProps {
    event_players: { id: number; name: string }[];
    event_id: number;
}
async function fetchPlayers() {
    const players = await loadPlayers({
        select: { id: true, name: true },
        orderBy: { events: { _count: "desc" } },
    });
    return players;
}
export const AddPlayerDialog: React.FC<AddPlayerProps> = ({
    event_players,
    event_id,
}) => {
    const [open, { on, off }] = useToggle();
    const event_players_Ids = event_players.map((p) => p.id);

    const q = useQuery({
        queryKey: ["players", "all"],
        queryFn: fetchPlayers,
        placeholderData: keepPreviousData,
        select: (data) => data.filter((d) => !event_players_Ids.includes(d.id)),
    });
    if (q.error) {
        _log(q.error);
        return <Box>{q.error.message}</Box>;
    }

    async function handleConnectPlayer(eventId: number, playerId: number) {
        const connect = connectOnePlayer.bind(null, eventId, playerId);
        await connect();
        off();
    }
    if (!q.isSuccess)
        return <LoadSpinner mdiPath={mdiDebian} text="" size={2} />;
    return (
        <>
            <Button
                size="small"
                color="secondary"
                variant="outlined"
                fullWidth
                onClick={on}
                startIcon={<Add />}
            >
                Добавить игрока
            </Button>

            <Dialog open={open} onClose={off}>
                <DialogTitle>Добавить на тренировку</DialogTitle>
                <DialogContent>
                    <Stack
                        maxHeight={"60vh"}
                        direction={"column"}
                        spacing={1}
                        justifyContent={"left"}
                    >
                        {/* <Button
                            sx={{ textAlign: "left" }}
                            variant="contained"
                            size="small"
                            color="error"
                            
                        >
                            Добавить нового игрока
                        </Button> */}
                        <CreatePlayerBtn />
                        {q.data.map((p) => (
                            <Button
                                sx={{ textAlign: "left" }}
                                variant="outlined"
                                size="small"
                                key={p.id}
                                onClick={() =>
                                    handleConnectPlayer(event_id, p.id)
                                }
                            >
                                {p.name}
                            </Button>
                        ))}
                    </Stack>
                </DialogContent>
            </Dialog>
        </>
    );
};
