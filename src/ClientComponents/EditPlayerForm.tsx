'use client'

import { _log } from "@/Helpers/helpersFns";
import { editPlayer } from "@/Services/playerService";
import { Box, Button, Fade, Paper, Stack, TextField } from "@mui/material";
import { Player, PlayerInfo } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect, useParams, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import SubmitButton from "./UI/SubmitButton";
import ResetButton from "./UI/ResetButton";

interface EditPlayerFormProps {
    player?: Player
}

const EditPlayerForm: React.FunctionComponent<EditPlayerFormProps> = ({ player }) => {
    const s = useSearchParams()
    const params = useParams() as { id: string }
    const f = s.get('action')

    if (!f || f !== 'edit') return null

    const editAction = async (d: FormData) => {
        const new_name = d.get('name')

        const new_data = Object.fromEntries(d) as { name?: string, rttf_score?: number }
        if (!new_name) return

        await editPlayer(params?.id, { ...new_data })
        return redirect('/avangard/players/' + params.id)
    }

    return (
        <Suspense fallback={ <div>Loading form...</div> }>
            <Fade in={ !!f } timeout={ 2000 }>

                <Paper elevation={ 2 } sx={ { p: 2 } }>

                    <form action={ editAction }
                        className="p-2"
                    >
                        <Stack ml={ 4 } spacing={ 2 }>

                            Изменить данные
                            <TextField
                                placeholder="Player Name"
                                variant="outlined"
                                inputMode="text"
                                helperText='изменить имя'
                                name="name"
                                defaultValue={ player?.name || "" }
                            />
                            <TextField
                                placeholder="RTTF Score"
                                variant="outlined"
                                inputMode="text"
                                helperText='изменить рейтинг'
                                name="rttf_score"
                                defaultValue={ "" }
                            />

                            <SubmitButton label="Подтвердить" />
                            <ResetButton />
                        </Stack>
                        {/* <Button color="success" type="submit">Submit</Button> */ }
                        {/* <Button color="secondary" type="reset">Reset</Button> */ }

                    </form>
                </Paper>
            </Fade>
        </Suspense>
    );
}

export default EditPlayerForm;