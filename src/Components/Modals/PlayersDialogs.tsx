"use client";

import { _log } from "@/Helpers/helpersFns";
import { connectOnePlayer, getEventById } from "@/Services/eventService";
import { createPlayer, getPlayers } from "@/Services/playerService";
import { ticketCountMinus } from "@/Services/tickets/ticketActions";
import {
    mdiBitcoin,
    mdiCheck,
    mdiClose,
    mdiRadioboxIndeterminateVariant,
} from "@mdi/js";
import Icon from "@mdi/react";
import {
    Box,
    Button,
    ButtonGroup,
    Dialog,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
} from "@mui/material";
import { Prisma } from "@prisma/client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState, useTransition } from "react";

async function getData() {
    return await getPlayers();
}

async function connectPlayerHandler(
    player: {
        name: string;
        id: number;
        ticket: {
            uuid: string;
            amount: number;
            eAt: string;
            event_dates: string[];
            playerId: number;
        } | null;
    },
    eventId: number
) {
    if (player.ticket) {
        const e = await getEventById(eventId.toString());
        if (!e) return;
        const { cost } = e;
        if (cost) {
            await connectOnePlayer(eventId, player.id);
            await ticketCountMinus(
                { uuid: player.ticket.uuid },
                { amount: cost, event_date: e.date_formated }
            );
        }
    } else {
        await connectOnePlayer(eventId, player.id);
    }
}

export const ConnectDialog = ({
    event,
    show,
    onClose,
}: {
    event: Prisma.EventGetPayload<{
        select: {
            id: true;
            date_formated: true;
            players: { select: { id: true; name: true; ticket: true } };
            pairs: true;
            cost: true;
            title: true;
            _count: { select: { players: true } };
        };
    }>;
    show: boolean;
    onClose: () => void;
}) => {
    // const [open, { on, off }] = useToggle(show);
    const eventIds = event.players.map((p) => p.id);

    const q = useQuery({
        queryKey: ["players", "all"],
        queryFn: getData,
        placeholderData: keepPreviousData,
        select: (data) => data.filter((d) => !eventIds.includes(d.id)),
        enabled: show,
    });
    const [isConnecting, start] = useTransition();

    if (q.error) {
        _log(q.error);
        return <Box>Fetch players error</Box>;
    }

    // if (q.isLoading) return <LinearProgress />;
    return (
        <Dialog open={show} onClose={onClose}>
            <DialogTitle justifyContent={"center"} textAlign={"center"}>
                {isConnecting ? (
                    <Box
                        component={Stack}
                        alignContent={"center"}
                        alignItems={"center"}
                    >
                        <Icon
                            path={mdiRadioboxIndeterminateVariant}
                            size={1}
                            spin={1}
                        />
                    </Box>
                ) : (
                    <Box>Добавить</Box>
                )}
            </DialogTitle>
            <DialogContent>
                <Stack direction={"column"} spacing={1} justifyContent={"left"}>
                    {q.data?.map((p) => (
                        <Button
                            endIcon={
                                p.ticket ? (
                                    <Icon path={mdiBitcoin} size={1} />
                                ) : null
                            }
                            sx={{
                                textAlign: "left",
                                justifyContent: "space-between",
                                bgcolor: p.ticket ? "lightblue" : "inherit",
                            }}
                            variant="outlined"
                            size="small"
                            key={p.id}
                            onClick={async () =>
                                await connectPlayerHandler(p, event.id)
                            }
                        >
                            {p.name} {p.ticket && `[${p.ticket.amount}]`}
                        </Button>
                    ))}
                </Stack>
            </DialogContent>
        </Dialog>
    );
};

export const CreatePlayerDialog = ({
    onClose,
    show,
}: {
    show: boolean;
    onClose: () => void;
}) => {
    // const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [player, setPlayer] = useState({ name: "" });
    const [isCreating, start] = useTransition();
    // const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     setAnchorEl(event.currentTarget);
    // };

    const handleClose = () => {
        onClose();
    };

    const onCreate = () => {
        start(async () => {
            await createPlayer(player.name);
        });
    };

    // function handleReset() {
    //     setState(prev => input)
    // }
    // const show = Boolean(anchorEl);
    return (
        <Dialog open={show} onClose={handleClose}>
            <DialogTitle>Добавить на тренировку</DialogTitle>
            <DialogContent>
                <Box
                    m={1}
                    p={1}
                    display={"flex"}
                    alignItems={"center"}
                    flexDirection={"row"}
                    gap={1}
                >
                    <TextField
                        size="small"
                        name={"name"}
                        value={player.name}
                        onChange={(e) =>
                            setPlayer((prev) => ({
                                ...prev,
                                name: e.target.value,
                            }))
                        }
                        variant="outlined"
                        label={`Введите имя`}
                    />
                    <ButtonGroup sx={{ pt: 0 }} size="small">
                        <Button
                            color="warning"
                            sx={{ bgcolor: "success.main" }}
                            type="submit"
                            title="Подтвердить"
                            onClick={onCreate}
                            disabled={isCreating}
                        >
                            <Icon path={mdiCheck} size={1} color={"success"} />
                        </Button>
                        <Button
                            onClick={handleClose}
                            sx={{ bgcolor: "error.main" }}
                            title="Вернуть начальное значение"
                        >
                            <Icon path={mdiClose} size={1} color={"#000"} />
                        </Button>
                    </ButtonGroup>
                </Box>
            </DialogContent>
        </Dialog>
    );
};
