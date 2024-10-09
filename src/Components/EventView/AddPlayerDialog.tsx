"use client";

import { _log } from "@/Helpers/helpersFns";
import { useToggle } from "@/Hooks/useToggle";
import { getPlayers } from "@/Services/playerService";
import { connectPlayerWithTicket } from "@/Services/tickets/ticketActions";
import { mdiAccountMultiplePlus, mdiCashMinus } from "@mdi/js";
import Icon from "@mdi/react";
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Stack,
} from "@mui/material";
import {
    keepPreviousData,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

interface AddPlayerProps {
    event_players: { id: number; name: string }[];
    event_id: number;
}

function useConnectPlayer(eventId: number) {
    console.log({ eventId });
    return useMutation({
        mutationFn: (playerId: number) =>
            connectPlayerWithTicket(
                { id: eventId },
                { playerId: playerId, cost: 1 }
            ),
    });
}
async function fetchPlayers() {
    const players = await fetch("/api/db/player");
    console.table(players.json());
    return players.json() as unknown as {
        id: number;
        name: string;
        ticket?: any | null;
    }[];
}
const AddPlayerDialog: React.FC<AddPlayerProps> = ({
    event_players,
    event_id,
}) => {
    const [open, { on, off }] = useToggle();
    const eventIds = event_players.map((p) => p.id);

    const q = useQuery({
        queryKey: ["players", "id"],
        queryFn: async (key) => await fetchPlayers(),
        placeholderData: keepPreviousData,
        select: (data) => data.filter((d) => !eventIds.includes(d.id)),
    });

    const { mutateAsync: connectPlayer, isPending: isConnecting } =
        useConnectPlayer(event_id);

    if (q.error) {
        _log(q.error);
        return <Box>Fetch players error</Box>;
    }

    async function handleConnectPlayer(eventId: number, playerId: number) {
        const connect = connectPlayerWithTicket.bind(
            null,
            { id: eventId },
            { playerId: playerId, cost: 1 }
        );
        await connect();
        off();
    }
    // if (!q.isSuccess)
    //     return <LoadSpinner mdiPath={mdiDebian} text="" size={2} />;
    return (
        <>
            <Button
                color="secondary"
                size="small"
                variant="contained"
                sx={{ alignItems: "center" }}
                onClick={on}
                startIcon={<Icon path={mdiAccountMultiplePlus} size={0.8} />}
            >
                Добавить
            </Button>

            <Dialog open={open} onClose={off}>
                <DialogTitle>Добавить на тренировку</DialogTitle>
                <DialogContent>
                    <Stack
                        direction={"column"}
                        spacing={1}
                        justifyContent={"left"}
                    >
                        {q.data?.map((p) => (
                            <Button
                                sx={{ textAlign: "left" }}
                                variant="outlined"
                                size="small"
                                key={p.id}
                                onClick={
                                    () => connectPlayer(p.id)
                                    // handleConnectPlayer(event_id, p.id)
                                }
                                endIcon={
                                    p.ticket ? (
                                        <Icon path={mdiCashMinus} />
                                    ) : null
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
