'use client';
import { Box, Button, Stack, TextField } from "@mui/material";
import { useFormState } from "react-dom";

import { useEffect } from "react";

type InitState = {
    name: string;
}
const initFormState: InitState = { name: "" }
export function FormCreate() {

    // const [state, formAction] = useFormState(createAction, initFormState);


    return (
        <form className="p-2">
            <Box component={ Stack } spacing={ 4 } direction={ 'row' }>

                <TextField
                    id="formula_id"
                    defaultValue={ "" }
                    label='Formula stp'
                    variant="filled"
                    name="name"
                    required
                    onError={ (e) => console.log(e) }
                />
                <Button type="submit" variant="contained">Add</Button>
            </Box>
        </form>
    );
}
