'use client'

import { ButtonGroup, FormControl, Paper, Stack, TextField } from "@mui/material"
import SubmitButton from "./UI/SubmitButton"
import ResetButton from "./UI/ResetButton"
import { useFormState } from "react-dom"
import { createCoach } from "@/Services/coachService"

export const CreateCoachForm: React.FC = () => {


    return (

        <Paper sx={ { py: 2 } } elevation={ 1 }>
            <form action={ createCoachAction } >

                <Stack spacing={ 2 } m={ 2 }>

                    <FormControl id={ 'first_name' }>
                        <TextField name="first_name" placeholder="Имя" required />
                    </FormControl>
                    <FormControl id={ 'second_name' }>
                        <TextField name="second_name" placeholder="Фамилия" />
                    </FormControl>
                    <ButtonGroup fullWidth>

                        <SubmitButton label="Сохранить" buttonProps={ { variant: 'contained' } } />
                        <ResetButton />
                    </ButtonGroup>
                </Stack>
            </form>
        </Paper>
    )
}


CreateCoachForm.displayName = "___CreateCoach Form"
const createCoachAction = async (fd: FormData) => {
    const data = Object.fromEntries(fd.entries()) as { first_name: string, second_name?: string }
    const result = await createCoach(data)
    console.log('result: ', result)
    return result

}