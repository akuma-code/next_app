'use client'

import { createPlayer } from "@/Services/playerService";
import { Button, Fade, Paper, Stack, TextField } from "@mui/material";
import { revalidatePath } from "next/cache";
import { redirect, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import SubmitButton from "./UI/SubmitButton";
import ResetButton from "./UI/ResetButton";

interface CreatePlayerFormProps {
    faction?: (data: FormData) => Promise<void>
}

const CreatePlayerForm: React.FunctionComponent<CreatePlayerFormProps> = ({ faction }) => {

    const q = useSearchParams()
    const show = q.has('action')
    const action = q.get('action')
    if (!show || action !== 'create') return null
    const createAction = async (fd: FormData) => {
        const data = Object.fromEntries(fd) as { name: string, rttf_score?: string }
        const { name, rttf_score } = data
        if (faction) {
            try {
                return faction(fd)
            } catch (error) {

            }
        }
        await createPlayer(name)
        redirect('/avangard/players')
        // revalidatePath('/avangard/[players]')
    }

    async function handleCreate(data: FormData): Promise<void> {

    }
    return (
        <Suspense fallback={ <div>Loading form...</div> }>
            <Fade in={ show } timeout={ { enter: 1000, exit: 500 } }>
                <Paper elevation={ 2 } sx={ { p: 2 } }>

                    <form action={ faction }>
                        <Stack>

                            Добавить нового игрока
                            <TextField
                                name='name'
                                defaultValue={ "" }
                                variant="outlined"
                                helperText="Name"
                            />
                            <TextField
                                name="rttf_score"
                                defaultValue={ 0 }
                                variant="outlined"
                                helperText="RTTF рейтинг"
                            />
                            <SubmitButton label="Добавить" buttonProps={ { variant: 'text' } } />
                            <ResetButton buttonProps={ { variant: 'text' } } />
                        </Stack>
                    </form>
                </Paper>
            </Fade>
        </Suspense>
    );
}

export default CreatePlayerForm;