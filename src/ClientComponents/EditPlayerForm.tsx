'use client'

import { _log } from "@/Helpers/helpersFns";
import { editPlayer } from "@/Services/playerService";
import { Box, Button, Stack, TextField } from "@mui/material";
import { Player } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { useParams, useSearchParams } from "next/navigation";

interface EditPlayerFormProps {
    player?: Player
}

const EditPlayerForm: React.FunctionComponent<EditPlayerFormProps> = ({ player }) => {
    const s = useSearchParams()
    const params = useParams() as { id: string }
    const f = s.get('form')
    if (!f || f !== 'edit') return null

    const editAction = async (d: FormData) => {
        const new_name = d.get('name')
        if (!new_name) return
        _log(new_name)
        await editPlayer(params?.id, { name: new_name as string })
        // return revalidatePath('/avangard/players/' )
    }

    return (
        <form action={ editAction }
            className="p-2"
        >
            <Stack ml={ 4 }>

                Edit Player Form
                <TextField
                    placeholder="Player Name"
                    variant="outlined"
                    inputMode="text"
                    helperText='изменить имя'
                    name="name"
                    defaultValue={ player?.name || "" }
                />
            </Stack>
            <Box ml={ 4 }>

                <Button color="success" type="submit">Submit</Button>
                <Button color="secondary" type="reset">Reset</Button>
            </Box>
        </form>
    );
}

export default EditPlayerForm;