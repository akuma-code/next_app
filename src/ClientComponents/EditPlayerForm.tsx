"use client";

import { _log } from "@/Helpers/helpersFns";
import { editPlayer } from "@/Services/playerService";
import { createTicketForPlayer } from "@/Services/tickets/ticketActions";
import { Fade, Paper, Stack, TextField } from "@mui/material";
import { Prisma } from "@prisma/client";
import { redirect, useParams, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import ResetButton from "./UI/ResetButton";
import SubmitButton from "./UI/SubmitButton";

interface EditPlayerFormProps {
    player: Prisma.PlayerGetPayload<{
        select: {
            id: true;
            name: true;
            ticket: true;
            // info: { select: { rttf_score: true } };
        };
    }>;
}
async function addTicket(playerId: number, amount: number) {
    const t = createTicketForPlayer.bind(null);
    return await t({ playerId, new_ticket: { amount, limit: 10 } });
}

const EditPlayerForm: React.FC<EditPlayerFormProps> = ({ player }) => {
    const [p, setPlayer] = useState(() => player);

    const s = useSearchParams();
    const params = useParams() as { id: string };

    const f = s.get("action");

    const playerId = params.id ?? s.get("id");

    if (!playerId) {
        _log("Invalid id!", playerId);
        return null;
    }
    const editAction = async (d: FormData) => {
        const new_data = Object.fromEntries(d) as {
            name?: string;
            rttf_score?: number;
            cost?: string;
        };
        if (new_data.cost) {
            await addTicket(+playerId, +new_data.cost);
        }
        setPlayer((prev) => ({ ...prev, ...new_data }));
        await editPlayer(playerId, {
            name: new_data.name,
            info: { update: { rttf_score: new_data.rttf_score } },
        });
        redirect("/avangard/players/" + playerId);
    };

    if (f !== "edit") return null;
    console.log(p);
    return (
        <Fade in={!!playerId} timeout={1000}>
            <Paper elevation={2} sx={{ p: 2 }}>
                <form action={editAction} className="p-2">
                    <Stack ml={4} spacing={2}>
                        Изменить данные
                        <TextField
                            placeholder="Player Name"
                            variant="outlined"
                            inputMode="text"
                            helperText="изменить имя"
                            name="name"

                            // value={p.name}
                            // onChange={(e) =>
                            //     setPlayer((prev) => ({
                            //         ...prev,
                            //         name: e.target.value,
                            //     }))
                            // }
                        />
                        {/* <TextField
                                placeholder="RTTF Score"
                                variant="outlined"
                                inputMode="text"
                                helperText="изменить рейтинг"
                                name="rttf_score"
                                // value={p.info?.rttf_score}
                            /> */}
                        <TextField
                            placeholder="Абонемент"
                            variant="outlined"
                            inputMode="numeric"
                            helperText="кол-во посещений"
                            name="ticket"
                            value={10}
                        />
                        {/* <Button
                                variant="outlined"
                                onClick={async () => addTicket(+playerId, 10)}
                            >
                                Открыть абонемент
                            </Button> */}
                        <SubmitButton label="Подтвердить" />
                        <ResetButton />
                    </Stack>
                </form>
            </Paper>
        </Fade>
    );
};

export default EditPlayerForm;
