"use client";

import { _log } from "@/Helpers/helpersFns";
import { editPlayer } from "@/Services/playerService";
import { Fade, Paper, Stack, TextField } from "@mui/material";
import { Player } from "@prisma/client";
import { redirect, useParams, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import ResetButton from "./UI/ResetButton";
import SubmitButton from "./UI/SubmitButton";

interface EditPlayerFormProps {
    player?: Pick<Player, "id" | "name" | "createdAt" | "profileId">;
}

const EditPlayerForm: React.FunctionComponent<EditPlayerFormProps> = ({
    player,
}) => {
    const s = useSearchParams();
    const params = useParams() as { id?: string };

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
        };

        await editPlayer(playerId, { ...new_data });
        redirect("/avangard/players/" + playerId);
    };

    if (f !== "edit") return null;
    return (
        <Suspense fallback={<div>Loading form...</div>}>
            <Fade in={!!f} timeout={1000}>
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
                                defaultValue={player?.name || ""}
                            />
                            <TextField
                                placeholder="RTTF Score"
                                variant="outlined"
                                inputMode="text"
                                helperText="изменить рейтинг"
                                name="rttf_score"
                                defaultValue={""}
                            />
                            <SubmitButton label="Подтвердить" />
                            <ResetButton />
                        </Stack>
                    </form>
                </Paper>
            </Fade>
        </Suspense>
    );
};

export default EditPlayerForm;
