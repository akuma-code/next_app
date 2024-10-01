"use client";

import { _log } from "@/Helpers/helpersFns";
import { useToggle } from "@/Hooks/useToggle";
import { connectOnePlayer } from "@/Services/eventService";
import { getPlayers } from "@/Services/playerService";
import { mdiAccountPlusOutline } from "@mdi/js";
import Icon from "@mdi/react";
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    SpeedDialAction,
    Stack,
} from "@mui/material";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

interface AddPlayerProps {
    event_players: { id: number; name: string }[];
    event_id: number;
}
async function fetchPlayers() {
    const players = await getPlayers();
    return players;
}
export const AddPlayerSpeedDialog: React.FC<AddPlayerProps> = ({
    event_players,
    event_id,
}) => {
    const [open, { on, off }] = useToggle();
    const eventIds = event_players.map((p) => p.id);

    const q = useQuery({
        queryKey: ["players", "all"],
        queryFn: fetchPlayers,
        placeholderData: keepPreviousData,
        select: (data) => data.filter((d) => !eventIds.includes(d.id)),
    });
    if (q.error) {
        _log(q.error);
        return <Box>Fetch players error</Box>;
    }

    async function handleConnectPlayer(eventId: number, playerId: number) {
        const connect = connectOnePlayer.bind(null, eventId, playerId);
        await connect();
        off();
    }
    // if (!q.isSuccess)
    //     return <LoadSpinner mdiPath={mdiDebian} text="" size={2} />;
    return (
        <>
            {/* <Button
                color="secondary"
                size="small"
                variant="contained"
                sx={{ alignItems: "center" }}
                onClick={on}
                startIcon={<Icon path={mdiAccountMultiplePlus} size={0.8} />}
            >
                Добавить
            </Button> */}
            <SpeedDialAction
                color="secondary"
                icon={<Icon path={mdiAccountPlusOutline} size={0.8} />}
                tooltipTitle={"ADD"}
                onClick={on}
            />
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
