"use client";

import { _promptVar } from "@/Helpers/helpersFns";
import { createPlayer, seedPlayers } from "@/Services/playerService";
import { Button, Fade, Paper, Stack, TextField } from "@mui/material";
import { redirect, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import ResetButton from "./UI/ResetButton";
import SubmitButton from "./UI/SubmitButton";

interface CreatePlayerFormProps {
    faction?: (data: FormData) => Promise<void>;
}

const CreatePlayerForm: React.FunctionComponent<CreatePlayerFormProps> = ({
    faction,
}) => {
    const q = useSearchParams();
    const show = q.has("action");
    const action = q.get("action");
    if (!show || action !== "create") return null;

    const createAction = async (fd: FormData) => {
        const data = Object.fromEntries(fd) as {
            name: string;
            rttf_score?: string;
        };
        const { name, rttf_score } = data;
        const score = rttf_score ? +rttf_score : 0;
        await createPlayer(name, { rttf_score: score });
        redirect("/avangard/players");
    };
    const seedAction = async () => {
        _promptVar("Восстановить игроков из базы?") && (await seedPlayers());
    };

    return (
        <Suspense fallback={<div>Loading form...</div>}>
            <Fade in={show} timeout={{ enter: 1000, exit: 500 }}>
                <Paper elevation={2} sx={{ p: 2 }}>
                    <form action={createAction}>
                        <Stack>
                            Добавить нового игрока
                            <TextField
                                name="name"
                                defaultValue={""}
                                variant="outlined"
                                helperText="Name"
                            />
                            <TextField
                                name="rttf_score"
                                defaultValue={0}
                                variant="outlined"
                                helperText="RTTF рейтинг"
                            />
                            <SubmitButton
                                label="Добавить"
                                buttonProps={{ variant: "text" }}
                            />
                            <ResetButton buttonProps={{ variant: "text" }} />
                        </Stack>
                    </form>
                    <Button
                        color="warning"
                        variant="contained"
                        onClick={seedAction}
                    >
                        Восстановить из базы
                    </Button>
                </Paper>
            </Fade>
        </Suspense>
    );
};

export default CreatePlayerForm;
