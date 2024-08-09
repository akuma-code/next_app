"use client";

import { _promptVar } from "@/Helpers/helpersFns";
import { createPlayer, seedPlayers } from "@/Services/playerService";
import {
    Box,
    Button,
    ButtonGroup,
    Divider,
    Fade,
    Paper,
    Stack,
    TextField,
} from "@mui/material";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import ResetButton from "./UI/ResetButton";
import SubmitButton from "./UI/SubmitButton";
import Link from "next/link";

interface CreatePlayerFormProps {
    faction?: (data: FormData) => Promise<void>;
}

const CreatePlayerForm: React.FunctionComponent<CreatePlayerFormProps> = ({
    faction,
}) => {
    const q = useSearchParams();
    const show = q.has("action");
    const action = q.get("action");
    const router = useRouter();
    if (!show || action !== "create") return null;
    const createAction = async (fd: FormData) => {
        const data = Object.fromEntries(fd) as {
            name: string;
            rttf_score?: string;
        };
        const { name, rttf_score } = data;
        const score = rttf_score ? +rttf_score : 0;
        try {
            const new_player = await createPlayer(name);

            console.log({ new_player });
        } catch (error) {
            console.error(error);
        }
        // router.push("/avangard/players");
    };
    const seedAction = async () => {
        _promptVar("Восстановить игроков из базы?") && (await seedPlayers());
    };

    return (
        <Suspense fallback={<div>Loading form...</div>}>
            <Fade in={show} timeout={{ enter: 1000, exit: 500 }}>
                <Paper elevation={2} sx={{ p: 2 }}>
                    <Box border="2px solid grey" p={2} mb={1}>
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
                                <ResetButton
                                    buttonProps={{ variant: "text" }}
                                />
                            </Stack>
                        </form>
                    </Box>
                    <ButtonGroup orientation={"vertical"} fullWidth>
                        <Button
                            color="warning"
                            variant="outlined"
                            onClick={seedAction}
                        >
                            Восстановить из базы
                        </Button>
                        <Divider flexItem></Divider>
                        <Button
                            color="warning"
                            LinkComponent={Link}
                            href={"/admin/players"}
                            variant="contained"
                            fullWidth
                        >
                            Закрыть
                        </Button>
                    </ButtonGroup>
                </Paper>
            </Fade>
        </Suspense>
    );
};

export default CreatePlayerForm;
